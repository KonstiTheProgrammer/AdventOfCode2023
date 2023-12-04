class Game {
    public gameId: number = 0;
    public WinningNumbers: Array<number> = [];
    public Numbers: Array<number> = [];
    public Points: number = 0;

    constructor() {
    }
}

const input = await Deno.readTextFile("input.txt").then((res) =>
    res.split("\r\n").map((line) => line.split(" ")));

const games: Array<Game> = [];
var output = 0;

input.forEach(line => {
    let i = 1;
    var game = new Game();
    game.gameId = parseInt(line[i]);
    i++;
    for (; i < line.length; i++) {
        if (line[i] === "|") break;
        game.WinningNumbers.push(parseInt(line[i]));
    }
    i++;

    for (; i < line.length; i++) {
        game.Numbers.push(parseInt(line[i]));
    }

    game.Points = game.WinningNumbers.filter(value => game.Numbers.indexOf(value) !== -1).length;
    games.push(game);
})

console.log(games.reduce((a, b) => a + b.Points, 0));


