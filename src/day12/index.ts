import { test, readInput } from "../utils/index";

interface Instruction {
  action: string;
  value: number;
}

const prepareInput = (rawInput: string) =>
  rawInput
    .trim()
    .split("\n")
    .map((line) => ({
      action: line.substring(0, 1),
      value: parseInt(line.substring(1)),
    }));

const input = prepareInput(readInput("day12"));

const goA = (input: Instruction[]) => {
  let x = 0;
  let y = 0;
  let angle = 0;
  input.forEach((instruction) => {
    switch (instruction.action) {
      case "N":
        y += instruction.value;
        break;
      case "S":
        y -= instruction.value;
        break;
      case "E":
        x += instruction.value;
        break;
      case "W":
        x -= instruction.value;
        break;
      case "L":
        angle += instruction.value;
        break;
      case "R":
        angle += 360 - instruction.value;
        break;
      case "F":
        angle %= 360;
        switch (angle) {
          case 0:
            x += instruction.value;
            break;
          case 90:
            y += instruction.value;
            break;
          case 180:
            x -= instruction.value;
            break;
          case 270:
            y -= instruction.value;
            break;
          default:
            throw Error("Not implemented");
        }
    }
  });
  return getDistance(x, y);
};

const transformWaypoint = (x: number, y: number, angle: number) => {
  switch (angle) {
    case 0:
      return [x, y];
    case 90:
      return [-y, x];
    case 180:
      return [-x, -y];
    case 270:
      return [y, -x];
  }
  throw Error("Not implemented");
};

const getDistance = (x: number, y: number) => Math.abs(x) + Math.abs(y);

const goB = (input: Instruction[]) => {
  let wayX = 10;
  let wayY = 1;

  let shipX = 0;
  let shipY = 0;

  input.forEach((instruction) => {
    switch (instruction.action) {
      case "N":
        wayY += instruction.value;
        break;
      case "S":
        wayY -= instruction.value;
        break;
      case "E":
        wayX += instruction.value;
        break;
      case "W":
        wayX -= instruction.value;
        break;
      case "F":
        shipX += wayX * instruction.value;
        shipY += wayY * instruction.value;
        break;
      case "L":
        [wayX, wayY] = transformWaypoint(wayX, wayY, instruction.value);
        break;
      case "R":
        [wayX, wayY] = transformWaypoint(
          wayX,
          wayY,
          (360 - instruction.value) % 360
        );
        break;
    }
  });

  return getDistance(shipX, shipY);
};

/* Tests */

const testInput = prepareInput(`
F10
N3
F7
R90
F11`);

test(goA(testInput), 25);
test(goB(testInput), 286);

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
