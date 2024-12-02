# swrpg-dice

A TypeScript library for simulating Star Wars RPG narrative dice rolls.

## Installation

```bash
npm install swrpg-dice
```

## Features

- Complete narrative dice system implementation
- Detailed roll breakdown for each die
- Comprehensive test coverage
- TypeScript type safety

## Usage

Basic usage:

```typescript
import { roll, DicePool } from 'swrpg-dice';

const pool: DicePool = {
  proficiencyDice: 2,
  abilityDice: 1,
  difficultyDice: 2
};

const result = roll(pool);

// Access detailed results
console.log(result.results);  // Array of individual die results
console.log(result.summary);  // Summary of total successes, advantages, etc.

=> [
    { type: 'boost', roll: 3, result: [Object] },
    { type: 'proficiency', roll: 9, result: [Object] },
    { type: 'proficiency', roll: 5, result: [Object] },
    { type: 'proficiency', roll: 5, result: [Object] },
    { type: 'difficulty', roll: 4, result: [Object] },
    { type: 'difficulty', roll: 4, result: [Object] },
    { type: 'challenge', roll: 5, result: [Object] }
  ]
  {
    successes: 4,
    failures: 0,
    advantages: 1,
    threats: 2,
    triumphs: 0,
    despair: 0
  }

```

Each roll result includes:
- Detailed breakdown of each die roll
- Die type identification
- Individual results per die
- Overall summary of the roll

# Contribution

This is a new library for a game with not a lot of open source tooling available - feedback and pull requests welcome!