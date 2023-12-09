using CodingsHelpers;

var winOrder = "AKQT98765432J";
var input = File.ReadAllLines(@"input2.txt").Select(k => k.Split(" ")).Select(k => new HandSet(k[0], k[1].ToInt32()))
    .ToList();

String GetNumber(char i) {
    var x = (winOrder.Length - winOrder.IndexOf(i));
    return (x < 10) ? "0" + x : x.ToString();
}

foreach (var i in input) {
    var group = i.Groups;
    var jokerCount = group.FirstOrDefault(k => k.Character == 'J')?.Count ?? 0;
    
    if(jokerCount == 0) continue;

    i.JokerCount = jokerCount;

    
    if(jokerCount == 5) 
        i.Groups.First().Character = 'A';

    var elem = i.Groups.FirstOrDefault(k => k.Character == 'J');
    if(elem is not null) i.Groups.Remove(elem);
        
    
    if (jokerCount == 4) 
        i.Groups.First().Count = 5;
    if (jokerCount == 3)
        i.Groups.First().Count += 3;
    if (jokerCount == 2)
        i.Groups.First().Count += 2;
    if (jokerCount == 1)
        i.Groups.First().Count += 1;
}






foreach (var i in input) {
    var group = i.Groups;
    if (group.Any(k => k.Count == 5)) 
        i.Points = "9";
    else if (group.Any(k => k.Count == 4))
        i.Points = "8";
    else if (group.Any(k => k.Count == 3) && group.Any(k => k.Count == 2))
        i.Points = "7";
    else if (group.Any(k => k.Count == 3))
        i.Points = "6";
    else if (group.Count(k => k.Count == 2) > 1)
        i.Points = "5";
    else if (group.Any(k => k.Count == 2))
        i.Points = "4";
    else
        i.Points = "3";
    
    i.Points += String.Join(String.Empty, i.Hand.SelectMany(k => GetNumber(k)));
}

var winList = input.OrderBy(k => k.Points.ToInt64()).ToList();
var points = winList.Select((k, i) => k.Bid * (i+ 1)).Sum();
Console.WriteLine(points);


class HandSet {
    public string Hand { get; set; }
    public Int32 Bid { get; set; }
    public string Points { get; set; } = String.Empty;

    public IList<CharGroup> Groups;

    public int JokerCount = 0;

    public HandSet(string hand, int bid) {
        var winOrder = "AKQT98765432J";
        Hand = hand;
        Bid = bid;
        Groups = Hand.GroupBy(k => k)
            .Select(k => new CharGroup() { Character = k.Key, Count = k.Count() })
            .OrderBy(k => winOrder.IndexOf(k.Character))
            .OrderByDescending(k => k.Count).ToList();
    }

    public override string ToString() => Groups.Select(k => Enumerable.Repeat(k.Character, k.Count)).SelectMany(k => k)
        .ConvertToString();

    public class CharGroup {
        public char Character { get; set; }
        public int Count { get; set; }
    }
}