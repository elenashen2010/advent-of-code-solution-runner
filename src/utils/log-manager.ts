const log = console.log;
let count = 0;

export function trackedLog(...args: any[]) {
    count++;
    log(...args);
}

export function trackLogging() {
    count = 0;
    console.log = trackedLog;
}

export function logCount(reset = false) {
    if (reset) count = 0;
    return count;
}

export function suspendLogging() {
    count = 0;
    console.log = () => { count++ };
}

export function restoreLogging() {
    console.log = log;
    return count;
}