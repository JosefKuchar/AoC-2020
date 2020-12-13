import { test, readInput } from "../utils/index";

interface Input {
  timestamp: number;
  ids: (number | null)[];
}

const prepareInput = (rawInput: string) => {
  const parts = rawInput.trim().split("\n");

  return {
    timestamp: parseInt(parts[0]),
    ids: parts[1].split(",").map((id) => (id === "x" ? null : parseInt(id))),
  };
};

const input = prepareInput(readInput("day13"));

const goA = (input: Input) => {
  let diffs = input.ids
    .filter((id) => id !== null)
    .map((id) => ({
      diff: Math.ceil(input.timestamp / id!) * id! - input.timestamp,
      id,
    }));

  diffs.sort((a, b) => a.diff - b.diff);

  return diffs[0].diff * diffs[0].id!;
};

// https://www.geeksforgeeks.org/chinese-remainder-theorem-set-2-implementation/
const inv = (a: bigint, m: bigint) => {
  let m0 = m;
  let x0 = 0n;
  let x1 = 1n;

  if (m === 1n) {
    return 0n;
  }

  while (a > 1n) {
    const q = a / m;
    let t = m;
    m = a % m;
    a = t;
    t = x0;
    x0 = x1 - q * x0;
    x1 = t;
  }

  if (x1 < 0) {
    x1 = x1 + m0;
  }

  return x1;
};

const findTimestamp = (nums: number[], rems: number[]) => {
  const prod = BigInt(nums.reduce((acc, num) => num * acc, 1));

  let result = 0n;
  for (let i = 0; i < nums.length; i++) {
    const pp = prod / BigInt(nums[i])
    result += BigInt(rems[i]) * inv(pp, BigInt(nums[i])) * pp;
  }

  return Number(result % prod);
};

const goB = (input: Input) => {
  const nums: number[] = input.ids.filter((id) => id !== null) as number[];
  let rems: number[] = [];
  input.ids.reverse();

  input.ids.forEach((id, i) => {
    if (id !== null) {
      rems.push(i);
    }
  });
  rems.reverse();

  return findTimestamp(nums, rems) - input.ids.length + 1;
};

/* Tests */

const testInput = prepareInput(`
939
7,13,x,x,59,x,31,19`);

test(goA(testInput), 295);
test(goB(testInput), 1068781);

test(
  goB(
    prepareInput(`0
17,x,13,19`)
  ),
  3417
);
test(
  goB(
    prepareInput(`0
67,7,59,61`)
  ),
  754018
);
test(
  goB(
    prepareInput(`0
67,x,7,59,61`)
  ),
  779210
);
test(
  goB(
    prepareInput(`0
67,7,x,59,61`)
  ),
  1261476
);
test(
  goB(
    prepareInput(`0
1789,37,47,1889`)
  ),
  1202161486
);

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
