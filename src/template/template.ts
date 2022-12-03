// This TEST flag is used to tell whether the script is being run with `npm run` or `npm test`.
// It's useful if you want to add a lot of debug logs when testing against test input from test.txt vs the real thing.
const TEST = process.argv.includes('--devmode');
/**
 * The function that will be executed by the runner.
 *
 * You can change the names of the function or its parameters, but keep the "export default" since that's what the runner looks for.
 * You can add more code outside of this function if you want, but only this function with "export default" will be called directly.
 *
 * @param {string[]} lines - An array of strings representing each line of the file.
 * @return {*} - The solution to the puzzle, which the runner will print to the console. Can be any type of value.
 */
export default function solve(lines: string[]) {
    // vvv Your solution code here vvv
    let result = 0; // AoC puzzles usually ask you for a numeric result, but you're free to change this!


    return result;
    // ^^^ Your solution code here ^^^
}