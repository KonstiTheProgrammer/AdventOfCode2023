const input = await Deno.readTextFile("input2.txt").then(k => k.split("\r\n"));

const isNumber = (n: string) => {
    return n >= '0' && n <= '9';
}
const isSymbol = (s: string) => {
    return !isNumber(s) && s != '.';
}

const input2: Array<Array<Element>> = []

const numbs: Array<GroupOfNumber> = [];

for (let i = 0; i < input.length; i++) {
    input2.push([]);
    let wasLastNumber = false;
    for (let j = 0; j < input[i].length; j++) {
        input2[i].push({element: input[i][j], x: j, y: i, listo: []})
        if (isNumber(input[i][j]))
            if (wasLastNumber) {
                numbs[numbs.length - 1].num += input[i][j];
                numbs[numbs.length - 1].toX++;
            } else {
                numbs.push({num: input[i][j], fromX: j, fromY: i, toY: i, toX: j, listOfAdjacent: []});
                wasLastNumber = true;
            }
        else
            wasLastNumber = false;
    }
}

numbs.forEach(num => {
    const left = (num.fromX - 1 >= 0);
    const right = (num.toX + 1 < input[0].length);
    const top = (num.fromY - 1 >= 0);
    const bottom = (num.toY + 1 < input.length);

    if (left && isSymbol(input[num.fromY][num.fromX - 1])) num.listOfAdjacent.push(input2[num.fromY][num.fromX - 1]);
    if (left && top && isSymbol(input[num.fromY - 1][num.fromX - 1])) num.listOfAdjacent.push(input2[num.fromY - 1][num.fromX - 1]);
    if (left && bottom && isSymbol(input[num.fromY + 1][num.fromX - 1])) num.listOfAdjacent.push(input2[num.fromY + 1][num.fromX - 1]);
    if (right && isSymbol(input[num.fromY][num.toX + 1])) num.listOfAdjacent.push(input2[num.fromY][num.toX + 1]);
    if (right && top && isSymbol(input[num.fromY - 1][num.toX + 1])) num.listOfAdjacent.push(input2[num.fromY - 1][num.toX + 1]);
    if (right && bottom && isSymbol(input[num.toY + 1][num.toX + 1])) num.listOfAdjacent.push(input2[num.toY + 1][num.toX + 1]);
    bottom && (input2[num.toY + 1].slice(num.fromX, num.toX + 1).filter(k => isSymbol(k.element)).forEach(k => num.listOfAdjacent.push(k)))
    top && (input2[num.toY - 1].slice(num.fromX, num.toX + 1).filter(k => isSymbol(k.element)).forEach(k => num.listOfAdjacent.push(k)))
});

const levelOne = numbs.filter(k => k.listOfAdjacent.length > 0).reduce((sum, current) => sum + Number(current.num), 0);
console.log("levelOne :", levelOne);

const listOfMechanical: Array<Element> = [];
numbs.forEach(k => {
    if(!k.listOfAdjacent.some(r => r.element == '*')) return;
    k.listOfAdjacent.forEach(r => {
        r.listo.push(k)
        listOfMechanical.push(r);
    });
    return k
});

var level2 = 0;
const visited = new Set<Element>();
listOfMechanical.forEach(k => {
    if(visited.has(k)) return;
    visited.add(k);
    console.log(k.listo.map(k => Number(k.num)))
    if(k.listo.length <= 1) return;
    level2 += k.listo.map(k => Number(k.num)).reduce((sum, current) => sum * current, 1);
})

console.log("levelTwo :", level2);

interface GroupOfNumber {
    num: string;
    fromX: number;
    fromY: number;
    toX: number
    toY: number
    listOfAdjacent: Array<Element>
}

interface Element {
    element: string;
    x: number;
    y: number;
    listo: Array<GroupOfNumber>
}