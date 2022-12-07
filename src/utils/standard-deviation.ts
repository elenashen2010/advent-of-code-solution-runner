export function calcStandardDeviation(array: number[]) {
    const n = array.length;
    const mean = array.reduce((a, b) => a + b) / n;
    const stdDev = Math.sqrt(array.map(x => (x - mean) ** 2).reduce((a, b) => a + b) / n);
    return [ mean, stdDev ];
}