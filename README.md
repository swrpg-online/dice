# dice

![npm version](https://img.shields.io/npm/v/@swrpg-online/dice)
![build](https://github.com/swrpg-online/dice/actions/workflows/release.yml/badge.svg)
[![codecov](https://codecov.io/gh/swrpg-online/dice/graph/badge.svg?token=BQIFNBWKI8)](https://codecov.io/gh/swrpg-online/dice)

A TypeScript library that creates dice rolls using the [narrative dice system](https://star-wars-rpg-ffg.fandom.com/wiki/Narrative_Dice) for the Star Wars Role-Playing Game by [Fantasy Flight Games](https://www.fantasyflightgames.com/en/starwarsrpg/) and [Edge Studio](https://www.edge-studio.net/categories-games/starwarsrpg/).

## Installation

```bash
npm i @swrpg-online/dice
```

or optionally to use as a CLI command you can install globally with `npm i -g @swrpg-online/dice`

## Features

- Complete narrative dice system implementation
- Detailed roll breakdown for each die
- Comprehensive test coverage
- TypeScript type safety
- roll from a CLI

## Usage

via code:

```typescript
import { roll, DicePool } from '@swrpg-online/dice';

const pool: DicePool = {
    abilityDice: 2,
    proficiencyDice: 1,
    difficultyDice: 1,
    challengeDice: 1
};

const result = roll(pool);

// Access detailed results
console.log(result.results);  // Array of individual die results
console.log(result.summary);  // Summary of total successes, advantages, etc.

=> {
  "results": [
    {
      "type": "ability",
      "roll": 5,
      "result": {
        "successes": 0,
        "failures": 0,
        "advantages": 1,
        "threats": 0,
        "triumphs": 0,
        "despair": 0
      }
    },
    {
      "type": "ability",
      "roll": 3,
      "result": {
        "successes": 1,
        "failures": 0,
        "advantages": 0,
        "threats": 0,
        "triumphs": 0,
        "despair": 0
      }
    },
    {
      "type": "proficiency",
      "roll": 10,
      "result": {
        "successes": 0,
        "failures": 0,
        "advantages": 2,
        "threats": 0,
        "triumphs": 0,
        "despair": 0
      }
    },
    {
      "type": "difficulty",
      "roll": 2,
      "result": {
        "successes": 0,
        "failures": 1,
        "advantages": 0,
        "threats": 0,
        "triumphs": 0,
        "despair": 0
      }
    },
    {
      "type": "challenge",
      "roll": 11,
      "result": {
        "successes": 0,
        "failures": 0,
        "advantages": 0,
        "threats": 2,
        "triumphs": 0,
        "despair": 0
      }
    }
  ],
  "summary": {
    "successes": 0,
    "failures": 0,
    "advantages": 3,
    "threats": 2,
    "triumphs": 0,
    "despair": 0
  }
}
```

Each roll result includes:

- Detailed breakdown of each die roll
- Die type identification
- Individual results per die
- Overall summary of the roll

# Roadmap or Under Review

- implement the Force die
- implement ability to add success, failure, and so on to dice pools
- ship combat?
- crits?
- polyhedral dice for convenience?
- anything else?

# Contribution

This is a new library for a game with not a lot of open source tooling available - feedback and pull requests welcome!
