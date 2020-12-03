import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) =>
  rawInput
    .trim()
    .split('\n')
    .map(line => line.split(''))

const input = prepareInput(readInput('day3'))

const calcSlope = (input, slopeX, slopeY) => {
  let valid = 0;
  for (let x = 0, y = 0; y < input.length; x += slopeX, y += slopeY) {
    if (input[y][x % input[0].length] == '#') {
      valid++;
    }
  }
  return valid;
};

const goA = (input) => calcSlope(input, 3, 1)

const goB = (input) => {
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
  ]

  return slopes.reduce(
    (acc, slope) => acc * calcSlope(input, slope[0], slope[1]),
    1
  );
}

/* Tests */

// test()

const testInput = prepareInput(`
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`);

test(goA(testInput), 7);
test(goB(testInput), 336);

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
