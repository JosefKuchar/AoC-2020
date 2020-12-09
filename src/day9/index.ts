import { test, readInput } from "../utils/index";

const prepareInput = (rawInput: string) =>
  rawInput.trim().split("\n").map(Number);

const input = prepareInput(readInput("day9"));

const hasSum = (numbers: number[], offset: number, size: number) => {
  for (let i = offset; i < numbers.length + offset; i++) {
    for (let j = i + 1; j < numbers.length + offset; j++) {
      if (numbers[i] + numbers[j] === numbers[offset + size]) {
        return true;
      }
    }
  }
  return false;
};

const getSum = (numbers: number[], lower: number, upper: number) => {
  let sum = 0;
  let min = Number.MAX_SAFE_INTEGER;
  let max = 0;
  for (let i = lower; i <= upper; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
    if (numbers[i] < min) {
      min = numbers[i];
    }
    sum += numbers[i];
  }
  return { sum, min, max };
};

const goA = (input: number[], size: number) => {
  for (let i = 0; i < input.length; i++) {
    if (!hasSum(input, i, size)) {
      return input[i + size];
    }
  }
  return 0;
};

const goB = (input: number[], size: number) => {
  const target = goA(input, size);

  let upper = 0;
  let lower = 0;

  while (upper < input.length) {
    const result = getSum(input, lower, upper);
    if (result.sum === target) {
      return result.min + result.max;
    }
    if (result.sum > target) {
      lower++;
    }
    if (result.sum < target) {
      upper++;
    }
  }

  return 0;
};

/* Tests */

// test()
const testInput = prepareInput(`
35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`);

test(goA(testInput, 5), 127);
test(goB(testInput, 5), 62);

/* Results */

console.time("Time");
const resultA = goA(input, 25);
const resultB = goB(input, 25);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
