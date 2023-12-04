const patternRed = /(\d+)\s(red)/g;
const patternBlue = /(\d+)\s(blue)/g;
const patternGreen = /(\d+)\s(green)/g;

const input = await Deno.readTextFile("input2.txt").then((text) => text.split("\r\n"));
var answer = 0;

input.forEach((line) => {
    var maxRed = 0;
    var maxGreen = 0;
    var maxBlue = 0;

    line.split(";").forEach((newLine) => {
        var countRed = 0;
        var countGreen = 0;
        var countBlue = 0;

        [...newLine.matchAll(patternGreen)].forEach((match) => {
            countGreen += parseInt(match[1]);
        });

        [...newLine.matchAll(patternBlue)].forEach((match) => {
            countBlue += parseInt(match[1]);
        });

        [...newLine.matchAll(patternRed)].forEach((match) => {
            countRed += parseInt(match[1]);
        });

        if (countRed > maxRed)
            maxRed = countRed;
        if (countGreen > maxGreen)
            maxGreen = countGreen;
        if (countBlue > maxBlue)
            maxBlue = countBlue;
    });

    answer += maxRed * maxGreen * maxBlue;
});


console.log(answer)




