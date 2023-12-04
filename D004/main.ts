class Game {
    public gameId: number = 0;
    public WinningNumbers: Array<number> = [];
    public Numbers: Array<number> = [];
    public Points: number = 0;
    public Wins: number = 0;
    public AmountOfTicket = 1;
    constructor() {
    }
}

const games = new Array<Game>();

const input = await Deno.readTextFile("input2.txt").then((res) =>
    res.split("\r\n").map((line) => line.split(" ").filter(k => k)));

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

    game.Wins = (game.WinningNumbers.filter(value => game.Numbers.indexOf(value) !== -1).length);
    if (game.Wins > 0) game.Points = 2 ** (game.Wins - 1);
    games.push(game);
})

let numberOfScratchCards = 0;

games.forEach(game => {
    numberOfScratchCards += game.AmountOfTicket;
    games.slice(game.gameId, game.gameId + game.Wins).forEach(k => {
        k.AmountOfTicket += game.AmountOfTicket
    })
    console.log(game.AmountOfTicket);
})


console.log("level 1: ", games.reduce((a, b) => a + b.Points, 0));
console.log("level 2: ", numberOfScratchCards);


