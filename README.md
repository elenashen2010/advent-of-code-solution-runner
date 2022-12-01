This module serves as a command-line interface wrapper for executing the various solution scripts made for the Advent of Code 2022 daily challenges.

## Installation
Clone the repository onto your machine with the command `git clone git@github.com:elenashen2010/advent-of-code-2022-solution-runner.git`

Then `cd` into the directory and run `npm install`

## Usage
(You can run `npm start sample` to see how it works first-hand)
### Executing a script
Run the command `npm start <puzzle>`, where "name" is the filename of your solution script in the `solutions/` directory (do not include file extensions).

The wrapper assumes your scripts have the `.ts` file extension.

### Starting a new challenge
For each challenge you will need two files, one in the `input/` directory and one in the `solutions/` directory.  
The two files should share the same name.

For the input file, copy-paste the input given to you by the AoC website (https://adventofcode.com/2022/day/1/input).

For the solution file, default export a function that takes a single string parameter and returns your result. This function is what the runner will grab and execute, printing the result to the console.

You can refer to the provided `input/sample` and `solutions/sample.ts` for extra guidance.