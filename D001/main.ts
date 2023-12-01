const input = await Deno.readTextFile('./input1.txt').then(k => k.split('\r\n'));
let answer = 0;

const sus: Record<string, number> = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
    "zero": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "0": 0
};

input.forEach(k => {
    let numbers: Array<number> = [];
    for (let i = 0; i < k.length; i++) {
        for (let key in sus) {
            let j = 0;
            while (i + j < k.length && k[i + j] === key[j]) {
                j++;
                if (j === key.length) {
                    numbers.push(sus[key]);
                    break;
                }
            }
        }
    }
    if (numbers.length > 0)
        answer += (numbers[0] * 10 + numbers[numbers.length - 1]);
});

console.log(answer);