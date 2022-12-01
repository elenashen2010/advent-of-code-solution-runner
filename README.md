**AoC '22 Solution Runner** is a command-line tool for easily executing the various solution scripts you make for the Advent of Code 2022 daily challenges.

It handles all the file parsing and such you will need for each puzzle, allowing you to get straight to coding actual solutions.
- No need to spend time learning how to work with file systems or line readers, a common hurdle for junior coders who haven't learned those yet but are eager to participate.
- Keep your solution scripts lean and free of repetitive boilerplate.
- Streamlines the process of preparing for new puzzles.

## Installation
### Prerequisites
- [Node.js](https://nodejs.org/en/download/) (version 18.x.x recommended)
- A terminal to run it on and some basic knowledge of how to use said terminal

### Installing the Runner
Clone the repository onto your machine with the command `git clone git@github.com:elenashen2010/advent-of-code-2022-solution-runner.git`

Or if you don't have git installed you can download the source code [here](https://github.com/elenashen2010/advent-of-code-2022-solution-runner/releases) and extract it to your machine.

Once it's downloaded, navigate to the project directory on your terminal and run `npm install`

## Usage
You can run `npm start sample` to see how it works first-hand.
### Executing a script
Run the command `npm start <puzzle>`, where "puzzle" is the file name of your solution script in the `solutions/` directory (do not include file extensions).

The wrapper assumes your scripts have the `.ts` file extension.

### Starting a new challenge
For each challenge you will need two files with matching names, a .txt in the `input/` directory and a .ts in the `solutions/` directory.

For the input file, copy-paste the input given to you by the AoC website (https://adventofcode.com/2022/day/1/input).

For the solution file, `default export` a function that takes a string parameter and returns your result. This function is what the runner will grab and execute, printing the result to the console.

You can refer to the provided [input/sample.txt](input/sample.txt) and [solutions/sample.ts](solutions/sample.ts) for extra guidance.