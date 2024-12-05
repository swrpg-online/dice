import {
  roll,
  createSkillCheck,
  createCombatCheck,
  createOpposedCheck,
  createDifficultyPool,
  DicePool,
} from "../src/index";

describe("Index exports", () => {
  test("roll function is exported and working", () => {
    const pool: DicePool = { abilityDice: 1 };
    const result = roll(pool);
    expect(result).toBeDefined();
    expect(result.results).toBeDefined();
    expect(result.summary).toBeDefined();
  });

  test("pool creation functions are exported and working", () => {
    expect(createSkillCheck(1, 1)).toBeDefined();
    expect(createCombatCheck(1, 1, 1)).toBeDefined();
    expect(createOpposedCheck(1, 1, 1, 1)).toBeDefined();
    expect(createDifficultyPool(1, 1)).toBeDefined();
  });
});
