import { DieFaceSymbols } from "./types";

export const BOOST_DIE_FACES: Record<number, DieFaceSymbols> = {
  1: {}, // Blank
  2: {}, // Blank
  3: { successes: 1 }, // (S)
  4: { successes: 1, advantages: 1 }, // (S)(A)
  5: { advantages: 2 }, // (A)(A)
  6: { advantages: 1 }, // (A)
};

export const SETBACK_DIE_FACES: Record<number, DieFaceSymbols> = {
  1: {}, // Blank
  2: {}, // Blank
  3: { failures: 1 }, // (F)
  4: { failures: 1 }, // (F)
  5: { threats: 1 }, // (TH)
  6: { threats: 1 }, // (TH)
};

export const ABILITY_DIE_FACES: Record<number, DieFaceSymbols> = {
  1: {}, // Blank
  2: { successes: 1 }, // (S)
  3: { successes: 1 }, // (S)
  4: { successes: 2 }, // (S)(S)
  5: { advantages: 1 }, // (A)
  6: { advantages: 1 }, // (A)
  7: { successes: 1, advantages: 1 }, // (S)(A)
  8: { advantages: 2 }, // (A)(A)
};

export const DIFFICULTY_DIE_FACES: Record<number, DieFaceSymbols> = {
  1: {}, // Blank
  2: { failures: 1 }, // (F)
  3: { failures: 2 }, // (F)(F)
  4: { threats: 1 }, // (TH)
  5: { threats: 1 }, // (TH)
  6: { threats: 1 }, // (TH)
  7: { threats: 2 }, // (TH)(TH)
  8: { failures: 1, threats: 1 }, // (F)(TH)
};

export const PROFICIENCY_DIE_FACES: Record<number, DieFaceSymbols> = {
  1: {}, // Blank
  2: { successes: 1 }, // (S)
  3: { successes: 1 }, // (S)
  4: { successes: 2 }, // (S)(S)
  5: { successes: 2 }, // (S)(S)
  6: { advantages: 1 }, // (A)
  7: { successes: 1, advantages: 1 }, // (S)(A)
  8: { successes: 1, advantages: 1 }, // (S)(A)
  9: { successes: 1, advantages: 1 }, // (S)(A)
  10: { advantages: 2 }, // (A)(A)
  11: { successes: 1, advantages: 1 }, // (S)(A)
  12: { triumphs: 1 }, // (TR) - Triumph also counts as Success
};

export const CHALLENGE_DIE_FACES: Record<number, DieFaceSymbols> = {
  1: {}, // Blank
  2: { failures: 1 }, // (F)
  3: { failures: 1 }, // (F)
  4: { failures: 2 }, // (F)(F)
  5: { failures: 2 }, // (F)(F)
  6: { threats: 1 }, // (TH)
  7: { threats: 1 }, // (TH)
  8: { failures: 1, threats: 1 }, // (F)(TH)
  9: { failures: 1, threats: 1 }, // (F)(TH)
  10: { threats: 2 }, // (TH)(TH)
  11: { threats: 2 }, // (TH)(TH)
  12: { despairs: 1 }, // (D) - Despair also counts as Failure
};

export const FORCE_DIE_FACES: Record<number, DieFaceSymbols> = {
  1: { darkSide: 1 }, // (DS)
  2: { darkSide: 1 }, // (DS)
  3: { darkSide: 1 }, // (DS)
  4: { darkSide: 1 }, // (DS)
  5: { darkSide: 1 }, // (DS)
  6: { darkSide: 1 }, // (DS)
  7: { darkSide: 2 }, // (DS)(DS)
  8: { lightSide: 1 }, // (LS)
  9: { lightSide: 1 }, // (LS)
  10: { lightSide: 2 }, // (LS)(LS)
  11: { lightSide: 2 }, // (LS)(LS)
  12: { lightSide: 2 }, // (LS)(LS)
};

export const DICE_FACES = {
  boost: BOOST_DIE_FACES,
  setback: SETBACK_DIE_FACES,
  ability: ABILITY_DIE_FACES,
  difficulty: DIFFICULTY_DIE_FACES,
  proficiency: PROFICIENCY_DIE_FACES,
  challenge: CHALLENGE_DIE_FACES,
  force: FORCE_DIE_FACES,
} as const;
