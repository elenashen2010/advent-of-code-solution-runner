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
Running `npm run create <puzzle>` will automatically create two new files `input/<puzzle>.txt` and `solutions/<puzzle>.ts` for you.

The input file will automatically open so you can paste the input from the [AoC website](https://adventofcode.com/).

The solution file will come with a pre-made function where you can start coding your solution.  
This function is what the runner will grab and execute, so be careful changing the function definition unless you know what you're doing. 

You can refer to the provided [input/sample.txt](input/sample.txt) and [solutions/sample.ts](solutions/sample.ts) for extra guidance.