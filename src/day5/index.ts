import { readInput } from "../utils/index";

const prepareInput = (rawInput: string) =>
  rawInput
    .trim()
    .replace(/F|L/g, "0")
    .replace(/B|R/g, "1")
    .split("\n")
    .map((line) => {
      const row = parseInt(line.substring(0, 7), 2);
      const col = parseInt(line.substring(7), 2);
      return row * 8 + col;
    });

const input = prepareInput(readInput("day5"));

const goA = (input: number[]) =>
  input.reduce((acc, seat) => (seat > acc ? seat : acc), 0);

const goB = (input: number[]) => {
  input.sort();
  for (let i = 0; i < input.length - 2; i++) {
    if (
      input[i] !== input[i + 1] - 1 && // Check if next id is missing
      input[i] === input[i + 1] - 2 // Check if seat after our potential seat exists
    ) {
      return input[i] + 1;
    }
  }
};

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
