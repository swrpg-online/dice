import { hintCostDisplayText, hints } from "./hints";
import {
  DicePool,
  RollResult,
  DiceResult,
  DetailedDieResult,
  RollOptions,
} from "./types";

// Default dice limits for performance and security
export const DEFAULT_MAX_DICE_PER_TYPE = 100;
export const DEFAULT_MAX_TOTAL_DICE = 500;

const rollDie = (sides: number): number =>
  Math.floor(Math.random() * sides) + 1;

const boostDieResult = (roll: number): DiceResult => {
  switch (roll) {
    case 3:
      return {
        successes: 1,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 4:
      return {
        successes: 1,
        failures: 0,
        advantages: 1,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 5:
      return {
        successes: 0,
        failures: 0,
        advantages: 2,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 6:
      return {
        successes: 0,
        failures: 0,
        advantages: 1,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    default:
      return {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
  }
};

const setBackDieResult = (roll: number): DiceResult => {
  switch (roll) {
    case 3:
    case 4:
      return {
        successes: 0,
        failures: 1,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 5:
    case 6:
      return {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 1,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    default:
      return {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
  }
};

const abilityDieResult = (roll: number): DiceResult => {
  switch (roll) {
    case 2:
    case 3:
      return {
        successes: 1,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 4:
      return {
        successes: 2,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 5:
    case 6:
      return {
        successes: 0,
        failures: 0,
        advantages: 1,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 7:
      return {
        successes: 1,
        failures: 0,
        advantages: 1,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 8:
      return {
        successes: 0,
        failures: 0,
        advantages: 2,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    default:
      return {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
  }
};

const difficultyDieResult = (roll: number): DiceResult => {
  switch (roll) {
    case 2:
      return {
        successes: 0,
        failures: 1,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 3:
      return {
        successes: 0,
        failures: 2,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 4:
    case 5:
    case 6:
      return {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 1,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 7:
      return {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 2,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 8:
      return {
        successes: 0,
        failures: 1,
        advantages: 0,
        threats: 1,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    default:
      return {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
  }
};

const proficiencyDieResult = (roll: number): DiceResult => {
  switch (roll) {
    case 2:
    case 3:
      return {
        successes: 1,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 4:
    case 5:
      return {
        successes: 2,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 6:
      return {
        successes: 0,
        failures: 0,
        advantages: 1,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 7:
    case 8:
    case 9:
      return {
        successes: 1,
        failures: 0,
        advantages: 1,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 10:
    case 11:
      return {
        successes: 0,
        failures: 0,
        advantages: 2,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 12:
      return {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 1,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    default:
      return {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
  }
};

const challengeDieResult = (roll: number): DiceResult => {
  switch (roll) {
    case 2:
    case 3:
      return {
        successes: 0,
        failures: 1,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 4:
    case 5:
      return {
        successes: 0,
        failures: 2,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 6:
    case 7:
      return {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 1,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 8:
    case 9:
      return {
        successes: 0,
        failures: 1,
        advantages: 0,
        threats: 1,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 10:
    case 11:
      return {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 2,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
    case 12:
      return {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 1,
        lightSide: 0,
        darkSide: 0,
      };
    default:
      return {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
  }
};

const forceDieResult = (roll: number): DiceResult => {
  switch (roll) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 1,
        darkSide: 0,
      };
    case 6:
    case 7:
      return {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 2,
        darkSide: 0,
      };
    case 8:
    case 9:
    case 10:
    case 11:
      return {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 1,
      };
    case 12:
      return {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 2,
      };
    default:
      return {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
  }
};

const sumResults = (
  results: DiceResult[],
  options?: RollOptions,
): DiceResult => {
  const sums = results.reduce(
    (acc, curr) => ({
      successes: acc.successes + curr.successes,
      failures: acc.failures + curr.failures,
      advantages: acc.advantages + curr.advantages,
      threats: acc.threats + curr.threats,
      triumphs: acc.triumphs + curr.triumphs,
      despair: acc.despair + curr.despair,
      lightSide: acc.lightSide + (curr.lightSide || 0),
      darkSide: acc.darkSide + (curr.darkSide || 0),
    }),
    {
      successes: 0,
      failures: 0,
      advantages: 0,
      threats: 0,
      triumphs: 0,
      despair: 0,
      lightSide: 0,
      darkSide: 0,
    },
  );

  let netSuccesses = 0;
  let netFailures = 0;

  if (sums.successes === sums.failures) {
    netSuccesses = 0;
    netFailures = 0;
  } else if (sums.successes > sums.failures) {
    netSuccesses = sums.successes - sums.failures;
  } else {
    netFailures = sums.failures - sums.successes;
  }

  const result: DiceResult = {
    successes: netSuccesses,
    failures: netFailures,
    advantages: sums.advantages,
    threats: sums.threats,
    triumphs: sums.triumphs,
    despair: sums.despair,
    lightSide: sums.lightSide,
    darkSide: sums.darkSide,
  };

  return result;
};

/**
 * Rolls a dice pool and returns the results.
 *
 * @param pool - The dice pool to roll
 * @param options - Optional roll configuration including dice limits
 * @returns The roll results with detailed die information and summary
 * @throws {Error} If dice counts exceed configured limits
 *
 * Default limits:
 * - Max dice per type: 100 (configurable via options.maxDicePerType)
 * - Max total dice: 500 (configurable via options.maxTotalDice)
 */
export const roll = (pool: DicePool, options?: RollOptions): RollResult => {
  const boostCount = pool.boostDice ?? 0;
  const abilityCount = pool.abilityDice ?? 0;
  const proficiencyCount = pool.proficiencyDice ?? 0;
  const setBackCount = pool.setBackDice ?? 0;
  const difficultyCount = pool.difficultyDice ?? 0;
  const challengeCount = pool.challengeDice ?? 0;
  const forceCount = pool.forceDice ?? 0;

  // Get limits from options or use defaults
  const maxDicePerType = options?.maxDicePerType ?? DEFAULT_MAX_DICE_PER_TYPE;
  const maxTotalDice = options?.maxTotalDice ?? DEFAULT_MAX_TOTAL_DICE;

  // Ensure all dice counts are non-negative and apply per-type limits
  const sanitizedPool = {
    boostDice: Math.max(0, Math.min(boostCount, maxDicePerType)),
    abilityDice: Math.max(0, Math.min(abilityCount, maxDicePerType)),
    proficiencyDice: Math.max(0, Math.min(proficiencyCount, maxDicePerType)),
    setBackDice: Math.max(0, Math.min(setBackCount, maxDicePerType)),
    difficultyDice: Math.max(0, Math.min(difficultyCount, maxDicePerType)),
    challengeDice: Math.max(0, Math.min(challengeCount, maxDicePerType)),
    forceDice: Math.max(0, Math.min(forceCount, maxDicePerType)),
  };

  // Check if any dice counts exceeded the per-type limit
  const exceedsPerTypeLimit =
    boostCount > maxDicePerType ||
    abilityCount > maxDicePerType ||
    proficiencyCount > maxDicePerType ||
    setBackCount > maxDicePerType ||
    difficultyCount > maxDicePerType ||
    challengeCount > maxDicePerType ||
    forceCount > maxDicePerType;

  // Calculate total dice count
  const totalDice =
    sanitizedPool.boostDice +
    sanitizedPool.abilityDice +
    sanitizedPool.proficiencyDice +
    sanitizedPool.setBackDice +
    sanitizedPool.difficultyDice +
    sanitizedPool.challengeDice +
    sanitizedPool.forceDice;

  // Check total dice limit
  if (totalDice > maxTotalDice) {
    throw new Error(
      `Total dice count (${totalDice}) exceeds maximum allowed (${maxTotalDice}). ` +
        `Please reduce the number of dice in your pool.`,
    );
  }

  // Warn if per-type limits were exceeded (but continue with capped values)
  if (exceedsPerTypeLimit && options?.throwOnLimitExceeded) {
    const exceeded = [];
    if (boostCount > maxDicePerType) exceeded.push(`boost: ${boostCount}`);
    if (abilityCount > maxDicePerType)
      exceeded.push(`ability: ${abilityCount}`);
    if (proficiencyCount > maxDicePerType)
      exceeded.push(`proficiency: ${proficiencyCount}`);
    if (setBackCount > maxDicePerType)
      exceeded.push(`setback: ${setBackCount}`);
    if (difficultyCount > maxDicePerType)
      exceeded.push(`difficulty: ${difficultyCount}`);
    if (challengeCount > maxDicePerType)
      exceeded.push(`challenge: ${challengeCount}`);
    if (forceCount > maxDicePerType) exceeded.push(`force: ${forceCount}`);

    throw new Error(
      `Dice counts exceed per-type limit (${maxDicePerType}): ${exceeded.join(", ")}. ` +
        `Dice counts have been capped to the maximum.`,
    );
  }

  const detailedResults: DetailedDieResult[] = [];

  // Roll boost dice
  for (let i = 0; i < sanitizedPool.boostDice; i++) {
    const roll = rollDie(6);
    detailedResults.push({
      type: "boost",
      roll,
      result: boostDieResult(roll),
    });
  }

  // Roll ability dice
  for (let i = 0; i < sanitizedPool.abilityDice; i++) {
    const roll = rollDie(8);
    detailedResults.push({
      type: "ability",
      roll,
      result: abilityDieResult(roll),
    });
  }

  // Roll proficiency dice
  for (let i = 0; i < sanitizedPool.proficiencyDice; i++) {
    const roll = rollDie(12);
    detailedResults.push({
      type: "proficiency",
      roll,
      result: proficiencyDieResult(roll),
    });
  }

  // Roll setback dice
  for (let i = 0; i < sanitizedPool.setBackDice; i++) {
    const roll = rollDie(6);
    detailedResults.push({
      type: "setback",
      roll,
      result: setBackDieResult(roll),
    });
  }

  // Roll difficulty dice
  for (let i = 0; i < sanitizedPool.difficultyDice; i++) {
    const roll = rollDie(8);
    detailedResults.push({
      type: "difficulty",
      roll,
      result: difficultyDieResult(roll),
    });
  }

  // Roll challenge dice
  for (let i = 0; i < sanitizedPool.challengeDice; i++) {
    const roll = rollDie(12);
    detailedResults.push({
      type: "challenge",
      roll,
      result: challengeDieResult(roll),
    });
  }

  // Roll force dice
  for (let i = 0; i < sanitizedPool.forceDice; i++) {
    const roll = rollDie(12);
    detailedResults.push({
      type: "force",
      roll,
      result: forceDieResult(roll),
    });
  }

  const summary = sumResults(detailedResults.map((r) => r.result));

  if (options?.hints) {
    const applicableHints = hints.filter((hint) => {
      const { cost } = hint;
      return Object.entries(cost).some(([symbol, required]) => {
        const summaryKey = (symbol.toLowerCase() + "s") as keyof typeof summary;
        const value = summary[summaryKey];
        if (typeof value !== "number") return false;
        return required <= value;
      });
    });
    summary.hints = applicableHints.map(
      (hint) => `${hintCostDisplayText(hint)} - ${hint.description}`,
    );
  }

  return {
    results: detailedResults,
    summary: summary,
  };
};
