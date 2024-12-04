import { roll } from "./dice";
import { DicePool } from "./types";
// import * as path from 'path';

function parseDiceNotation(input: string): DicePool {
  const pool: DicePool = {
    boostDice: 0,
    abilityDice: 0,
    proficiencyDice: 0,
    setBackDice: 0,
    difficultyDice: 0,
    challengeDice: 0,
  };

  // function getImagePath(type: string): string {
  //     const basePath = path.join(__dirname, 'images');
  //     switch (type) {
  //       case 'successes':
  //         return path.join(basePath, 'success.svg'); // Adjust path and extension as needed
  //       case 'failures':
  //         return path.join(basePath, 'failure.svg');
  //       case 'advantages':
  //         return path.join(basePath, 'advantage.svg');
  //       case 'threats':
  //         return path.join(basePath, 'threat.svg');
  //       case 'triumphs':
  //         return path.join(basePath, 'triumph.svg');
  //       case 'despair':
  //         return path.join(basePath, 'despair.svg');
  //       default:
  //         return '';
  //     }
  //   }

  const parts = input.toLowerCase().trim().split(" ");

  for (const part of parts) {
    const count = parseInt(part);
    const color = part.slice(String(count).length);

    switch (color) {
      // y/pro = Yellow/Proficiency
      case "y":
        pool.proficiencyDice = count;
        break;
      case "pro":
        pool.proficiencyDice = count;
        break;
      // g/a = Green/Ability
      case "g":
        pool.abilityDice = count;
        break;
      case "a":
        pool.abilityDice = count;
        break;
      // b/boo = Blue/Boost
      case "b":
        pool.setBackDice = count;
        break;
      case "boo":
        pool.setBackDice = count;
        break;
      // r/c = Red/ Challenge
      case "r":
        pool.challengeDice = count;
        break;
      case "c":
        pool.challengeDice = count;
        break;
      // p/diff = Purple/ Difficulty
      case "p":
        pool.difficultyDice = count;
        break;
      case "diff":
        pool.difficultyDice = count;
        break;
      // blk/k/sb/s = Black/Setback
      case "blk":
        pool.boostDice = count;
        break;
      case "k":
        pool.boostDice = count;
        break;
      case "sb":
        pool.boostDice = count;
        break;
      case "s":
        pool.boostDice = count;
        break;
      // w/f = White/Force
      // TODO
    }
  }

  return pool;
}

function formatResult(result: any): string {
  const parts = [];
  if (result.summary.successes > 0)
    parts.push(`${result.summary.successes} Success(es)`);
  if (result.summary.failures > 0)
    parts.push(`${result.summary.failures} Failure(s)`);
  if (result.summary.advantages > 0)
    parts.push(`${result.summary.advantages} Advantage(s)`);
  if (result.summary.threats > 0)
    parts.push(`${result.summary.threats} Threat(s)`);
  if (result.summary.triumphs > 0)
    parts.push(`${result.summary.triumphs} Triumph(s)`);
  if (result.summary.despair > 0)
    parts.push(`${result.summary.despair} Despair(s)`);

  return parts.join(", ") || "No effects";
}

const main = () => {
  const input = process.argv.slice(2).join(" ");
  if (!input) {
    console.log(`Usage: > swrpg-dice 2y 1g 2p 1r
        - y/pro = Yellow / Proficiency
        - g/a = Green / Ability
        - b/boo = Blue / Boost
        - r/c = Red / Challenge
        - p/diff = Purple / Difficulty
        - blk/k/sb/s = Black / Setback
    `);
    process.exit(1);
  }

  const pool = parseDiceNotation(input);
  const result = roll(pool);
  console.log(formatResult(result));
};

if (require.main === module) {
  main();
}
