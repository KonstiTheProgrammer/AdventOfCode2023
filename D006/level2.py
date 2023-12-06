class Race:
    duration: int
    distance: int 
    waysToWin: int

    def __init__(self, duration: int, distance: int, waysToWin: int = 0):
        self.duration = duration
        self.distance = distance
        self.waysToWin = waysToWin

    def __repr__(self) -> str:
        return f"|dur: {self.duration}, dist: {self.distance}, ways: {self.waysToWin}|\t"

fields = []

with open("D006/input2.txt", "r") as f:
    input = [[x for x in line.split(" ")[1:] if x != ''] for line in f.read().splitlines()]
    fields.append(Race(int(''.join(input[0])), int(''.join(input[1]))))
        

for field in fields:
    for i in range (field.duration):
        if i * (field.duration - i) > field.distance:
            field.waysToWin += 1
            
            

answer = 1
for field in fields:
    answer *= field.waysToWin

print(answer)