import yargs from 'yargs';
import { watch } from 'chokidar';
import config, { setConfigFlags } from './config/app-config';
import { calcStandardDeviation } from './utils/standard-deviation';
import { ms } from './utils/format';
import { execute, loadSolution, readLines, verifyAccess } from './file-loader';
import create from './create';

// Parse command line arguments
const argv = yargs(process.argv.slice(2))
    .scriptName('solution-runner')
    .usage('$0 [puzzle]')
    .command(
        ['new [puzzle]', 'create [puzzle]'],
        'Set up a new puzzle.',
        argv => argv,
        argv => create(argv),
    )
    .options({
        'devmode': { type: 'boolean', alias: 'D',
            describe: 'Enables Development Mode, which automatically reruns your script whenever the script or input has changed.\n' +
                'It also sets the DEBUG flag to true, which you can use in your code to only execute parts during dev mode.\n' +
                'This is equivalent to setting the --test, --watch, and --debug options.' },
        'n': { type: 'boolean', alias: 'new',
            describe: 'Create new files like the "new" command, but also immediately runs script execution.\n' +
                'Combine with --devmode to create new files and start watching for file changes at the same time.' },
        'input': { type: 'string', alias: 'i',
            describe: 'Directs the program to use a specific file for input instead of the default path.' },
        'script': { type: 'string', alias: 's',
            describe: 'Directs the program to run a specific script instead of the default path.' },
        'test': { type: 'boolean', alias: 't',
            describe: 'Shorthand for --input=input/test.txt' },
        'watch': { type: 'boolean', alias: 'w',
            describe: 'Watch for file changes and rerun when one is detected.' },
        'debug': { type: 'boolean', alias: 'd',
            describe: 'Sets the DEBUG flag to true, which can be used in your code to conditionally execute segments only with this option enabled.' },
        'time': { type: 'boolean', alias: 'T',
            describe: 'Also display the amount of time the script takes to execute.' },
        'benchmark': { type: 'number',
            describe: 'Runs the script N times and displays the average performance.' },
    })
    .positional('puzzle', { type: 'string',
        describe: 'The name of the puzzle to run.',
        default: (new Date).getDate().toString(),
        defaultDescription: 'Current day of the month',
    })
    .middleware(argv => {
        // Construct input and solution file paths from args if needed
        if (argv._[0] !== 'new' && argv._[0]) argv.puzzle = argv._[0].toString();
        if (argv.devmode) {
            argv.test = true;
            argv.watch = true;
            argv.debug = true;
        }
        if (!argv.benchmark && argv.hasOwnProperty('benchmark')) argv.benchmark = 100;
        if (argv.benchmark) argv.time = false;

        if (argv.n && argv.test) {
            if (!argv.input) argv.input = config.INPUT_DIR + argv.puzzle + '.txt';
            argv.testInputFile = config.INPUT_DIR + 'test.txt';
        }

        if (!argv.input) argv.input = config.INPUT_DIR
            + (argv.test && 'test'
            || argv.puzzle) + '.txt';
        // if (!argv.input) argv.input = config.INPUT_DIR + argv.puzzle + '.txt';
        if (!argv.script) argv.script = config.SOLUTION_DIR + argv.puzzle + '.ts';
        setConfigFlags(argv);
    })
    .parseSync();

const { _: args, input: inputFile, script: solutionFile, n } = argv as typeof argv & { input: string, script: string };

function main(watchTrigger?: string) {
    // Verify that input and solution files exist and can be accessed
    verifyAccess(solutionFile, inputFile, argv.puzzle, watchTrigger);

    // Load the solution function exported from the solution script
    const solution = loadSolution(solutionFile, watchTrigger === solutionFile);

    // Read the input file and convert it into a multiline string
    const lines = readLines(inputFile, watchTrigger === inputFile);

    // Execute!
    const [result, time] = execute(solution, lines, ...args);

    // And display the results
    console.log(result !== undefined ? result : 'No result returned');
    if (argv.time) console.log('Execution time:', ms.format(time));

    // If --benchmark was set, repeat the execution N times and display the performance results
    if (argv.benchmark) {
        const perf: number[] = [ time ];
        while (perf.length < argv.benchmark) {
            const [, time] = execute(solution, lines);
            perf.push(time);
        }
        const [avg, stdDev] = calcStandardDeviation(perf);
        console.log('Average execution time:', ms.format(avg),
                  '\nStandard deviation:    ', ms.format(stdDev));
    }
}

if (n) create(argv);

// Print output header
if (argv.devmode) console.log(`\u001b[32;1m———————— Development Mode ————————\x1b[0m`);
if (argv.watch) console.log(`\x1b[32mWatching for file changes and will automatically rerun if detected. Press \u001b[1mCtrl-C\x1b[0m \x1b[32mto exit.\n`);
console.log(`\x1b[36mRunning ${solutionFile} on ${inputFile}:\x1b[0m`);

// Verify, read, and execute files
// TODO: chokidar fires a 'change' event whenever a file is opened, causing both the initial startup execute and a watch execute.
//   Need to figure out a clean way to resolve that, probably with a timeout would be easiest. https://github.com/paulmillr/chokidar/issues/985
main();

if (argv.watch) {
    watch([solutionFile, inputFile]).on('change', (path) => {
        console.log(`\x1b[36m\n${path} has been modified, rerunning:\x1b[0m`);
        main(path);
    });
}
