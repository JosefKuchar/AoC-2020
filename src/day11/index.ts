import { test, readInput } from "../utils/index";

const prepareInput = (rawInput: string) =>
  rawInput
    .trim()
    .split("\n")
    .map((line) => line.split(""));

const input = prepareInput(readInput("day11"));

const getNeighbours = (
  state: string[][],
  x: number,
  y: number,
  long: boolean
) => {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i !== 0 || j !== 0) {
        for (let k = 1; ; k++) {
          const a = x + i * k;
          const b = y + j * k;

          if (a >= 0 && b >= 0 && a < state.length && b < state[0].length) {
            if (state[a][b] === "#") {
              count++;
              break;
            }
            if (state[a][b] === "L" || !long) {
              break;
            }
          } else {
            break;
          }
        }
      }
    }
  }
  return count;
};

const calcState = (state: string[][], long: boolean, treshold: number) => {
  let newState: string[][] = [];
  for (let i = 0; i < state.length; i++) {
    newState[i] = [];
    for (let j = 0; j < state[0].length; j++) {
      const val = state[i][j];
      newState[i][j] = val;
      if (val === "L" && getNeighbours(state, i, j, long) === 0) {
        newState[i][j] = "#";
      }
      if (val === "#" && getNeighbours(state, i, j, long) >= treshold) {
        newState[i][j] = "L";
      }
    }
  }
  return newState;
};

const count = (state: string[][]) =>
  state.reduce(
    (acc, row) =>
      row.reduce((acc2, val) => (val === "#" ? acc2 + 1 : acc2), 0) + acc,
    0
  );

const goA = (input: string[][]) => {
  let state = input;
  for (let i = 0; i < 500; i++) {
    state = calcState(state, false, 4);
  }

  return count(state);
};

const goB = (input: string[][]) => {
  let state = input;
  for (let i = 0; i < 500; i++) {
    state = calcState(state, true, 5);
  }

  return count(state);
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
test(goB(testInput), 26);

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
