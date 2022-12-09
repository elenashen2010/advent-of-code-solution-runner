const CONFIG = {
    INPUT_DIR: process.env.INPUT_DIR || 'input/',
    SOLUTION_DIR: process.env.SOLUTION_DIR || 'solutions/',
    TEMPLATE_PATH: process.env.SOLUTION_DIR || 'src/template/template.ts',
    DEBUG: process.env.DEBUG || false,
};
export function setConfigFlags(argv: any) {
    CONFIG.DEBUG = !!argv.debug;
}
export default CONFIG;