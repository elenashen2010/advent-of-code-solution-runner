import { constants, accessSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { watch } from 'chokidar';
import yargs from 'yargs';
import create from './create';

const { F_OK, R_OK } = constants;

// Command line arguments
const argv = yargs(process.argv.slice(2))
    .scriptName('solution-runner')
    .usage('$0 <cmd> [args]')
    .options({
        'puzzle': { type: 'string', alias: 'n', global: true },
        'input': { type: 'string', alias: 'i', global: true },
        'script': { type: 'string', alias: 's', global: true },
        'devmode': { type: 'boolean' },
    })
    // .middleware(argv => {
    //     // // Get the puzzle name from the first argument, or use today's date if no name was provided
    //     const day = (new Date).getDate().toString();
    //     // Construct input and solution file paths from args
    //     argv.input = (argv.input
    //         || argv.puzzle
    //         || argv.devmode && 'test'
    //         || day);
    //     argv.script = (argv.script
    //         || argv.puzzle
    //         || day);
    // })
    .command(
        'new',
        'Setup for a new puzzle',
        argv => {},
        argv => create(argv)
    )
    .parseSync();
const args = argv._;

// // Get the puzzle name from the first argument, or use today's date if no name was provided
const day = (new Date).getDate().toString();

// Construct input and solution file paths from args
const inputFile = 'input/'
    + (argv.input
    || argv.puzzle
    || argv.devmode && 'test'
    || day)
    + '.txt';

const solutionFile = 'solutions/'
    + (argv.script
    || argv.puzzle
    || day)
    + `.ts`;
// const inputFile = `input/${argv.input}.txt`;
// const solutionFile = `solutions/${argv.script}.ts`;

function main(solutionFile: string, inputFile: string) {
    // Verify that input and solution files exist and can be accessed
    try {
        accessSync(inputFile, F_OK | R_OK);
        accessSync(solutionFile, F_OK | R_OK);
    } catch (e) {
        const {message} = e as Error;
        console.warn(message || e);
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
main(solutionFile, inputFile);

if (argv.devmode) {
    watch([solutionFile, inputFile]).on('change', (path) => {
        console.log(`\x1b[36m\n${path} has been modified, restarting:\x1b[0m`);
        main(solutionFile, inputFile);
    });
}
