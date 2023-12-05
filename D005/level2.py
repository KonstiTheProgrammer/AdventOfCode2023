import multiprocessing as mp

def find_smallest(seedo, mapi):
    smallest = 1000000000
    for seed in range(seedo[0], seedo[0] + seedo[1]):
        search_val = seed
        for map in mapi:
            for row in map:
                if row[1] <= search_val <= row[1] + row[2]:
                    search_val = search_val - row[1] + row[0]
                    break
        if search_val < smallest:
            smallest = search_val
    return smallest

if __name__ == '__main__':
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

    seed_ranges = []

    for i in range(0,len(seeds),2):
        seed_ranges.append([seeds[i], seeds[i+1]])

    pool = mp.Pool(processes=mp.cpu_count())
    results = [pool.apply_async(find_smallest, args=(seedo,mapi)) for seedo in seed_ranges]
    smallest_values = [result.get() for result in results]
    print(min(smallest_values))