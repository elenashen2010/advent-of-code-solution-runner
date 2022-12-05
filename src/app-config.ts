const CONFIG = {
    INPUT_DIR: process.env.INPUT_DIR || 'input/',
    SOLUTION_DIR: process.env.SOLUTION_DIR || 'solutions/',
    TEMPLATE_PATH: process.env.SOLUTION_DIR || 'src/template/template.ts',
    TEST: process.env.TEST || false,
};
export function setFlags(argv: any) {
    if (argv.devmode) CONFIG.TEST = true;
}
export default CONFIG;