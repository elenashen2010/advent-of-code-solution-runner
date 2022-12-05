// This TEST flag is used to tell whether the script is being run with the --devmode flag.
// It's useful if you want to add a lot of debug logs when developing but don't want to flood the console when running the real thing.
const TEST = require('../src/app-config').TEST;
/**
 * Here is a sample function setup for execution by the runner that returns a word count of the input file.
 *
 * You can name it whatever you want, but make sure to keep the "export default" since that's what the runner looks for.
 * You can also add more code outside of the default exported function if you want, such as other functions to keep your
 * code organized, but only the one with "export default" will be called directly.
 *
 * @readonly
 * @param {string[]} lines - An array of strings representing each line of the file.
 * @param {...string} [args] - An array of additional parameters passed when running `npm start <puzzle> [arg0] [arg1...]`.
 *        Not necessary for the runner to function and can be safely ignored, but may be useful later for quick testing.
 * @return {*} - The solution to the puzzle, which the runner will print to the console. Can be any type of value.
 */
export default function solve(lines: readonly string[], ...args: readonly string[]) {
    let result = 0;

    // Below is a demonstration of what you can do with the provided parameters
    console.log(`Running sample solution... It goes line by line and counts the number of words in the input file, printing the processed lines as it goes.`
              + `\nAn additional number can be added to the command line to limit how many lines are printed (Ex: "npm start sample 3").\n`);

    // Get a line limit from the additional params in args, if one exists.
    let printLimit: number;
    if (args[0]) {
        // Since command line arguments are always strings we have to convert it to a number first with parseInt()
        printLimit = parseInt(args[0]);
    }

    lines.forEach((line, index) => {
        // Using space as a delimiter, get the words in this line
        const words = line.split(/ +/);
        result += words.length;

        // If we are still under the print limit, print the current line and line number
        // Note: Since we did not initialize printLimit on line 24 it may be undefined if the user didn't provide a printLimit on the command Line,
        //   but since any number compared to undefined always returns false this check will still work the way we need it to
        if (index < printLimit) {
            const lineNumber = `${index+1}: `;
            let print = lineNumber + line;
            // Here we use the TEST flag to optionally show word counts for each line. Compare output between `npm run sample` and `npm test sample`
            if (TEST) {
                print += ` (${words.length})`;
            }
            console.log(print);
        }
    });

    process.stdout.write('Word count: ');
    // --- End of example ---
    return result;
}
