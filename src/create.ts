import { constants, existsSync, accessSync, copyFileSync, writeFileSync } from 'fs';
const { F_OK, R_OK, W_OK, COPYFILE_EXCL } = constants;
import config from './config/app-config';
import { resolve } from 'path';
const { TEMPLATE_PATH, INPUT_DIR, SOLUTION_DIR } = config;

export default function create(argv: any) {
    const { input: inputFile, script: solutionFile, puzzle } = argv;
    // Verify that template files and destination directories exist and can be accessed
    try {
        accessSync(TEMPLATE_PATH, F_OK | R_OK);
        accessSync(INPUT_DIR, F_OK | R_OK | W_OK);
        accessSync(SOLUTION_DIR, F_OK | R_OK | W_OK);
    } catch (e) {
        const {message} = e as Error;
        console.warn(message || e);
        process.exit(1);
    }

    // Confirm that a solution script doesn't already exist and create a new one from the template
    if (existsSync(solutionFile)) {
        console.warn(`A solution script '${solutionFile}' already exists${!argv.n ? ', aborting' : ''}.`);
        if (!argv.n) process.exit();
    } else {
        copyFileSync(TEMPLATE_PATH, solutionFile, COPYFILE_EXCL);
    }

    // Create a new input file and open it. If one already exists just open it
    if (existsSync(inputFile)) {
        console.warn(`\x1b[36mAn input file '${inputFile}' already exists. Opening...\x1b[0m`);
    } else {
        let puzzleUrl = 'https://adventofcode.com/';
        if (puzzle.match(/[12]?\d|3[01]/)) {
            puzzleUrl = `https://adventofcode.com/2022/day/${puzzle}/input`;
        }
        writeFileSync(inputFile, `Paste the input from Advent of Code here\n${puzzleUrl}`);
        console.log(`\x1b[36mNew input file created at:\n\x1b[0m`, resolve(inputFile));
    }
    const open = require('open');
    open(inputFile).catch((e: any) => {
        throw Error(e)
    });

    console.log('\x1b[36mNew solution script created at:\x1b[0m\n', resolve(solutionFile));

    if (!argv.n) process.exit(0);
}