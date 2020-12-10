import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => {
  let numbers = rawInput
    .trim()
    .split('\n')
    .map(Number)

  numbers.sort((a, b) => a - b);

  return [0, ...numbers, numbers[numbers.length - 1] + 3];
}

const input = prepareInput(readInput('day10'))

const goA = (input: number[]) => {
  let acc = 0;
  let one = 0;
  let three = 0;
  input.forEach(num => {
    const diff = num - acc;
    if (diff === 1) one++;
    if (diff === 3) three++;
    acc = num;
  })
  return one * three;
}

const findBounds = (numbers: number[], start: number) => {
  let i = start;
  while (true) {
    if (i + 2 < numbers.length && numbers[i + 2] - numbers[i] <= 3) {
      i++;
    } else {
      return i + 1;
    }
  }
}

// Might not be sufficient for all inputs
const findCombinations = (numbers: number[], lower: number, upper: number) => {
  const diff = upper - lower;

  switch (diff) {
    case 1:
      return 1
    case 2:
      return 2
    case 3:
      return 4
    case 4:
      return 7
  }

  throw new Error('Not implemented');
}

const goB = (input: number[]) => {
  let combinations = 1;
  let index = 0;
  while (index < input.length - 1) {
    let newIndex = findBounds(input, index);
    combinations *= findCombinations(input, index, newIndex);
    index = newIndex;
  }

  return combinations;
}

/* Tests */

const testInput = prepareInput(`
16
10
15
5
1
11
7
19
6
12
4`)

const testInput2 = prepareInput(`
28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`);

test(goA(testInput), 35);
test(goA(testInput2), 220)

test(goB(testInput), 8);
test(goB(testInput2), 19208);

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
