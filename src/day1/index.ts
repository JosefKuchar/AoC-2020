import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput
    .trim()
    .split('\n')
    .map(Number)

const input = prepareInput(readInput('day1'))

const goA = (input: number[]) => {
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (input[i] + input[j] == 2020) {
        return input[i] * input[j];
      }
    }
  }
  return null;
}

const goB = (input) => {
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      for (let k = j + 1; k < input.length; k++) {
        if (input[i] + input[j] + input[k] == 2020) {
          return input[i] * input[j] * input[k];
        }
      }
    }
  }
  return null;
}

/*  Tests */

const testInput = prepareInput(`
1721
979
366
299
675
1456`);

test(goA(testInput), 514579);
test(goB(testInput), 241861950);

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
