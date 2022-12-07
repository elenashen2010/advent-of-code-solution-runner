// This DEBUG flag is used to tell whether the script is being run with the --devmode or --debug option.
// It's useful if you want to add a lot of debug logs when developing but don't want to flood the console when running the real thing.
const DEBUG = require('../src/config/app-config').default.DEBUG;
/**
 * The function that will be executed by the runner.
 *
 * You can change the names of the function or its parameters, but keep the "export default" since that's what the runner looks for.
 * You can add more code outside of this function if you want, but only this function with "export default" will be called directly.
 *
 * @readonly
 * @param {string[]} lines - An array of strings representing each line of the file.
 * @return {*} - The solution to the puzzle, which the runner will print to the console. Can be any type of value.
 */
export default function solve(lines: readonly string[]) {
    // vvv Your solution code here vvv
    let result;


    return result;
    // ^^^ Your solution code here ^^^
}
