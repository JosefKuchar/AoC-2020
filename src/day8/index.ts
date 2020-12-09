import { IncomingHttpStatusHeader } from "http2";
import { test, readInput } from "../utils/index";

interface Instruction {
  operation: string;
  argument: number;
}

const prepareInput = (rawInput: string) =>
  rawInput
    .trim()
    .split("\n")
    .map((line) => {
      const parts = line.split(" ");
      return {
        operation: parts[0],
        argument: parseInt(parts[1]),
      };
    });

const input = prepareInput(readInput("day8"));

const simulate = (instructions: Instruction[], change: number = -1) => {
  let called = new Set();
  let acc = 0;
  let pc = 0;

  while (pc >= 0 && pc < instructions.length) {
    if (called.has(pc)) {
      return {
        end: "loop",
        acc,
      };
    }
    called.add(pc);

    const instruction = instructions[pc];
    let op = instruction.operation;

    if (change === pc) {
      if (op === "nop") {
        op = "jmp";
      } else if (op === "jmp") {
        op = "nop";
      }
    }

    switch (op) {
      case "nop":
        pc++;
        break;
      case "acc":
        acc += instruction.argument;
        pc++;
        break;
      case "jmp":
        pc += instruction.argument;
        break;
    }
  }

  return {
    end: "halt",
    acc,
  };
};

const goA = (input: Instruction[]) => simulate(input).acc;

const goB = (input: any) => {
  for (let i = 0; i < input.length; i++) {
    const out = simulate(input, i);
    if (out.end === "halt") {
      return out.acc;
    }
  }
};

/* Tests */

const testInput = prepareInput(`
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`);

test(goA(testInput), 5);
test(goB(testInput), 8);

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
