import {
  BOOST_DIE_FACES,
  SETBACK_DIE_FACES,
  ABILITY_DIE_FACES,
  DIFFICULTY_DIE_FACES,
  PROFICIENCY_DIE_FACES,
  CHALLENGE_DIE_FACES,
  FORCE_DIE_FACES,
  DICE_FACES,
} from "../src/diceFaces";

describe("Dice Face Configurations", () => {
  describe("Boost Die (d6)", () => {
    test("should have correct face mappings according to specification", () => {
      expect(BOOST_DIE_FACES[1]).toEqual({}); // Blank
      expect(BOOST_DIE_FACES[2]).toEqual({}); // Blank
      expect(BOOST_DIE_FACES[3]).toEqual({ successes: 1 }); // (S)
      expect(BOOST_DIE_FACES[4]).toEqual({ successes: 1, advantages: 1 }); // (S)(A)
      expect(BOOST_DIE_FACES[5]).toEqual({ advantages: 2 }); // (A)(A)
      expect(BOOST_DIE_FACES[6]).toEqual({ advantages: 1 }); // (A)
    });
  });

  describe("Setback Die (d6)", () => {
    test("should have correct face mappings according to specification", () => {
      expect(SETBACK_DIE_FACES[1]).toEqual({}); // Blank
      expect(SETBACK_DIE_FACES[2]).toEqual({}); // Blank
      expect(SETBACK_DIE_FACES[3]).toEqual({ failures: 1 }); // (F)
      expect(SETBACK_DIE_FACES[4]).toEqual({ failures: 1 }); // (F)
      expect(SETBACK_DIE_FACES[5]).toEqual({ threats: 1 }); // (TH)
      expect(SETBACK_DIE_FACES[6]).toEqual({ threats: 1 }); // (TH)
    });
  });

  describe("Ability Die (d8)", () => {
    test("should have correct face mappings according to specification", () => {
      expect(ABILITY_DIE_FACES[1]).toEqual({}); // Blank
      expect(ABILITY_DIE_FACES[2]).toEqual({ successes: 1 }); // (S)
      expect(ABILITY_DIE_FACES[3]).toEqual({ successes: 1 }); // (S)
      expect(ABILITY_DIE_FACES[4]).toEqual({ successes: 2 }); // (S)(S)
      expect(ABILITY_DIE_FACES[5]).toEqual({ advantages: 1 }); // (A)
      expect(ABILITY_DIE_FACES[6]).toEqual({ advantages: 1 }); // (A)
      expect(ABILITY_DIE_FACES[7]).toEqual({ successes: 1, advantages: 1 }); // (S)(A)
      expect(ABILITY_DIE_FACES[8]).toEqual({ advantages: 2 }); // (A)(A)
    });
  });

  describe("Difficulty Die (d8)", () => {
    test("should have correct face mappings according to specification", () => {
      expect(DIFFICULTY_DIE_FACES[1]).toEqual({}); // Blank
      expect(DIFFICULTY_DIE_FACES[2]).toEqual({ failures: 1 }); // (F)
      expect(DIFFICULTY_DIE_FACES[3]).toEqual({ failures: 2 }); // (F)(F)
      expect(DIFFICULTY_DIE_FACES[4]).toEqual({ threats: 1 }); // (TH)
      expect(DIFFICULTY_DIE_FACES[5]).toEqual({ threats: 1 }); // (TH)
      expect(DIFFICULTY_DIE_FACES[6]).toEqual({ threats: 1 }); // (TH)
      expect(DIFFICULTY_DIE_FACES[7]).toEqual({ threats: 2 }); // (TH)(TH)
      expect(DIFFICULTY_DIE_FACES[8]).toEqual({ failures: 1, threats: 1 }); // (F)(TH)
    });
  });

  describe("Proficiency Die (d12)", () => {
    test("should have correct face mappings according to specification", () => {
      expect(PROFICIENCY_DIE_FACES[1]).toEqual({}); // Blank
      expect(PROFICIENCY_DIE_FACES[2]).toEqual({ successes: 1 }); // (S)
      expect(PROFICIENCY_DIE_FACES[3]).toEqual({ successes: 1 }); // (S)
      expect(PROFICIENCY_DIE_FACES[4]).toEqual({ successes: 2 }); // (S)(S)
      expect(PROFICIENCY_DIE_FACES[5]).toEqual({ successes: 2 }); // (S)(S)
      expect(PROFICIENCY_DIE_FACES[6]).toEqual({ advantages: 1 }); // (A)
      expect(PROFICIENCY_DIE_FACES[7]).toEqual({ successes: 1, advantages: 1 }); // (S)(A)
      expect(PROFICIENCY_DIE_FACES[8]).toEqual({ successes: 1, advantages: 1 }); // (S)(A)
      expect(PROFICIENCY_DIE_FACES[9]).toEqual({ successes: 1, advantages: 1 }); // (S)(A)
      expect(PROFICIENCY_DIE_FACES[10]).toEqual({ advantages: 2 }); // (A)(A)
      expect(PROFICIENCY_DIE_FACES[11]).toEqual({ successes: 1, advantages: 1 }); // (S)(A)
      expect(PROFICIENCY_DIE_FACES[12]).toEqual({ triumphs: 1 }); // (TR) - Triumph also counts as Success
    });
  });

  describe("Challenge Die (d12)", () => {
    test("should have correct face mappings according to specification", () => {
      expect(CHALLENGE_DIE_FACES[1]).toEqual({}); // Blank
      expect(CHALLENGE_DIE_FACES[2]).toEqual({ failures: 1 }); // (F)
      expect(CHALLENGE_DIE_FACES[3]).toEqual({ failures: 1 }); // (F)
      expect(CHALLENGE_DIE_FACES[4]).toEqual({ failures: 2 }); // (F)(F)
      expect(CHALLENGE_DIE_FACES[5]).toEqual({ failures: 2 }); // (F)(F)
      expect(CHALLENGE_DIE_FACES[6]).toEqual({ threats: 1 }); // (TH)
      expect(CHALLENGE_DIE_FACES[7]).toEqual({ threats: 1 }); // (TH)
      expect(CHALLENGE_DIE_FACES[8]).toEqual({ failures: 1, threats: 1 }); // (F)(TH)
      expect(CHALLENGE_DIE_FACES[9]).toEqual({ failures: 1, threats: 1 }); // (F)(TH)
      expect(CHALLENGE_DIE_FACES[10]).toEqual({ threats: 2 }); // (TH)(TH)
      expect(CHALLENGE_DIE_FACES[11]).toEqual({ threats: 2 }); // (TH)(TH)
      expect(CHALLENGE_DIE_FACES[12]).toEqual({ despairs: 1 }); // (D) - Despair also counts as Failure
    });
  });

  describe("Force Die (d12)", () => {
    test("should have correct face mappings according to specification", () => {
      expect(FORCE_DIE_FACES[1]).toEqual({ darkSide: 1 }); // (DS)
      expect(FORCE_DIE_FACES[2]).toEqual({ darkSide: 1 }); // (DS)
      expect(FORCE_DIE_FACES[3]).toEqual({ darkSide: 1 }); // (DS)
      expect(FORCE_DIE_FACES[4]).toEqual({ darkSide: 1 }); // (DS)
      expect(FORCE_DIE_FACES[5]).toEqual({ darkSide: 1 }); // (DS)
      expect(FORCE_DIE_FACES[6]).toEqual({ darkSide: 1 }); // (DS)
      expect(FORCE_DIE_FACES[7]).toEqual({ darkSide: 2 }); // (DS)(DS)
      expect(FORCE_DIE_FACES[8]).toEqual({ lightSide: 1 }); // (LS)
      expect(FORCE_DIE_FACES[9]).toEqual({ lightSide: 1 }); // (LS)
      expect(FORCE_DIE_FACES[10]).toEqual({ lightSide: 2 }); // (LS)(LS)
      expect(FORCE_DIE_FACES[11]).toEqual({ lightSide: 2 }); // (LS)(LS)
      expect(FORCE_DIE_FACES[12]).toEqual({ lightSide: 2 }); // (LS)(LS)
    });
  });

  describe("DICE_FACES export", () => {
    test("should contain all dice types", () => {
      expect(DICE_FACES).toHaveProperty("boost");
      expect(DICE_FACES).toHaveProperty("setback");
      expect(DICE_FACES).toHaveProperty("ability");
      expect(DICE_FACES).toHaveProperty("difficulty");
      expect(DICE_FACES).toHaveProperty("proficiency");
      expect(DICE_FACES).toHaveProperty("challenge");
      expect(DICE_FACES).toHaveProperty("force");
    });

    test("should reference the correct face configurations", () => {
      expect(DICE_FACES.boost).toBe(BOOST_DIE_FACES);
      expect(DICE_FACES.setback).toBe(SETBACK_DIE_FACES);
      expect(DICE_FACES.ability).toBe(ABILITY_DIE_FACES);
      expect(DICE_FACES.difficulty).toBe(DIFFICULTY_DIE_FACES);
      expect(DICE_FACES.proficiency).toBe(PROFICIENCY_DIE_FACES);
      expect(DICE_FACES.challenge).toBe(CHALLENGE_DIE_FACES);
      expect(DICE_FACES.force).toBe(FORCE_DIE_FACES);
    });
  });
});
