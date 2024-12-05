import { roll } from "../src/dice";
import { DicePool, DiceResult, RollResult } from "../src/types";

// Mock Math.random for deterministic tests
const mockMathRandom = (value: number) => {
  const originalRandom = Math.random;
  Math.random = jest.fn().mockReturnValue(value);
  return () => {
    Math.random = originalRandom;
  };
};

describe("SWRPG Dice Rolling", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Detailed Roll Breakdown", () => {
    test("returns detailed results for each die", () => {
      const cleanup = mockMathRandom(0.5); // mid-range roll
      const pool: DicePool = {
        boostDice: 1,
        abilityDice: 1,
      };

      const result = roll(pool);

      expect(result).toHaveProperty("results");
      expect(result).toHaveProperty("summary");
      expect(Array.isArray(result.results)).toBe(true);
      expect(result.results).toHaveLength(2);

      // Check structure of detailed results
      result.results.forEach((dieResult) => {
        expect(dieResult).toHaveProperty("type");
        expect(dieResult).toHaveProperty("roll");
        expect(dieResult).toHaveProperty("result");
        expect(["boost", "ability"]).toContain(dieResult.type);
        expect(typeof dieResult.roll).toBe("number");
      });

      cleanup();
    });

    test("properly identifies die types", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        boostDice: 1,
        abilityDice: 1,
        proficiencyDice: 1,
        setBackDice: 1,
        difficultyDice: 1,
        challengeDice: 1,
      };

      const result = roll(pool);
      const dieTypes = result.results.map((r) => r.type);

      expect(dieTypes).toContain("boost");
      expect(dieTypes).toContain("ability");
      expect(dieTypes).toContain("proficiency");
      expect(dieTypes).toContain("setback");
      expect(dieTypes).toContain("difficulty");
      expect(dieTypes).toContain("challenge");

      cleanup();
    });
  });

  describe("Individual Die Results", () => {
    describe("Boost Die (d6)", () => {
      test.each([
        [
          1,
          {
            successes: 0,
            failures: 0,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          2,
          {
            successes: 0,
            failures: 0,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          3,
          {
            successes: 1,
            failures: 0,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          4,
          {
            successes: 1,
            failures: 0,
            advantages: 1,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          5,
          {
            successes: 0,
            failures: 0,
            advantages: 2,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          6,
          {
            successes: 0,
            failures: 0,
            advantages: 1,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
      ])("face value %i should return correct results", (value, expected) => {
        const cleanup = mockMathRandom((value - 1) / 6);
        const pool: DicePool = { boostDice: 1 };
        expect(roll(pool).summary).toEqual(expected);
        cleanup();
      });
    });

    describe("Ability Die (d8)", () => {
      test.each([
        [
          1,
          {
            successes: 0,
            failures: 0,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          2,
          {
            successes: 1,
            failures: 0,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          3,
          {
            successes: 1,
            failures: 0,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          4,
          {
            successes: 2,
            failures: 0,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          5,
          {
            successes: 0,
            failures: 0,
            advantages: 1,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          6,
          {
            successes: 0,
            failures: 0,
            advantages: 1,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          7,
          {
            successes: 1,
            failures: 0,
            advantages: 1,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          8,
          {
            successes: 0,
            failures: 0,
            advantages: 2,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
      ])("face value %i should return correct results", (value, expected) => {
        const cleanup = mockMathRandom((value - 1) / 8);
        const pool: DicePool = { abilityDice: 1 };
        expect(roll(pool).summary).toEqual(expected);
        cleanup();
      });
    });

    describe("Proficiency Die (d12)", () => {
      test.each([
        [
          1,
          {
            successes: 0,
            failures: 0,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          2,
          {
            successes: 1,
            failures: 0,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          3,
          {
            successes: 1,
            failures: 0,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          4,
          {
            successes: 2,
            failures: 0,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          5,
          {
            successes: 2,
            failures: 0,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          6,
          {
            successes: 0,
            failures: 0,
            advantages: 1,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          7,
          {
            successes: 1,
            failures: 0,
            advantages: 1,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          8,
          {
            successes: 1,
            failures: 0,
            advantages: 1,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          9,
          {
            successes: 1,
            failures: 0,
            advantages: 1,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          10,
          {
            successes: 0,
            failures: 0,
            advantages: 2,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          11,
          {
            successes: 0,
            failures: 0,
            advantages: 2,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          12,
          {
            successes: 0,
            failures: 0,
            advantages: 0,
            threats: 0,
            triumphs: 1,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
      ])("face value %i should return correct results", (value, expected) => {
        const cleanup = mockMathRandom((value - 1) / 12);
        const pool: DicePool = { proficiencyDice: 1 };
        expect(roll(pool).summary).toEqual(expected);
        cleanup();
      });
    });

    describe("Setback Die (d6)", () => {
      test.each([
        [
          1,
          {
            successes: 0,
            failures: 0,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          2,
          {
            successes: 0,
            failures: 0,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          3,
          {
            successes: 0,
            failures: 1,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          4,
          {
            successes: 0,
            failures: 1,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          5,
          {
            successes: 0,
            failures: 0,
            advantages: 0,
            threats: 1,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          6,
          {
            successes: 0,
            failures: 0,
            advantages: 0,
            threats: 1,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
      ])("face value %i should return correct results", (value, expected) => {
        const cleanup = mockMathRandom((value - 1) / 6);
        const pool: DicePool = { setBackDice: 1 };
        expect(roll(pool).summary).toEqual(expected);
        cleanup();
      });
    });

    describe("Difficulty Die (d8)", () => {
      test.each([
        [
          1,
          {
            successes: 0,
            failures: 0,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          2,
          {
            successes: 0,
            failures: 1,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          3,
          {
            successes: 0,
            failures: 2,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          4,
          {
            successes: 0,
            failures: 0,
            advantages: 0,
            threats: 1,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          5,
          {
            successes: 0,
            failures: 0,
            advantages: 0,
            threats: 1,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          6,
          {
            successes: 0,
            failures: 0,
            advantages: 0,
            threats: 1,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          7,
          {
            successes: 0,
            failures: 0,
            advantages: 0,
            threats: 2,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          8,
          {
            successes: 0,
            failures: 1,
            advantages: 0,
            threats: 1,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
      ])("face value %i should return correct results", (value, expected) => {
        const cleanup = mockMathRandom((value - 1) / 8);
        const pool: DicePool = { difficultyDice: 1 };
        expect(roll(pool).summary).toEqual(expected);
        cleanup();
      });
    });

    describe("Challenge Die (d12)", () => {
      test.each([
        [
          1,
          {
            successes: 0,
            failures: 0,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          2,
          {
            successes: 0,
            failures: 1,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          3,
          {
            successes: 0,
            failures: 1,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          4,
          {
            successes: 0,
            failures: 2,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          5,
          {
            successes: 0,
            failures: 2,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          6,
          {
            successes: 0,
            failures: 0,
            advantages: 0,
            threats: 1,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          7,
          {
            successes: 0,
            failures: 0,
            advantages: 0,
            threats: 1,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          8,
          {
            successes: 0,
            failures: 1,
            advantages: 0,
            threats: 1,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          9,
          {
            successes: 0,
            failures: 1,
            advantages: 0,
            threats: 1,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          10,
          {
            successes: 0,
            failures: 0,
            advantages: 0,
            threats: 2,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          11,
          {
            successes: 0,
            failures: 0,
            advantages: 0,
            threats: 2,
            triumphs: 0,
            despair: 0,
            lightSide: 0,
            darkSide: 0,
          },
        ],
        [
          12,
          {
            successes: 0,
            failures: 0,
            advantages: 0,
            threats: 0,
            triumphs: 0,
            despair: 1,
            lightSide: 0,
            darkSide: 0,
          },
        ],
      ])("face value %i should return correct results", (value, expected) => {
        const cleanup = mockMathRandom((value - 1) / 12);
        const pool: DicePool = { challengeDice: 1 };
        expect(roll(pool).summary).toEqual(expected);
        cleanup();
      });
    });
  });

  describe("Edge Cases", () => {
    test("negative numbers default to 0", () => {
      const pool: DicePool = {
        boostDice: -1,
        abilityDice: -2,
        proficiencyDice: -1,
        setBackDice: -3,
        difficultyDice: -2,
        challengeDice: -1,
      };
      const expected: DiceResult = {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
      expect(roll(pool).summary).toEqual(expected);
    });

    test("undefined values default to 0", () => {
      const pool: DicePool = {
        boostDice: undefined,
        abilityDice: undefined,
        proficiencyDice: undefined,
        setBackDice: undefined,
        difficultyDice: undefined,
        challengeDice: undefined,
      };
      const expected: DiceResult = {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
      expect(roll(pool).summary).toEqual(expected);
    });

    test("empty pool returns zero results", () => {
      const pool: DicePool = {};
      const expected: DiceResult = {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      };
      expect(roll(pool).summary).toEqual(expected);
    });
  });

  describe("Result Accumulation", () => {
    test("successes and failures cancel out", () => {
      // Mock to generate one success and one failure
      const cleanup1 = mockMathRandom(1 / 8); // ability die success (face value 2)
      const cleanup2 = mockMathRandom(1 / 8); // difficulty die failure (face value 2)

      const pool: DicePool = {
        abilityDice: 1,
        difficultyDice: 1,
      };

      const result = roll(pool);
      expect(result.summary.successes).toBe(0);
      expect(result.summary.failures).toBe(0);

      cleanup1();
      cleanup2();
    });

    test("advantages and threats accumulate independently", () => {
      // Mock to generate advantages and threats
      const cleanup1 = mockMathRandom(4 / 6); // boost die success + advantage
      const cleanup2 = mockMathRandom(6 / 8); // difficulty die threat

      const pool: DicePool = {
        boostDice: 1,
        difficultyDice: 1,
      };

      const result = roll(pool);
      expect(result.summary.advantages).toBeGreaterThan(0);
      expect(result.summary.threats).toBeGreaterThan(0);

      cleanup1();
      cleanup2();
    });

    test("triumphs and despair count independently", () => {
      // Mock to generate one triumph and one despair
      const cleanup1 = mockMathRandom(11 / 12); // proficiency die triumph
      const cleanup2 = mockMathRandom(11 / 12); // challenge die despair

      const pool: DicePool = {
        proficiencyDice: 1,
        challengeDice: 1,
      };

      const result = roll(pool);
      expect(result.summary.triumphs).toBe(1);
      expect(result.summary.despair).toBe(1);

      cleanup1();
      cleanup2();
    });
  });

  describe("Complex Combinations", () => {
    test("realistic skill check - standard difficulty", () => {
      const pool: DicePool = {
        abilityDice: 2,
        proficiencyDice: 1,
        difficultyDice: 2,
      };

      const result = roll(pool);

      // Verify result structure
      expect(result.summary).toHaveProperty("successes");
      expect(result.summary).toHaveProperty("failures");
      expect(result.summary).toHaveProperty("advantages");
      expect(result.summary).toHaveProperty("threats");
      expect(result.summary).toHaveProperty("triumphs");
      expect(result.summary).toHaveProperty("despair");

      // Verify ranges
      expect(result.summary.successes).toBeGreaterThanOrEqual(0);
      expect(result.summary.failures).toBeGreaterThanOrEqual(0);
      expect(result.summary.advantages).toBeGreaterThanOrEqual(0);
      expect(result.summary.threats).toBeGreaterThanOrEqual(0);
      expect(result.summary.triumphs).toBeGreaterThanOrEqual(0);
      expect(result.summary.despair).toBeGreaterThanOrEqual(0);
    });

    test("opposed check - combat scenario", () => {
      const pool: DicePool = {
        abilityDice: 1,
        proficiencyDice: 1,
        boostDice: 1,
        difficultyDice: 1,
        challengeDice: 1,
        setBackDice: 1,
      };

      const result = roll(pool);

      // Verify ranges
      expect(result.summary.successes).toBeGreaterThanOrEqual(0);
      expect(result.summary.failures).toBeGreaterThanOrEqual(0);
      expect(result.summary.advantages).toBeGreaterThanOrEqual(0);
      expect(result.summary.threats).toBeGreaterThanOrEqual(0);
      expect(result.summary.triumphs).toBeGreaterThanOrEqual(0);
      expect(result.summary.despair).toBeGreaterThanOrEqual(0);

      // Check detailed results
      expect(result.results).toHaveLength(6); // One result per die
      result.results.forEach((dieResult) => {
        expect(dieResult).toHaveProperty("type");
        expect(dieResult).toHaveProperty("roll");
        expect(dieResult).toHaveProperty("result");
      });
    });
  });
});

describe("Force Die (d12)", () => {
  test.each([
    [
      1,
      {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 1,
        darkSide: 0,
      },
    ],
    [
      6,
      {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 2,
        darkSide: 0,
      },
    ],
    [
      8,
      {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 1,
      },
    ],
    [
      12,
      {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 2,
      },
    ],
  ])("face value %i should return correct results", (value, expected) => {
    const cleanup = mockMathRandom((value - 1) / 12);
    const pool: DicePool = { forceDice: 1 };
    expect(roll(pool).summary).toEqual(expected);
    cleanup();
  });
});
