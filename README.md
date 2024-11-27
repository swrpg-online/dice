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
```

Each roll result includes:
- Detailed breakdown of each die roll
- Die type identification
- Individual results per die
- Overall summary of the roll

