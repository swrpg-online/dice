import { DicePool } from './types';

/**
 * Creates a basic skill check dice pool
 * @param ability Number of ability (green) dice
 * @param proficiency Number of proficiency (yellow) dice
 * @returns DicePool configured for a basic skill check
 */
export const createSkillCheck = (ability: number, proficiency: number): DicePool => ({
    abilityDice: Math.max(0, ability),
    proficiencyDice: Math.max(0, proficiency)
});

/**
 * Creates a combat check dice pool with optional boost die
 * @param ability Number of ability (green) dice
 * @param proficiency Number of proficiency (yellow) dice
 * @param boost Number of boost (blue) dice
 * @returns DicePool configured for a combat check
 */
export const createCombatCheck = (ability: number, proficiency: number, boost: number = 0): DicePool => ({
    abilityDice: Math.max(0, ability),
    proficiencyDice: Math.max(0, proficiency),
    boostDice: Math.max(0, boost)
});

/**
 * Creates an opposed check dice pool
 * @param ability Number of ability (green) dice
 * @param proficiency Number of proficiency (yellow) dice
 * @param difficulty Number of difficulty (purple) dice
 * @param challenge Number of challenge (red) dice
 * @returns DicePool configured for an opposed check
 */
export const createOpposedCheck = (
    ability: number,
    proficiency: number,
    difficulty: number,
    challenge: number = 0
): DicePool => ({
    abilityDice: Math.max(0, ability),
    proficiencyDice: Math.max(0, proficiency),
    difficultyDice: Math.max(0, difficulty),
    challengeDice: Math.max(0, challenge)
});

/**
 * Creates a difficulty check dice pool
 * @param difficulty Number of difficulty (purple) dice
 * @param challenge Number of challenge (red) dice
 * @returns DicePool configured for a pure difficulty check
 */
export const createDifficultyPool = (difficulty: number, challenge: number = 0): DicePool => ({
    difficultyDice: Math.max(0, difficulty),
    challengeDice: Math.max(0, challenge)
});
