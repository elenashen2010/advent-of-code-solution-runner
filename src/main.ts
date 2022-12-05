import { constants, accessSync, readFileSync } from 'fs';
const { F_OK, R_OK } = constants;
import { resolve } from 'path';
import { watch } from 'chokidar';
import yargs from 'yargs';
import config, { setFlags } from './app-config';
import create from './create';

// Command line arguments
const argv = yargs(process.argv.slice(2))
    .scriptName('solution-runner')
    .usage('$0 [puzzle]')
    .command(
        ['new [puzzle]', 'create [puzzle]'],
        'Set up a new puzzle.',
        argv => argv,
        argv => create(argv)
    )
    .options({
        'devmode': { type: 'boolean', alias: 'd',
            describe: 'Enables development mode, which automatically reruns your script whenever the script or input has changed.\n' +
                'It also sets the TEST flag to true, which you can use in your code to only execute parts during dev mode.' },
        'input': { type: 'string', alias: 'i',
            describe: 'Tells the runner to use a specific file for input instead of the default path.' },
        'script': { type: 'string', alias: 's',
            describe: 'Tells the runner to run a specific script instead of the default path.' },
    })
    .positional('puzzle', { type: 'string',
        describe: 'The name of the puzzle to run.',
        default: (new Date).getDate().toString(),
        defaultDescription: 'The current day of the month',
    })
    .middleware(argv => {
        // Construct input and solution file paths from args if needed
        if (argv._[0] !== 'new' && argv._[0]) argv.puzzle = argv._[0].toString();
        if (!argv.input) argv.input = config.INPUT_DIR
            + (argv.devmode && 'test'
            || argv.puzzle) + '.txt';
        if (!argv.script) argv.script = config.SOLUTION_DIR + argv.puzzle + '.ts';
        setFlags(argv);
    })
    .parseSync();

function main(solutionFile: string, inputFile: string) {
    // Verify that input and solution files exist and can be accessed
    try {
        accessSync(solutionFile, F_OK | R_OK);
        accessSync(inputFile, F_OK | R_OK);
    } catch (e) {
        const { message, path } = e as Error & { syscall: string; path: string };
        if (message.includes('no such file or directory')) {
            console.log(`No such file or directory '${path}'. Did you mean "aoc-run \u001b[1mnew\x1b[0m ${argv.puzzle}"?`)
        } else {
            console.warn(message || e);
        }
        process.exit(message ? 0 : 1);
    }

    // Read the input file and convert it into a multiline string
    const input = readFileSync(inputFile, {encoding: 'utf-8'});
    const lines = Object.freeze(input.split(/\r?\n/));

    // Execute the solution function exported from the solution script
    const solution = require(resolve(solutionFile));
    const result = solution.default(lines, ...args);
    console.log(result);
}

const { _: args, input: inputFile, script: solutionFile } = argv;
if (!inputFile || !solutionFile) {
    console.error('Could not come up with an input/solution file for the provided arguments', argv);
    process.exit(1);
}

if (argv.devmode) {
    console.log(`\u001b[32;1m———————— Development Mode ————————\n\x1b[0m` +
        `\x1b[32mWatching for file changes and will automatically rerun if detected. `+
        `Press \u001b[1mCtrl-C\x1b[0m \x1b[32mto exit.\n`);
}

console.log(`\x1b[36mRunning ${solutionFile} on ${inputFile}:\x1b[0m`);
main(solutionFile, inputFile);

if (argv.devmode) {
    watch([solutionFile, inputFile]).on('change', (path) => {
        console.log(`\x1b[36m\n${path} has been modified, rerunning:\x1b[0m`);
        delete require.cache[resolve(solutionFile)];
        main(solutionFile, inputFile);
    });
}
