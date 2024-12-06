export type DicePool = {
  boostDice?: number;
  abilityDice?: number;
  proficiencyDice?: number;
  setBackDice?: number;
  difficultyDice?: number;
  challengeDice?: number;
  forceDice?: number;
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

export type RollOptions = {
  hints?: boolean;
};
