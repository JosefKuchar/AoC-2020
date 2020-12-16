import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => {
  const parts = rawInput.trim().split('\n\n')

  return {
    params: parts[0].split('\n').map(line => {
      return {
        name: line.match(/([a-z ]+):/)![1],

      }
    }),
    my: parts[1].split('\n').filter((_, i) => i !== 0).map(line => line.split(',').map(Number))[0],
    nearby: parts[2].split('\n').filter((_, i) => i !== 0).map(line => line.split(',').map(Number))
  }
}

const input = prepareInput(readInput('day16'))

const goA = (input: any) => {
  return
}

const goB = (input: any) => {
  return
}

const testInput = prepareInput(`
class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`);

console.log(testInput);

/* Tests */

// test()

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
