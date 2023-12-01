// This DEBUG flag is used to tell whether the script is being run with the --devmode flag.
// It's useful if you want to add a lot of debug logs when developing but don't want to flood the console when running the real thing.
const DEBUG = require(`${global.appRoot}/src/config/app-config`).default.DEBUG;
/**
 * Here is a sample function setup for execution by the runner that returns a word count of the input file.
 *
 * You can name it whatever you want, but make sure to keep the "export default" since that's what the runner looks for.
 * You can also add more code outside of the default exported function if you want, such as other functions to keep your
 * code organized, but only the one with "export default" will be called directly.
 *
 * @readonly
 * @param {string[]} lines - An array of strings representing each line of the file.
 * @return {*} - The solution to the puzzle, which the runner will print to the console. Can be any type of value.
 */
export default function solve(lines: readonly string[]) {
    let result = 0;

    // Below is a demonstration of what you can do with the provided parameters
    console.log(`Running sample solution... It goes line by line and counts the number of words in the input file, printing the processed lines as it goes.`
              + `\nAn additional number can be added to the command line to limit how many lines are printed (Ex: "aoc-run sample 3").\n`);

    lines.forEach((line, index) => {
        // Using space as a delimiter, get the words in this line
        const words = line.split(/ +/);
        result += words.length;

        // Limit the number of lines printed to the console to 5, unless DEBUG is true
        if (index < 5 || DEBUG) {
            const lineNumber = `${index+1}: `;
            let print = lineNumber + line;
            // Here we use the DEBUG flag to optionally show word counts for each line. Compare output between `npm run sample` and `npm test sample`
            if (DEBUG) {
                print += ` (${words.length} words)`;
            }
            console.log(print);
        }
    });

    // --- End of example ---
    return result;
}
