class Game {
    public gameId: number = 0;
    public WinningNumbers: Array<number> = [];
    public Numbers: Array<number> = [];
    public Points: number = 0;
    public Wins: number = 0;

    constructor() {
    }
}

interface IQueue<T> {
    enqueue(item: T): void;

    dequeue(): T | undefined;

    size(): number;
}

class Queue<T> implements IQueue<T> {
    private storage: T[] = [];

    constructor(private capacity: number = Infinity) {
    }

    enqueue(item: T): void {
        if (this.size() === this.capacity) {
            throw Error("Queue has reached max capacity, you cannot add more items");
        }
        this.storage.push(item);
    }

    dequeue(): T | undefined {
        return this.storage.shift();
    }

    size(): number {
        return this.storage.length;
    }
}


const input = await Deno.readTextFile("input.txt").then((res) =>
    res.split("\r\n").map((line) => line.split(" ").filter(k => k)));

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

    game.Wins = (game.WinningNumbers.filter(value => game.Numbers.indexOf(value) !== -1).length);
    if (game.Wins > 0) game.Points = 2 ** (game.Wins - 1);
    games.push(game);
})


let queue: IQueue<Game> = new Queue<Game>();
queue.enqueue(games[0]);
let numberOfScratchCards = 0;

while (queue.size() > 0) {
    let game = queue.dequeue()!;
    numberOfScratchCards++;
    games.slice(game.gameId - 1, game.gameId + game.Wins).forEach(game => {
        console.log(game);
        queue.enqueue(game);
    });
}


console.log("level 1: ", games.reduce((a, b) => a + b.Points, 0));
console.log("level 2: ", numberOfScratchCards);


