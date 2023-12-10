using System.Diagnostics;
using System.Numerics;
using System.Text;
using CodingsHelpers;

var input = File.ReadAllLines("input2.txt").Select(k => k.Replace("(", "").Replace(")", "").Replace(",", "")
    .Replace("=", "")
    .Split(" ", StringSplitOptions.RemoveEmptyEntries)).ToList();

var directions = input[0][0].Select(k => k.ToString()).ToList();
input.RemoveAt(0);
input.RemoveAt(0);

var nodes = input.Select(k => new Node() { Name = k[0] }).ToList();

for (var i = 0; i < nodes.Count; i++) {
    nodes[i].LeftNode = nodes.First(b => b.Name == input[i][1]);
    nodes[i].RightNode = nodes.First(b => b.Name == input[i][2]);
}

var currentNodes = nodes.Where(k => k.Name[2] == 'A')!.ToList();
var startNodes = currentNodes.ToList();
nodes.Where(k => k.Name[2] == 'Z').ToList().ForEach(k => k.IsEndNode = true);
var steps = 0;

var finishedNodes = new List<Node>();

while (startNodes.Any()) {
    startNodes.ForEach(k => k.Sequenzes.Add(""));
    foreach (var direction in directions) {
        steps++;
        for (var i = 0; i < currentNodes.Count; i++) {
            currentNodes[i] = currentNodes[i].GetNode(direction);
            startNodes[i].Sequenzes[^1] += currentNodes[i].Name;
        }
    }

    var nodus = new List<int>();

    for (var i = 0; i < startNodes.Count; i++) {
        if (startNodes[i].Sequenzes.GroupBy(k => k).Any(k => k.Count() > 1)) {
            Console.WriteLine("Remove: " + startNodes[i] + " Count: " + startNodes[i].Sequenzes.Count());
            finishedNodes.Add(startNodes[i]);
            nodus.Add(i);
        }
    }

    nodus.Reverse();
    foreach (var i in nodus) {
        startNodes.RemoveAt(i);
        currentNodes.RemoveAt(i);
    }
}

var x = finishedNodes.Select(k => {
    var pos = k.Sequenzes.FindIndex(r => r == k.Sequenzes[^1]);
    var number = pos * directions.Count() + (k.Sequenzes.Count() - pos - 1) * directions.Count();
    k.SeqPos = pos;
    return number;
}).ToList();

foreach (var finishedNode in finishedNodes) {
    var fullSeq = finishedNode.FullSequence();
    finishedNode.Sequence = new StringBuilder(fullSeq);
    for (var i = 2; i < fullSeq.Length; i += 3) {
        if (fullSeq[i] == 'Z') {
            finishedNode.PosOfPossibleWins = i;
        }
    }

    finishedNode.Sequenzes.RemoveAt(finishedNode.Sequenzes.Count - 1);
    finishedNode.SeqLength = fullSeq.Length;
}

var multi = 1;
while (true) {
    finishedNodes.Skip(1).ForEach(k => {
        while (finishedNodes[0].GetSeqLen() >= k.GetSeqLen())
            k.Multi++;
    });

    if (!finishedNodes.Select(k => k.GetSeqLen()).Distinct().Skip(1).Any())
        return;

    finishedNodes[0].Multi++;

    Console.WriteLine(finishedNodes[0].GetSeqLen());
}


class Node {
    public string Name = String.Empty;
    public Node LeftNode { get; set; } = null!;
    public Node RightNode { get; set; } = null!;
    public bool IsEndNode = false;
    public List<string> Sequenzes { get; set; } = new();
    public int SeqPos = 0;
    public int PosOfPossibleWins { get; set; }
    public int WinPos => (PosOfPossibleWins - 2) / 3;
    public StringBuilder Sequence { get; set; }

    public int SeqLength = 0;

    public int Multi = 1;

    public Node GetNode(string direction) {
        return direction == "L" ? LeftNode : RightNode;
    }

    public BigInteger GetSeqLen() {
        return (Sequenzes[0].Length / 3 + (PosOfPossibleWins - 2) / 3 + (SeqLength * Multi) / 3);
    }

    public string FullSequence() {
        return string.Join(String.Empty, Sequenzes.Skip(SeqPos));
    }
}