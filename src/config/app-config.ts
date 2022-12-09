import * as dotenv from 'dotenv';
dotenv.config();

const CONFIG = {
    APP_ROOT: process.env.APP_ROOT || `${global.appRoot}/`,
    INPUT_DIR: process.env.INPUT_DIR || 'input/',
    SOLUTION_DIR: process.env.SOLUTION_DIR || 'solutions/',
    TEMPLATE_PATH: process.env.TEMPLATE_PATH || `${global.appRoot}/src/template/template.ts`,
    DEBUG: process.env.DEBUG || false,
};
export function setConfigFlags(argv: any) {
    CONFIG.DEBUG = !!argv.debug;
}
export default CONFIG;