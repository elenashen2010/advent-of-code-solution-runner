export default function solve(input: string) {
    console.log(`Running sample solution. It takes the input string and splits it into separate lines, printing each one and ultimately returning the number of lines passed in.\n`);

    const lines = input.split('\n');

    let lineCount = 0;

    lines.forEach((line, i) => {
        console.log(line);
        lineCount++;
    });

    return lineCount;
}