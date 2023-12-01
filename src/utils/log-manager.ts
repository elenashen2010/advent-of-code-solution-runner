const { log, debug } = console;
let count = 0;

export function trackedLog(...args: any[]) {
    count++;
    log(...args);
}
export function trackedDebug(...args: any[]) {
    count++;
    debug(...args);
}

export function trackLogging() {
    count = 0;
    console.log = trackedLog;
    console.debug = trackedDebug;
}

export function logCount(reset = false) {
    if (reset) count = 0;
    return count;
}

export function suspendLogging() {
    count = 0;
    console.log = () => { count++ };
    console.debug = trackedDebug;
}

export function restoreLogging() {
    console.log = log;
    console.debug = debug;
    return count;
}