import math


input = []
numbers = "0123456789"

with open('D005/input2.txt', 'r') as f:
	input = [line.split(" ") for line in f.read().splitlines() if line != '']

seeds = [int(i) for i in input[0][1:]]
input.pop(0)
print(seeds)

mapi = []

for i in input:
	if i[0][0] in numbers:
		mapi[-1].append([int(x) for x in i])
	else:
		mapi.append([])

output = {}

seed_ranges = []

for i in range(0,len(seeds),2):
    seed_ranges.append([seeds[i], seeds[i+1]])


for seed in seeds:
	search_val = seed
	for map in mapi:
		for row in map:
			if row[1] <= search_val <= row[1] + row[2]:
				search_val = search_val - row[1] + row[0]
				break
	output[seed] = search_val

print(min(output.values()))