import { test, readInput } from "../utils/index";

interface KeyVal {
  [key: number]: bigint
}

const parseMask = (str: string, val: string) => {
  let chars = str.split("");
  chars.reverse();
  return chars.reduce((acc, char, i) => {
    return char === val ? acc + 2n ** BigInt(i) : acc;
  }, 0n);
};

const inv = (num: bigint) => {
  let result = 0n;
  for (let i = 0n; i < 64n; i++) {
    if (((2n**i) & num) === 0n) {
      result += 2n**i;
    }
  }
  return result
}

const prepareInput = (rawInput: string) =>
  rawInput
    .trim()
    .split("\n")
    .map((line) => {
      const mask = line.match(/mask = ([X01]*)/);
      const mem = line.match(/mem\[(\d+)\] = (\d+)/);

      if (mask) {
        return {
          type: "mask",
          ones: parseMask(mask[1], "1"),
          zeros: inv(parseMask(mask[1], "0")),
          floating: parseMask(mask[1], "X"),
        };
      } else if (mem) {
        return {
          type: "mem",
          addr: BigInt(parseInt(mem[1])),
          val: BigInt(parseInt(mem[2])),
        };
      }
    });

const input = prepareInput(readInput("day14"));

const goA = (input: any[]) => {
  let mask = { ones: 0, zeros: 0 };
  let mem: number[] = [];
  input.forEach((line) => {
    if (line.type === "mask") {
      mask = line;
    } else {
      mem[line.addr] = line.val;
      mem[line.addr] |= mask.ones;
      mem[line.addr] &= mask.zeros;
    }
  });
  return Number(mem.reduce((acc, val) => val + acc));
};

const getCombinations = (val: bigint, mask: bigint, bit: bigint): bigint[] => {
  if (bit === 64n) {
    return [val];
  }

  let combinations = [];

  if (((2n ** bit) & mask) !== 0n) {
    // 1
    combinations.push(...getCombinations(val | (2n ** bit), mask, bit + 1n));
    // 0
    combinations.push(
      ...getCombinations(val & inv(2n ** bit), mask, bit + 1n)
    );
  } else {
    combinations.push(...getCombinations(val, mask, bit + 1n));
  }

  return combinations;
};

const goB = (input: any[]) => {
  let mask = { ones: 0n, floating: 0n };
  let mem: KeyVal = {};
  let sum = 0n;
  input.forEach((line, i) => {
    if (line.type === "mask") {
      mask = line;
    } else {
      let addr = line.addr;
      addr |= mask.ones;
      const combinations = getCombinations(addr, mask.floating, 0n);
      combinations.forEach(combination => {
        const index = Number(combination);
        if (index in mem) {
          sum -= mem[index]
        }

        mem[index] = line.val
        sum += line.val
      })
      return addr;
    }
  });
  return Number(sum);
};

/* Tests */

test(
  goA(
    prepareInput(`
mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`)
  ),
  165
);

test(
  goB(
    prepareInput(`
mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`)
  ),
  208
);

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.log('asdfsaf');
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
