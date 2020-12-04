import { test, readInput } from "../utils/index";

interface KeyValue {
  [key: string]: string;
}

const prepareInput = (rawInput: string) =>
  rawInput
    .trim()
    .split("\n\n")
    .map((line) => {
      let data: KeyValue = {};

      line.split(/ |\n/).forEach((pair) => {
        const parts = pair.split(":");
        data[parts[0]] = parts[1];
      });

      return data;
    });

const input = prepareInput(readInput("day4"));

const checkNumber = (value: string, min: number, max: number) => {
  const number = parseInt(value);
  return number >= min && number <= max;
};

const checkHeight = (value: string) => {
  const match = value.match(/^(\d+)(cm|in)$/);
  if (match) {
    const number = parseInt(match[1]);
    switch (match[2]) {
      case "cm":
        return number >= 150 && number <= 193;
      case "in":
        return number >= 59 && number <= 76;
    }
  }
  return false;
};

const checkHairColor = (value: string) => /^#[0-9a-f]{6}$/.test(value);

const checkEyeColor = (value: string) =>
  /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(value);

const checkPid = (value: string) => /^\d{9}$/.test(value);

const checkKeys = (data: KeyValue, checkVals: boolean) => {
  const keys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  return (
    keys.every((key) => typeof data[key] !== "undefined") &&
    (!checkVals ||
      (checkNumber(data["byr"], 1920, 2002) &&
        checkNumber(data["iyr"], 2010, 2020) &&
        checkNumber(data["eyr"], 2020, 2030) &&
        checkHeight(data["hgt"]) &&
        checkHairColor(data["hcl"]) &&
        checkEyeColor(data["ecl"]) &&
        checkPid(data["pid"])))
  );
};

const checkAll = (input: KeyValue[], checkVals: boolean) =>
  input.reduce((acc, data) => (checkKeys(data, checkVals) ? acc + 1 : acc), 0);

const goA = (input: KeyValue[]) => checkAll(input, false);

const goB = (input: KeyValue[]) => checkAll(input, true);

/* Tests */

test(
  goA(
    prepareInput(`
ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`)
  ),
  2
);

test(checkNumber("2002", 1920, 2002), true);
test(checkNumber("2003", 1920, 2002), false);

test(checkHeight("60in"), true);
test(checkHeight("190cm"), true);
test(checkHeight("190in"), false);
test(checkHeight("190"), false);

test(checkHairColor("#123abc"), true);
test(checkHairColor("#123abz"), false);
test(checkHeight("123abc"), false);

test(checkEyeColor("brn"), true);
test(checkEyeColor("wat"), false);

test(checkPid("000000001"), true);
test(checkPid("0123456789"), false);

test(
  goB(
    prepareInput(`
eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`)
  ),
  0
);

test(
  goA(
    prepareInput(`
pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`)
  ),
  4
);

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
