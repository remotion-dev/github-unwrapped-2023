import type { Commit } from "./commits.js";

type Hour =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23;

export const getTimesOfDay = (items: Commit[]) => {
  const times = items.map((index) => index.hour);

  const hours: { [key in Hour]: number } = {
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
    "10": 0,
    "11": 0,
    "12": 0,
    "13": 0,
    "14": 0,
    "15": 0,
    "16": 0,
    "17": 0,
    "18": 0,
    "19": 0,
    "20": 0,
    "21": 0,
    "22": 0,
    "23": 0,
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
  };
  for (const time of times) {
    hours[time as Hour]++;
  }

  return hours;
};
