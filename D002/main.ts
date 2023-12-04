const patternRed = /(\d+)\s(red)/g;
const patternBlue = /(\d+)\s(blue)/g;
const patternGreen = /(\d+)\s(green)/g;

const input = await Deno.readTextFile("input2.txt").then((text) => text.split("\r\n"));
var answer = 0;

input.forEach((line) => {
    var success = line.split(";").map((newLine) => {
        var countRed = 12;
        var countGreen = 13;
        var countBlue = 14;

        [...newLine.matchAll(patternGreen)].forEach((match) => {
            countGreen -= parseInt(match[1]);
        });

        [...newLine.matchAll(patternBlue)].forEach((match) => {
            countBlue -= parseInt(match[1]);
        });

        [...newLine.matchAll(patternRed)].forEach((match) => {
            countRed -= parseInt(match[1]);
        });

        return (countRed >= 0 && countBlue >= 0 && countGreen >= 0)
    });

    console.log(success)

    if (success.every(x => x))
        answer += Number(line.match(/Game (\d+):/)[1]);
});





console.log(answer)




