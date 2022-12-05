**AoC '22 Solution Runner** is a command-line tool for easily executing the various solution scripts you make for the Advent of Code 2022 daily challenges.

It handles all the file parsing and such you will need for each puzzle, allowing you to get straight to coding actual solutions.
- No need to spend time learning how to work with file systems or line readers, a common hurdle for junior coders who haven't learned those yet but are eager to participate.
- Keep your solution scripts lean and free of repetitive boilerplate.
- Streamlines the process of preparing for new puzzles.

# Installation
## Prerequisites
- [Node.js](https://nodejs.org/en/download/) (version 18.x.x recommended)
- A terminal to run it on and some basic knowledge of how to use said terminal

## Downloading
In your terminal, navigate to where you want to keep your project and clone the repository onto your machine with the command:
```shell
git clone git@github.com:elenashen2010/advent-of-code-2022-solution-runner.git
```

**--- OR ---**

If you don't have git installed you can download the source code [here](https://github.com/elenashen2010/advent-of-code-2022-solution-runner/releases) and extract it to your machine.

##Installation
Once it's downloaded, navigate to the project directory on your terminal and run:
```shell
npm install -g
```

# Usage
## Starting a new challenge
To set up for a new puzzle, run the command:

```shell
aoc-run new
```

It will automatically create new files for your solution script and input.  

The input file will automatically open. You can paste the input from the [AoC website](https://adventofcode.com/) there. Replace the placeholder lines when you do.

The solution file will come with a pre-made function where you can start coding your solution.  
This function is what the program will grab and execute, so be careful changing the function definition unless you know what you're doing. 

You can refer to the provided [input/sample.txt](input/sample.txt) and [solutions/sample.ts](solutions/sample.ts) for extra guidance.

## Executing your scripts
To execute your solution against the input file, just use the command:
```shell
aoc-run
```

The return value of the function you worked on will appear on the console.

Run `aoc-run sample` too see an example script execution and output.

## Testing your scripts with Development Mode
For an easy way to test your solution while developing, use the command:
```shell
aoc-run --devmode
```

With Development Mode, the program stays active and **automatically reruns your script whenever the script or input file has changed!**

Dev Mode also sets the program to use [input/test.txt](input/test.txt) as the input file instead.
With the thousands of lines of input AoC always gives you, any bugs you may have would be impossible to trace.
This test input file lets you provide the program with a much smaller set of input that's more manageable to verify your results against.

Since every AoC puzzle comes with an example input and result **I strongly recommend putting that example input into the test file and running your program against that first.**

### The TEST flag
Finally, there's a special variable set at the top your script called `TEST`.
This value is only set to **true** when in Dev Mode, and **false** otherwise. It's useful if you want to add a lot of debug logs when testing
but would rather not flood your console with those logs when running the real thing.

## Advanced Usage
If you don't want to use today's date as the file names of your script and input, you can use a different one
by adding a space and your preferred name after the `aoc-run` command.  
Use this to work on a previous day's puzzle or even something else entirely.

Examples:
```shell
# To create files for a previous day's puzzle:
aoc-run new 2
# To run the day 2 solution script:
aoc-run 2

# Create script and input files called better.ts and better.txt instead:
aoc-run new better
# To run the better.ts script:
aoc-run better
```

**Note:** If you use a new name to create a script, then you have to also provide it when trying to run it since the program won't know what file to look for otherwise. 

---

If you ever need a quick refresher on the ways you can use this program you can run: 
```
aoc-run --help
```