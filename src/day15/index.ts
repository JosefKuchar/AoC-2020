import { test, readInput } from "../utils/index";

const prepareInput = (rawInput: string) => rawInput.split(",").map(Number);

const input = prepareInput(readInput("day15"));

interface KeyVal {
  [key: number]: number[];
}

const getLast = (input: number[], num: number) => {
  let spoken: KeyVal = {};
  let last = input[input.length - 1];

  input.forEach((num, i) => {
    spoken[num] = [i + 1];
  });

  for (let i = input.length + 1; i <= num; i++) {
    const lastLen = spoken[last].length;
    if (lastLen === 1) {
      last = 0;
      if (typeof spoken[0] === 'undefined') {
        spoken[0] = [];
      }
      spoken[0].push(i)
    } else {
      const diff = spoken[last][lastLen - 1] - spoken[last][lastLen - 2]
      if (typeof spoken[diff] === 'undefined') {
        spoken[diff] = [];
      }
      spoken[diff].push(i);
      last = diff;
    }
  }
  return last;
}

const goA = (input: number[]) => getLast(input, 2020);

const goB = (input: any) => getLast(input, 30000000);

/* Tests */

test(goA(prepareInput("0,3,6")), 436);

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
