import { test, readInput } from "../utils/index"

interface Password {
  lower: number,
  upper: number,
  char: string
  chars: string[]
}

const prepareInput = (rawInput: string): Password[] =>
  rawInput
    .trim()
    .split('\n')
    .map(line => {
      const parts = line.match(/(\d+)-(\d+) (.): (.*)/);

      return {
        lower: parseInt(parts[1]),
        upper: parseInt(parts[2]),
        char: parts[3],
        chars: parts[4].split('')
      }
    })

const input = prepareInput(readInput('day2'))

const goA = (input: Password[]) =>
  input.reduce((valid, password) => {
    const count = password.chars.reduce(
      (acc, passChar) => passChar === password.char
        ? acc + 1
        : acc,
        0
    );

    return count >= password.lower && count <= password.upper
      ? valid + 1
      : valid
  }, 0);

const goB = (input: Password[]) => {
  return input.reduce((valid, password) => {
    let matches = 0;
    if (password.chars[password.upper - 1] === password.char) {
      matches++;
    }
    if (password.chars[password.lower - 1] === password.char) {
      matches++;
    }
    return matches == 1 ? valid + 1 : valid;
  }, 0);
}

/* Tests */

// test()
const testInput = prepareInput(`
1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`)

test(goA(testInput), 2);
test(goB(testInput), 1);

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
