/**
 * Here is a sample function setup for execution by the runner that returns a word count of the input file.
 *
 * You can name it whatever you want, but make sure to keep the "export default" since that's what the runner looks for.
 * You can also add more code outside of the default exported function if you want, such as other functions to keep your
 * code organized, but only the one with "export default" will be called directly.
 *
 * @param {string} input - The full text of the file as one long string.
 * @param {string[]} lines - An array of strings representing each line of the file.
 * @param {...string} [args] - An array of additional parameters passed when running `npm start <puzzle> [arg0] [arg1...]`.
 *        Not necessary for the runner to function and can be safely ignored, but may be useful later for quick testing.
 * @return {*} - The solution to the puzzle, which the runner will print to the console. Can be any type of value.
 */
export default function solve(input: string, lines: string[], ...args: string[]) {
    let result;
    // vvv Your solution code here vvv

    // ^^^ Your solution code here ^^^

    // Below is a demonstration of what you can do with the provided parameters
    console.log(`Running sample solution... It goes line by line and counts the number of words in the input file, printing the processed lines as it goes.`
              + `\nAn additional number can be added to the command line to limit how many lines are printed (Ex: "npm start sample 3").\n`);

    // Gets a line limit from the additional params
    const printLimit = parseInt(args[0]);
    let wordCount = 0;

    lines.forEach((line, index) => {
        // Using space as a delimiter, get the number of words in this line
        wordCount += line.split(/ +/).length;

        // If no additional param for line limit was passed OR if we are still under the print limit, print the current line and line number.
        if (Number.isNaN(printLimit) || index < printLimit) {
            console.log(`${index+1}:`, line);
        }
    });

    console.log(`\nThe input file has ${wordCount} words and ${input.length} characters in it.\n`);

    result = wordCount;
    // --- End of example ---
    return result;
}