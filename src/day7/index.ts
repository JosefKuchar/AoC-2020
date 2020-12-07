import { test, readInput } from "../utils/index";

interface BagContains {
  quantity: number;
  name: string;
  ref?: Bag;
}

interface Bag {
  name: string;
  contains: BagContains[];
}

interface KeyBag {
  [key: string]: Bag;
}

const prepareInput = (rawInput: string) => {
  let bags: KeyBag = {};

  rawInput
    .trim()
    .split("\n")
    .map((line) => ({
      name: line.match(/(\w+ \w+) bags contain/)![1],
      contains: [...line.matchAll(/(\d+) (\w+ \w+) bag/g)].map((match) => ({
        quantity: parseInt(match[1]),
        name: match[2],
      })),
    }))
    .forEach((bag) => {
      bags[bag.name] = bag;
    });

  Object.values(bags).forEach((bag) => {
    bag.contains.forEach((child) => {
      child.ref = bags[child.name];
    });
  });

  return bags;
};

const search = (bag: Bag): boolean => {
  if (bag.name === "shiny gold") {
    return true;
  }

  return bag.contains.some((child) => search(child.ref!));
};

const getCount = (bag: Bag): number =>
  bag.contains.reduce(
    (acc, child) => acc + child.quantity * getCount(child.ref!),
    1
  );

const input = prepareInput(readInput("day7"));

const goA = (input: KeyBag) =>
  Object.values(input).reduce((acc, bag) => (search(bag) ? acc + 1 : acc), -1);

const goB = (input: any) => getCount(input["shiny gold"]) - 1;

/* Tests */

// test()
const testInput = prepareInput(`
light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`);

test(goA(testInput), 4);
test(goB(testInput), 32);

test(
  goB(
    prepareInput(`
shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`)
  ),
  126
);

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
