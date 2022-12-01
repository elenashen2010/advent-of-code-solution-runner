import { constants, existsSync, accessSync, copyFileSync, writeFileSync } from 'fs';
const { F_OK, R_OK, W_OK, COPYFILE_EXCL } = constants;

const templatePath = 'src/template/template.ts';

// "npm create" arguments
const args: string[] = process.argv.slice(2);
const puzzle = args.shift();
if (!puzzle) {
    console.warn('Missing required <puzzle> param. Ex: "npm run create 2"');
    process.exit();
}
// Get the puzzle name from the first argument

// Construct input and solution file paths from args
let inputFile = `input/${puzzle}.txt`;
let solutionScript = `solutions/${puzzle}.ts`;

// Verify that template files and destination directories exist and can be accessed
try {
    accessSync(templatePath, F_OK | R_OK);
    accessSync('input/', F_OK | R_OK | W_OK);
    accessSync('solutions/', F_OK | R_OK | W_OK);
} catch(e) {
    const { message } = e as Error;
    console.warn(message || e);
    process.exit(1);
}

// Confirm that a solution script doesn't already exist and create a new one from the template
if (existsSync(solutionScript)) {
    console.warn(`A solution script '${solutionScript}' already exists, aborting.`);
    process.exit();
}
copyFileSync(templatePath, solutionScript, COPYFILE_EXCL);

// Create a new input file and open it. If one already exists just open it
if (existsSync(inputFile)) {
    console.warn(`An input file '${inputFile}' already exists.`);
} else {
    let placeholder = `Paste the input from https://adventofcode.com/2022/day/${puzzle}/input here`;
    if (!puzzle.match(/[12]?\d|3[01]/)) placeholder = 'Paste the input from https://adventofcode.com/ here';
    writeFileSync(inputFile, placeholder);
}
const open = require('open');
open(inputFile);
