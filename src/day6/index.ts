import { test, readInput } from "../utils/index";

const prepareInput = (rawInput: string) =>
  rawInput
    .trim()
    .split("\n\n")
    .map((group) => group.split("\n").map((line) => line.split("")));

const input = prepareInput(readInput("day6"));

const goA = (input: string[][][]) =>
  input.reduce((acc, group) => {
    let set = new Set();
    group.forEach((line) => {
      line.forEach((char) => set.add(char));
    });
    return acc + set.size;
  }, 0);

const goB = (input: string[][][]) =>
  input.reduce((acc, group) => {
    let vals = group[0];
    group.forEach((line) => {
      vals = vals.filter((char) => line.includes(char));
    });
    return acc + vals.length;
  }, 0);

/* Tests */

const testInput = prepareInput(`
abc

a
b
c

ab
ac

a
a
a
a

b`);

test(goA(testInput), 11);
test(goB(testInput), 6);

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
