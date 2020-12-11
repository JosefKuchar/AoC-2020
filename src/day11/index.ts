import { test, readInput } from "../utils/index";

const prepareInput = (rawInput: string) =>
  rawInput
    .trim()
    .split("\n")
    .map((line) => line.split(""));

const input = prepareInput(readInput("day11"));

const getNeighbours = (input: string[][], x: number, y: number) => {
  let count = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (
        i >= 0 &&
        j >= 0 &&
        (i !== x || j !== y) &&
        i < input.length &&
        j < input[0].length &&
        input[i][j] === "#"
      ) {
        count++;
      }
    }
  }
  return count;
};

const calcState = (input: string[][]) => {
  let newState: string[][] = [];
  for (let i = 0; i < input.length; i++) {
    newState[i] = [];
    for (let j = 0; j < input[0].length; j++) {
      const val = input[i][j];
      newState[i][j] = val;
      if (val === "L" && getNeighbours(input, i, j) === 0) {
        newState[i][j] = "#";
      }
      if (val === "#" && getNeighbours(input, i, j) >= 4) {
        newState[i][j] = "L";
      }
    }
  }
  return newState;
};

const showState = (input: string[][]) => {
  input.forEach((row) => {
    console.log(row.join(""));
  });
};

const goA = (input: string[][]) => {
  let state = input;
  for (let i = 0; i < 500; i++) {
    state = calcState(state);
  }

  return state.reduce(
    (acc, row) =>
      row.reduce((acc2, val) => (val === "#" ? acc2 + 1 : acc2), 0) + acc,
    0
  );
};

const goB = (input: any) => {
  return;
};

/* Tests */

const testInput = prepareInput(`
L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`);

test(goA(testInput), 37);

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
