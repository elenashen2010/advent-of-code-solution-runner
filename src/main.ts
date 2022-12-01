import { constants, existsSync, accessSync, readFileSync } from 'fs';
import { resolve } from 'path';

// "npm start" arguments
const args = process.argv.slice(2);
if (args.length === 0) {
    console.warn('Missing required [day] param. Ex: "npm start 1"');
    process.exit();
}

// Construct input and solution file paths from args
let inputFile = `input/${args[0]}`;
let solutionScript = `solutions/${args[0]}.ts`;

// Verify that input and solution files exist and can be accessed
if (!existsSync(inputFile)) inputFile += '.txt';
try {
    accessSync(inputFile, constants.F_OK | constants.R_OK);
    accessSync(solutionScript, constants.F_OK | constants.R_OK);
} catch(e) {
    const { message } = e as Error;
    console.warn(message || e);
    process.exit(message ? 0 : 1);
}

// Read the input file and convert it into a multiline string
const input = readFileSync(inputFile, { encoding: 'utf-8' });

// execute the solution function exported from the solution script
const solution = require(resolve(solutionScript));
const result = solution.default(input);
console.log(result);
