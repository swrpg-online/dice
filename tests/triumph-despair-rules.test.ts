import { roll } from "../src/dice";
import { DicePool } from "../src/types";

/**
 * Tests for the Star Wars RPG rule:
 * "Triumphs count as successes, Despairs count as failures"
 *
 * This test suite explicitly verifies that both rolled and automatic
 * triumphs/despairs are correctly counted as successes/failures.
 */

// Mock Math.random for deterministic tests
const mockMathRandom = (value: number) => {
  const originalRandom = Math.random;
  Math.random = jest.fn().mockReturnValue(value);
  return () => {
    Math.random = originalRandom;
  };
};

describe("Star Wars RPG Rule: Triumphs count as Successes, Despairs count as Failures", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Rolled Triumphs", () => {
    test("a rolled triumph from a proficiency die counts as a success", () => {
      // Force proficiency die to roll face 12 (triumph)
      const cleanup = mockMathRandom(11 / 12);
      const pool: DicePool = {
        proficiencyDice: 1,
      };

      const result = roll(pool);

      // Should have 1 triumph and 1 success (from the triumph)
      expect(result.summary.triumphs).toBe(1);
      expect(result.summary.successes).toBe(1);
      expect(result.results[0]).toMatchObject({
        type: "proficiency",
        roll: 12,
        result: expect.objectContaining({
          triumphs: 1,
          successes: 0, // The die face itself doesn't have an explicit success
        }),
      });

      cleanup();
    });

    test("multiple rolled triumphs all count as successes", () => {
      // Force all proficiency dice to roll face 12 (triumph)
      const cleanup = mockMathRandom(11 / 12);
      const pool: DicePool = {
        proficiencyDice: 3,
      };

      const result = roll(pool);

      // Should have 3 triumphs and 3 successes (from the triumphs)
      expect(result.summary.triumphs).toBe(3);
      expect(result.summary.successes).toBe(3);

      cleanup();
    });

    test("rolled triumphs combine with regular successes correctly", () => {
      let callCount = 0;
      const mockValues = [
        3 / 12, // Proficiency die face 4 (2 successes)
        11 / 12, // Proficiency die face 12 (1 triumph = 1 implicit success)
      ];

      const originalRandom = Math.random;
      Math.random = jest.fn().mockImplementation(() => mockValues[callCount++]);

      const pool: DicePool = {
        proficiencyDice: 2,
      };

      const result = roll(pool);

      // Should have 3 total successes (2 explicit + 1 from triumph) and 1 triumph
      expect(result.summary.triumphs).toBe(1);
      expect(result.summary.successes).toBe(3);

      Math.random = originalRandom;
    });
  });

  describe("Rolled Despairs", () => {
    test("a rolled despair from a challenge die counts as a failure", () => {
      // Force challenge die to roll face 12 (despair)
      const cleanup = mockMathRandom(11 / 12);
      const pool: DicePool = {
        challengeDice: 1,
      };

      const result = roll(pool);

      // Should have 1 despair and 1 failure (from the despair)
      expect(result.summary.despair).toBe(1);
      expect(result.summary.failures).toBe(1);
      expect(result.results[0]).toMatchObject({
        type: "challenge",
        roll: 12,
        result: expect.objectContaining({
          despair: 1,
          failures: 0, // The die face itself doesn't have an explicit failure
        }),
      });

      cleanup();
    });

    test("multiple rolled despairs all count as failures", () => {
      // Force all challenge dice to roll face 12 (despair)
      const cleanup = mockMathRandom(11 / 12);
      const pool: DicePool = {
        challengeDice: 3,
      };

      const result = roll(pool);

      // Should have 3 despairs and 3 failures (from the despairs)
      expect(result.summary.despair).toBe(3);
      expect(result.summary.failures).toBe(3);

      cleanup();
    });

    test("rolled despairs combine with regular failures correctly", () => {
      let callCount = 0;
      const mockValues = [
        3 / 12, // Challenge die face 4 (2 failures)
        11 / 12, // Challenge die face 12 (1 despair = 1 implicit failure)
      ];

      const originalRandom = Math.random;
      Math.random = jest.fn().mockImplementation(() => mockValues[callCount++]);

      const pool: DicePool = {
        challengeDice: 2,
      };

      const result = roll(pool);

      // Should have 3 total failures (2 explicit + 1 from despair) and 1 despair
      expect(result.summary.despair).toBe(1);
      expect(result.summary.failures).toBe(3);

      Math.random = originalRandom;
    });
  });

  describe("Combined Rolled and Automatic Symbols", () => {
    test("rolled and automatic triumphs both count as successes", () => {
      // Force proficiency die to roll face 12 (triumph)
      const cleanup = mockMathRandom(11 / 12);
      const pool: DicePool = {
        proficiencyDice: 1,
        automaticTriumphs: 2,
      };

      const result = roll(pool);

      // Should have 3 triumphs total and 3 successes (all from triumphs)
      expect(result.summary.triumphs).toBe(3);
      expect(result.summary.successes).toBe(3);

      cleanup();
    });

    test("rolled and automatic despairs both count as failures", () => {
      // Force challenge die to roll face 12 (despair)
      const cleanup = mockMathRandom(11 / 12);
      const pool: DicePool = {
        challengeDice: 1,
        automaticDespairs: 2,
      };

      const result = roll(pool);

      // Should have 3 despairs total and 3 failures (all from despairs)
      expect(result.summary.despair).toBe(3);
      expect(result.summary.failures).toBe(3);

      cleanup();
    });

    test("complex pool with rolled and automatic triumphs plus regular successes", () => {
      let callCount = 0;
      const mockValues = [
        1 / 8, // Ability die face 2 (1 success)
        3 / 8, // Ability die face 4 (2 successes)
        11 / 12, // Proficiency die face 12 (1 triumph)
      ];

      const originalRandom = Math.random;
      Math.random = jest.fn().mockImplementation(() => mockValues[callCount++]);

      const pool: DicePool = {
        abilityDice: 2,
        proficiencyDice: 1,
        automaticSuccesses: 2,
        automaticTriumphs: 1,
      };

      const result = roll(pool);

      // Total successes: 1 + 2 (from dice) + 2 (automatic) + 1 (from rolled triumph) + 1 (from automatic triumph) = 7
      // Total triumphs: 1 (rolled) + 1 (automatic) = 2
      expect(result.summary.triumphs).toBe(2);
      expect(result.summary.successes).toBe(7);

      Math.random = originalRandom;
    });

    test("complex pool with rolled and automatic despairs plus regular failures", () => {
      let callCount = 0;
      const mockValues = [
        1 / 8, // Difficulty die face 2 (1 failure)
        2 / 8, // Difficulty die face 3 (2 failures)
        11 / 12, // Challenge die face 12 (1 despair)
      ];

      const originalRandom = Math.random;
      Math.random = jest.fn().mockImplementation(() => mockValues[callCount++]);

      const pool: DicePool = {
        difficultyDice: 2,
        challengeDice: 1,
        automaticFailures: 2,
        automaticDespairs: 1,
      };

      const result = roll(pool);

      // Total failures: 1 + 2 (from dice) + 2 (automatic) + 1 (from rolled despair) + 1 (from automatic despair) = 7
      // Total despairs: 1 (rolled) + 1 (automatic) = 2
      expect(result.summary.despair).toBe(2);
      expect(result.summary.failures).toBe(7);

      Math.random = originalRandom;
    });
  });

  describe("Net Success/Failure Calculations", () => {
    test("triumphs contribute to net success calculation", () => {
      // Force proficiency die to roll triumph, difficulty die to roll 2 failures
      let callCount = 0;
      const mockValues = [
        11 / 12, // Proficiency die face 12 (1 triumph = 1 success)
        2 / 8, // Difficulty die face 3 (2 failures)
      ];

      const originalRandom = Math.random;
      Math.random = jest.fn().mockImplementation(() => mockValues[callCount++]);

      const pool: DicePool = {
        proficiencyDice: 1,
        difficultyDice: 1,
        automaticTriumphs: 2, // 2 more triumphs = 2 more successes
      };

      const result = roll(pool);

      // 3 successes (from 3 triumphs) vs 2 failures = net 1 success
      expect(result.summary.triumphs).toBe(3);
      expect(result.summary.successes).toBe(1);
      expect(result.summary.failures).toBe(0);

      Math.random = originalRandom;
    });

    test("despairs contribute to net failure calculation", () => {
      // Force challenge die to roll despair, ability die to roll 2 successes
      let callCount = 0;
      const mockValues = [
        3 / 8, // Ability die face 4 (2 successes)
        11 / 12, // Challenge die face 12 (1 despair = 1 failure)
      ];

      const originalRandom = Math.random;
      Math.random = jest.fn().mockImplementation(() => mockValues[callCount++]);

      const pool: DicePool = {
        abilityDice: 1,
        challengeDice: 1,
        automaticDespairs: 2, // 2 more despairs = 2 more failures
      };

      const result = roll(pool);

      // 2 successes vs 3 failures (from 3 despairs) = net 1 failure
      expect(result.summary.despair).toBe(3);
      expect(result.summary.successes).toBe(0);
      expect(result.summary.failures).toBe(1);

      Math.random = originalRandom;
    });
  });

  describe("Verification: No Double-Counting", () => {
    test("triumphs do not double-count as successes", () => {
      // This test verifies we don't accidentally count triumphs twice
      const cleanup = mockMathRandom(11 / 12);
      const pool: DicePool = {
        proficiencyDice: 1,
      };

      const result = roll(pool);

      // Exactly 1 success from 1 triumph, not 2
      expect(result.summary.triumphs).toBe(1);
      expect(result.summary.successes).toBe(1); // NOT 2!

      cleanup();
    });

    test("despairs do not double-count as failures", () => {
      // This test verifies we don't accidentally count despairs twice
      const cleanup = mockMathRandom(11 / 12);
      const pool: DicePool = {
        challengeDice: 1,
      };

      const result = roll(pool);

      // Exactly 1 failure from 1 despair, not 2
      expect(result.summary.despair).toBe(1);
      expect(result.summary.failures).toBe(1); // NOT 2!

      cleanup();
    });

    test("automatic triumphs do not double-count", () => {
      const cleanup = mockMathRandom(0.1); // Low roll to avoid any successes from dice
      const pool: DicePool = {
        automaticTriumphs: 1,
        automaticSuccesses: 1,
      };

      const result = roll(pool);

      // 1 automatic success + 1 success from automatic triumph = 2 total
      expect(result.summary.triumphs).toBe(1);
      expect(result.summary.successes).toBe(2); // NOT 3!

      cleanup();
    });
  });
});
