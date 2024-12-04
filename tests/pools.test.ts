import {
  createSkillCheck,
  createCombatCheck,
  createOpposedCheck,
  createDifficultyPool,
} from "../src/pools";

describe("Dice Pool Convenience Methods", () => {
  describe("createSkillCheck", () => {
    test("creates basic skill check pool", () => {
      const pool = createSkillCheck(2, 1);
      expect(pool).toEqual({
        abilityDice: 2,
        proficiencyDice: 1,
      });
    });

    test("creates pool with zero dice", () => {
      const pool = createSkillCheck(0, 0);
      expect(pool).toEqual({
        abilityDice: 0,
        proficiencyDice: 0,
      });
    });
  });

  describe("createCombatCheck", () => {
    test("creates combat check pool with boost", () => {
      const pool = createCombatCheck(2, 1, 1);
      expect(pool).toEqual({
        abilityDice: 2,
        proficiencyDice: 1,
        boostDice: 1,
      });
    });

    test("creates combat check pool without boost", () => {
      const pool = createCombatCheck(2, 1);
      expect(pool).toEqual({
        abilityDice: 2,
        proficiencyDice: 1,
        boostDice: 0,
      });
    });
  });

  describe("createOpposedCheck", () => {
    test("creates opposed check pool with challenge", () => {
      const pool = createOpposedCheck(2, 1, 2, 1);
      expect(pool).toEqual({
        abilityDice: 2,
        proficiencyDice: 1,
        difficultyDice: 2,
        challengeDice: 1,
      });
    });

    test("creates opposed check pool without challenge", () => {
      const pool = createOpposedCheck(2, 1, 2);
      expect(pool).toEqual({
        abilityDice: 2,
        proficiencyDice: 1,
        difficultyDice: 2,
        challengeDice: 0,
      });
    });
  });

  describe("createDifficultyPool", () => {
    test("creates difficulty pool with challenge", () => {
      const pool = createDifficultyPool(2, 1);
      expect(pool).toEqual({
        difficultyDice: 2,
        challengeDice: 1,
      });
    });

    test("creates difficulty pool without challenge", () => {
      const pool = createDifficultyPool(2);
      expect(pool).toEqual({
        difficultyDice: 2,
        challengeDice: 0,
      });
    });
  });
});
