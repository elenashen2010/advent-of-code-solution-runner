import * as dotenv from 'dotenv';
dotenv.config();

const CONFIG = {
    APP_ROOT: process.env.APP_ROOT || `${global.appRoot}/`,
    SOLUTION_DIR: process.env.SOLUTION_DIR || 'solutions/',
    INPUT_DIR: process.env.INPUT_DIR || 'input/',
    PUZZLES_DIR: process.env.PUZZLES_DIR || 'puzzles/',
    TEST_INPUT_PATH: process.env.INPUT_FILENAME || 'puzzles/test.txt',
    SOLUTION_FILENAME: process.env.SOLUTION_FILENAME || '-solution.ts',
    INPUT_FILENAME: process.env.INPUT_FILENAME || '-input.txt',
    TEMPLATE_PATH: process.env.TEMPLATE_PATH || `${global.appRoot}/src/template/template.ts`,
    DEBUG: process.env.DEBUG || false,
    YEAR: process.env.YEAR || 2023,
};
export function setConfigFlags(argv: any) {
    CONFIG.DEBUG = !!argv.debug;
}
export default CONFIG;