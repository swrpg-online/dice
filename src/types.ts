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
