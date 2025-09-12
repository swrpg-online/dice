import { DicePool } from "./types";

/**
 * Options for applying talent or equipment modifiers to a dice pool
 */
export type PoolModifiers = {
  automaticSuccesses?: number;
  automaticFailures?: number;
  automaticAdvantages?: number;
  automaticThreats?: number;
  automaticTriumphs?: number;
  automaticDespairs?: number;
  upgradeAbility?: number;
  upgradeDifficulty?: number;
  downgradeProficiency?: number;
  downgradeChallenge?: number;
};

/**
 * Creates a basic skill check dice pool
 * @param ability Number of ability (green) dice
 * @param proficiency Number of proficiency (yellow) dice
 * @param modifiers Optional modifiers from talents, equipment, etc.
 * @returns DicePool configured for a basic skill check
 */
export const createSkillCheck = (
  ability: number,
  proficiency: number,
  modifiers?: PoolModifiers,
): DicePool => ({
  abilityDice: Math.max(0, ability),
  proficiencyDice: Math.max(0, proficiency),
  ...modifiers,
});

/**
 * Creates a combat check dice pool with optional boost die
 * @param ability Number of ability (green) dice
 * @param proficiency Number of proficiency (yellow) dice
 * @param boost Number of boost (blue) dice
 * @param modifiers Optional modifiers from talents, equipment, etc.
 * @returns DicePool configured for a combat check
 */
export const createCombatCheck = (
  ability: number,
  proficiency: number,
  boost: number = 0,
  modifiers?: PoolModifiers,
): DicePool => ({
  abilityDice: Math.max(0, ability),
  proficiencyDice: Math.max(0, proficiency),
  boostDice: Math.max(0, boost),
  ...modifiers,
});

/**
 * Creates an opposed check dice pool
 * @param ability Number of ability (green) dice
 * @param proficiency Number of proficiency (yellow) dice
 * @param difficulty Number of difficulty (purple) dice
 * @param challenge Number of challenge (red) dice
 * @param modifiers Optional modifiers from talents, equipment, etc.
 * @returns DicePool configured for an opposed check
 */
export const createOpposedCheck = (
  ability: number,
  proficiency: number,
  difficulty: number,
  challenge: number = 0,
  modifiers?: PoolModifiers,
): DicePool => ({
  abilityDice: Math.max(0, ability),
  proficiencyDice: Math.max(0, proficiency),
  difficultyDice: Math.max(0, difficulty),
  challengeDice: Math.max(0, challenge),
  ...modifiers,
});

/**
 * Creates a difficulty check dice pool
 * @param difficulty Number of difficulty (purple) dice
 * @param challenge Number of challenge (red) dice
 * @param modifiers Optional modifiers from talents, equipment, etc.
 * @returns DicePool configured for a pure difficulty check
 */
export const createDifficultyPool = (
  difficulty: number,
  challenge: number = 0,
  modifiers?: PoolModifiers,
): DicePool => ({
  difficultyDice: Math.max(0, difficulty),
  challengeDice: Math.max(0, challenge),
  ...modifiers,
});

/**
 * Applies talent modifiers to an existing dice pool
 * Common use case for talents that add automatic advantages, successes, or upgrade dice
 * @param pool The base dice pool
 * @param modifiers The modifiers to apply
 * @returns A new dice pool with modifiers applied
 */
export const applyTalentModifiers = (
  pool: DicePool,
  modifiers: PoolModifiers,
): DicePool => ({
  ...pool,
  automaticSuccesses:
    (pool.automaticSuccesses || 0) + (modifiers.automaticSuccesses || 0),
  automaticFailures:
    (pool.automaticFailures || 0) + (modifiers.automaticFailures || 0),
  automaticAdvantages:
    (pool.automaticAdvantages || 0) + (modifiers.automaticAdvantages || 0),
  automaticThreats:
    (pool.automaticThreats || 0) + (modifiers.automaticThreats || 0),
  automaticTriumphs:
    (pool.automaticTriumphs || 0) + (modifiers.automaticTriumphs || 0),
  automaticDespairs:
    (pool.automaticDespairs || 0) + (modifiers.automaticDespairs || 0),
  upgradeAbility: (pool.upgradeAbility || 0) + (modifiers.upgradeAbility || 0),
  upgradeDifficulty:
    (pool.upgradeDifficulty || 0) + (modifiers.upgradeDifficulty || 0),
  downgradeProficiency:
    (pool.downgradeProficiency || 0) + (modifiers.downgradeProficiency || 0),
  downgradeChallenge:
    (pool.downgradeChallenge || 0) + (modifiers.downgradeChallenge || 0),
});
