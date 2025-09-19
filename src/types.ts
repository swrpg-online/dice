export type DicePool = {
  boostDice?: number;
  abilityDice?: number;
  proficiencyDice?: number;
  setBackDice?: number;
  difficultyDice?: number;
  challengeDice?: number;
  forceDice?: number;
  // Automatic symbols added to the result (from talents, attachments, etc.)
  automaticSuccesses?: number;
  automaticFailures?: number;
  automaticAdvantages?: number;
  automaticThreats?: number;
  automaticTriumphs?: number;
  automaticDespairs?: number;
  // Dice upgrades and downgrades
  upgradeAbility?: number; // Upgrades ability (green) to proficiency (yellow)
  upgradeDifficulty?: number; // Upgrades difficulty (purple) to challenge (red)
  downgradeProficiency?: number; // Downgrades proficiency (yellow) to ability (green)
  downgradeChallenge?: number; // Downgrades challenge (red) to difficulty (purple)
};

export type DiceResult = {
  successes: number;
  failures: number;
  advantages: number;
  threats: number;
  triumphs: number;
  despair: number;
  lightSide: number;
  darkSide: number;
  hints?: string[];
};

export type DieType =
  | "boost"
  | "ability"
  | "proficiency"
  | "setback"
  | "difficulty"
  | "challenge"
  | "force";

export type DetailedDieResult = {
  type: DieType;
  roll: number;
  result: DiceResult;
};

export type RollResult = {
  results: DetailedDieResult[];
  summary: DiceResult;
};

export const SYMBOLS = {
  SUCCESS: "SUCCESS" as const,
  FAILURE: "FAILURE" as const,
  ADVANTAGE: "ADVANTAGE" as const,
  THREAT: "THREAT" as const,
  TRIUMPH: "TRIUMPH" as const,
  DESPAIR: "DESPAIR" as const,
  LIGHT: "LIGHT" as const,
  DARK: "DARK" as const,
} as const;

export type Symbol = keyof typeof SYMBOLS;

export type DieFaceSymbols = {
  successes?: number;
  failures?: number;
  advantages?: number;
  threats?: number;
  triumphs?: number;
  despairs?: number;
  lightSide?: number;
  darkSide?: number;
};

export type BoostDieFace = 1 | 2 | 3 | 4 | 5 | 6;
export type SetbackDieFace = 1 | 2 | 3 | 4 | 5 | 6;
export type AbilityDieFace = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type DifficultyDieFace = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type ProficiencyDieFace =
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
  | 12;
export type ChallengeDieFace = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type ForceDieFace = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type RollOptions = {
  hints?: boolean;
  /**
   * Maximum number of dice allowed per die type.
   * Default: 100
   */
  maxDicePerType?: number;
  /**
   * Maximum total number of dice allowed in a single roll.
   * Default: 500
   */
  maxTotalDice?: number;
  /**
   * Whether to throw an error when dice limits are exceeded.
   * If false, dice counts will be silently capped to the maximum.
   * Default: false
   */
  throwOnLimitExceeded?: boolean;
};
