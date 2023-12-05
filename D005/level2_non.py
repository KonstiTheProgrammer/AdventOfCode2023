import math

class Blueprint:
	des_start: int
	des_end: int
	dep_start: int
	dep_end: int
	step: int

	def __init__(self, des_start, des_end, dep_start, dep_end, step):
		self.des_start = des_start
		self.des_end = des_end
		self.dep_start = dep_start
		self.dep_end = dep_end
		self.step = step
  
	def __repr__(self) -> str:
		return f"\tdes_start: {self.des_start},\t des_end: {self.des_end},\t dep_start: {self.dep_start},\t dep_end: {self.dep_end},\t step: {self.step}\n"


input = []
numbers = "0123456789"

with open('D005/input.txt', 'r') as f:
	input = [line.split(" ") for line in f.read().splitlines() if line != '']

seeds = [int(i) for i in input[0][1:]]
input.pop(0)

mapi = []

for i in input:
	if i[0][0] in numbers:
		mapi[-1].append([int(x) for x in i])
	else:
		mapi.append([])


seed_ranges = []

for i in range(0,len(seeds),2):
	seed_ranges.append([seeds[i], seeds[i+1]])
 
 


ranges = []
way = []

for i in mapi:
	listo = []
	for j in i:
		listo.append(Blueprint(j[1], j[1] + j[2], j[0], j[0] + j[2], j[2]))
	listo.sort(key=lambda x: x.des_start)
	ranges.append(listo)
 

ranges.reverse()
print(ranges)


i = 46
while(True):
	print("next: " , i)
	search_val = i
	for map in ranges:
		print(search_val)
		for row in map:
			if row.des_start <= search_val <= row.des_end:
				print(row)
				search_val = search_val - row.des_start + row.dep_start
				break
	
	for ran in seed_ranges:
		if ran[0] <= search_val <= ran[1]:
			print("answer: " , search_val)
			exit()
	break