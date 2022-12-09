import yargs from 'yargs';
import { watch } from 'chokidar';
import config, { setConfigFlags } from './config/app-config';
import { calcStandardDeviation } from './utils/standard-deviation';
import { ms } from './utils/format';
import { execute, loadSolution, readLines, verifyAccess } from './file-loader';
import create from './create';
import * as readline from 'readline';

type Args = typeof _argv & { input: string, script: string, actualInput: string };

// Parse command line arguments
const yargv = yargs(process.argv.slice(2))
    .scriptName('aoc-run')
    .usage('$0 [puzzle]')
    .command(
        ['new [puzzle]', 'create [puzzle]'],
        'Set up a new puzzle.',
        argv => argv,
        argv => create(argv),
    )
    .positional('puzzle', {
        type: 'string', alias: 'p',
        describe: 'The name of the puzzle to run.',
        // 'default' is set in middleware
        defaultDescription: 'Current day of the month',
    })
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
        'show-args': { type: 'boolean', hidden: true,
            describe: 'Log the argv object.' },
    })
    .middleware(argv => {
        // Positional options don't work completely when set at the top level, so do our own handling here
        if (argv._[0] === 'new') argv._.shift(); // Shift the "new" command out of args
        if (!argv.puzzle && argv._.length === 0) { // Set default value
            argv.puzzle = (new Date).getDate().toString();
        }
        if (!argv.puzzle && argv._[0] !== undefined) {
            argv.puzzle = argv._.shift() as string;
            argv.p = argv.puzzle;
        }

        // Construct input and solution file paths from args if needed
        if (argv.devmode) {
            argv.test ??= true;
            argv.watch ??= true;
            argv.debug ??= true;
        }
        if (!argv.benchmark && argv.hasOwnProperty('benchmark')) argv.benchmark = 100;
        if (argv.benchmark) argv.time = false;

        if (argv.test) {
            argv.actualInput = config.INPUT_DIR + argv.puzzle + '.txt';
            if (argv.n) argv.input = config.INPUT_DIR + 'test.txt';
        }

        if (!argv.input) argv.input = config.INPUT_DIR
            + (argv.test && 'test'
            || argv.puzzle) + '.txt';
        // if (!argv.input) argv.input = config.INPUT_DIR + argv.puzzle + '.txt';
        if (!argv.script) argv.script = config.SOLUTION_DIR + argv.puzzle + '.ts';
        setConfigFlags(argv);
    });
const _argv = yargv.parseSync();
const argv = _argv as Args;

function main(argv: any, clearCache = false) {
    if (argv.showArgs) console.log('argv', argv);
    const { input: inputFile, script: solutionFile } = argv as Args;

    // Verify that input and solution files exist and can be accessed
    if (!verifyAccess(solutionFile, inputFile, argv.puzzle, clearCache)) return false;

    // Load the solution function exported from the solution script
    const solution = loadSolution(solutionFile);

    // Read the input file and convert it into a multiline string
    const lines = readLines(inputFile, clearCache);

    // Execute!
    const [result, time] = execute(solution, lines, argv);

    // And display the results
    console.log(result !== undefined ? result : 'No result returned');
    if (argv.time) console.log('Execution time:', ms.format(time));

    // If --benchmark was set, repeat the execution N times and display the performance results
    if (argv.benchmark) {
        const perf: number[] = [ time ];
        while (perf.length < argv.benchmark) {
            const [, time] = execute(solution, lines, argv);
            perf.push(time);
        }
        const [avg, stdDev] = calcStandardDeviation(perf);
        console.log('Average execution time:', ms.format(avg),
                  '\nStandard deviation:    ', ms.format(stdDev));
    }
    return true;
}

const { n } = argv as Args;

let openDebouncing = false;
if (n) {
    create(argv);
    // chokidar fires a 'change' event whenever a file is opened, causing both the initial startup execute and a watch execute. https://github.com/paulmillr/chokidar/issues/985
    openDebouncing = true;
    setTimeout(() => openDebouncing = false, 500);
}

// Print output header
if (argv.devmode) console.log(`\u001b[32;1m———————— Development Mode ————————\x1b[0m`);
if (argv.watch) console.log(`\x1b[32mWatching for file changes and will automatically rerun if detected. Press \u001b[1mCtrl-C\x1b[0m \x1b[32mto exit.\n`);
console.log(`\x1b[36mRunning ${argv.script} on ${argv.input}:\x1b[0m`);

// Verify, read, and execute files
if (!main(argv)) process.exit();

if (argv.watch) {
    let last = argv;

    const watcher = watch([argv.script, argv.input]).on('change', (path, stats) => {
        if (openDebouncing) return;
        console.log(`\x1b[36m\n${path} has been modified. Rerunning:\x1b[0m`);
        main(last, path === last.input);
    });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.on('line', line => {
        let clearCache = false;
        let info = '';

        let cin = line.trim();
        if (cin === 'quit') process.exit();
        else if (cin === '') info = `${argv['$0']} ${process.argv.slice(2).join(' ')}\n`;
        else if (cin === 'real') cin = '-t=0 -d=0';
        else if (cin === 'test') cin = '-t';

        const cinArgs = cin ? cin.split(/ +/) : [];
        const newArgv = yargv.parseSync(process.argv.slice(2).concat(cinArgs)) as Args;

        info += `Running ${newArgv.script} on ${newArgv.input}:`;
        if (newArgv.script !== last.script) {
            info = `Solution file switched to ${newArgv.script}\n${info}`;
            watcher.unwatch(last.script).add(newArgv.script);
        }
        if (newArgv.input !== last.input) {
            info = `Input file switched to ${newArgv.input}\n${info}`;
            clearCache = true;
            watcher.unwatch(last.input).add(newArgv.input);
        }
        last = newArgv as Args;

        console.log(`\x1b[36m\n${info}\x1b[0m`);
        main(newArgv, clearCache);
    });
    rl.on('close', () => process.exit());
}
