#!/usr/bin/env node

import { roll } from "./dice";
import { DicePool, RollResult } from "./types";
// import * as path from 'path';

export function parseDiceNotation(input: string): DicePool {
  const pool: DicePool = {
    boostDice: 0,
    abilityDice: 0,
    proficiencyDice: 0,
    setBackDice: 0,
    difficultyDice: 0,
    challengeDice: 0,
    forceDice: 0,
  };

  const parts = input.toLowerCase().trim().split(" ");

  for (const part of parts) {
    const count = parseInt(part);
    const color = part.slice(String(count).length).toLowerCase();

    switch (color) {
      // y/pro = Yellow / Proficiency
      case "y":
        pool.proficiencyDice = count;
        break;
      case "pro":
        pool.proficiencyDice = count;
        break;
      // g/a = Green / Ability
      case "g":
        pool.abilityDice = count;
        break;
      case "a":
        pool.abilityDice = count;
        break;
      // b/boo = Blue / Boost
      case "b":
        pool.boostDice = count;
        break;
      case "boo":
        pool.boostDice = count;
        break;
      // r/c = Red / Challenge
      case "r":
        pool.challengeDice = count;
        break;
      case "c":
        pool.challengeDice = count;
        break;
      // p/diff = Purple / Difficulty
      case "p":
        pool.difficultyDice = count;
        break;
      case "diff":
        pool.difficultyDice = count;
        break;
      // blk/k/sb/s = Black / Setback
      case "blk":
        pool.setBackDice = count;
        break;
      case "k":
        pool.setBackDice = count;
        break;
      case "sb":
        pool.setBackDice = count;
        break;
      case "s":
        pool.setBackDice = count;
        break;
      // w/f = White / Force
      case "w":
        pool.forceDice = count;
        break;
      case "f":
        pool.forceDice = count;
        break;
    }
  }

  return pool;
}

export const formatResult = (result: RollResult): string => {
  const effects: string[] = [];

  if (result.summary.successes > 0)
    effects.push(`${result.summary.successes} Success(es)`);
  if (result.summary.failures > 0)
    effects.push(`${result.summary.failures} Failure(s)`);
  if (result.summary.advantages > 0)
    effects.push(`${result.summary.advantages} Advantage(s)`);
  if (result.summary.threats > 0)
    effects.push(`${result.summary.threats} Threat(s)`);
  if (result.summary.triumphs > 0)
    effects.push(`${result.summary.triumphs} Triumph(s)`);
  if (result.summary.despair > 0)
    effects.push(`${result.summary.despair} Despair(s)`);

  const resultText = effects.length > 0 ? effects.join(", ") : "No effects";

  if (result.summary.hints && result.summary.hints.length > 0) {
    return `${resultText}\n\nPossible actions:\n${result.summary.hints.map((hint) => " • " + hint).join("\n")}`;
  }
  return resultText;
};

export const main = () => {
  const args = process.argv.slice(2);
  const hintsIndex = args.indexOf("--hints");
  const showHints = hintsIndex !== -1;
  const diceNotation =
    hintsIndex !== -1
      ? args.filter((_, index) => index !== hintsIndex).join(" ")
      : args.join(" ");

  if (!diceNotation.trim()) {
    console.log(`Usage: swrpg-dice <dice-notation> <dice-options>
      Example: swrpg-dice 2y 1g 1p 1b 1sb --hints
      Dice Options:
        - y/pro = Yellow / Proficiency
        - g/a = Green / Ability
        - b/boo = Blue / Boost
        - r/c = Red / Challenge
        - p/diff = Purple / Difficulty
        - blk/k/sb/s = Black / Setback
        - w/f = White/Force
      Options:
        --hints  Show possible actions based on roll results`);
    process.exit(1);
  }

  const pool = parseDiceNotation(diceNotation);
  const result = roll(pool, { hints: showHints });
  console.log(formatResult(result));
};

if (require.main === module) {
  main();
}
