import { constants, existsSync, accessSync, copyFileSync, writeFileSync, mkdirSync } from 'fs';
const { F_OK, R_OK, W_OK, COPYFILE_EXCL } = constants;
import config from './config/app-config';
import { resolve, dirname } from 'path';

export default function create(argv: any) {
    if (argv.showArgs) console.log(argv);
    const { input: inputFile, script: solutionFile, puzzle } = argv;
    const templateFile = config.TEMPLATE_PATH;
    const year = config.YEAR;

    // Verify that template files and destination directories exist and can be accessed
    try {
        accessSync(templateFile, F_OK | R_OK);
        if (!argv.legacyFs) {
            accessSync(config.PUZZLES_DIR, F_OK | R_OK | W_OK);
        } else {
            accessSync(dirname(solutionFile), F_OK | R_OK | W_OK);
            accessSync(dirname(inputFile), F_OK | R_OK | W_OK);
        }
    } catch (e) {
        const {message} = e as Error;
        console.warn(message || e);
        process.exit(1);
    }

    // Check that a puzzle directory doesn't already exist and create a new one based on the puzzle name
    if (!argv.legacyFs && !existsSync(dirname(solutionFile))) {
        mkdirSync(dirname(solutionFile), {recursive: true});
    }

    // Check that a solution script doesn't already exist and create a new one from the template
    if (existsSync(solutionFile)) {
        console.warn(`\x1b[36mA solution script '${solutionFile}' already exists${!argv.n ? ', aborting' : ''}.\x1b[0m`);
        if (!argv.n) process.exit();
    } else {
        copyFileSync(templateFile, solutionFile, COPYFILE_EXCL);
        console.log('\x1b[36mNew solution script created at:\x1b[0m\n', resolve(solutionFile));
    }

    // Create a test file if necessary
    if (argv.test && !existsSync(inputFile)) {
        writeFileSync(inputFile, `I'm a test input file! Use me as a sandbox to test your solutions against smaller sets of data, ` +
            `such as the examples given in each puzzle description.`);
    }

    // Create a new input file and open it. If one already exists just open it
    const newInputFile = argv.actualInput || inputFile;
    if (existsSync(newInputFile)) {
        console.warn(`\x1b[36mAn input file '${newInputFile}' already exists. Opening...\x1b[0m`);
    } else {
        let puzzleUrl = 'https://adventofcode.com/';
        if (puzzle.toString().match(/[12]?\d|3[01]/)) {
            puzzleUrl = `https://adventofcode.com/${year}/day/${puzzle}/input`;
        }
        writeFileSync(newInputFile, `Hi! I'm the text file where your solution script will get its input from!\n\n` +
            `REPLACE everything here with the input Advent of Code gives you for this puzzle at \n${puzzleUrl}\n\n` +
            `A file has also been made for you to start coding your solution in, open it in your preferred code editor to get started.\n` +
            `You can find it at ${resolve(solutionFile)}`);
        console.log(`\x1b[36mNew input file created at:\n\x1b[0m`, resolve(newInputFile));
    }
    const open = require('open');
    open(newInputFile).catch((e: any) => {
        throw Error(e);
    });
    if (argv.test) {
        open(inputFile).catch((e: any) => { throw Error(e) });
    }

    if (!argv.n) process.exit(0);
}