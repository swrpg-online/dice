import {
  roll,
  DEFAULT_MAX_DICE_PER_TYPE,
  DEFAULT_MAX_TOTAL_DICE,
} from "../src/dice";
import { DicePool, DiceResult, RollResult, RollOptions } from "../src/types";

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

describe("Input Validation and Bounds Checking", () => {
  describe("Per-Type Dice Limits", () => {
    test("allows maximum dice per type by default", () => {
      const pool: DicePool = {
        boostDice: DEFAULT_MAX_DICE_PER_TYPE,
        abilityDice: 0,
      };

      const result = roll(pool);
      expect(result.results).toHaveLength(DEFAULT_MAX_DICE_PER_TYPE);
    });

    test("silently caps dice to maximum per type by default", () => {
      const pool: DicePool = {
        boostDice: DEFAULT_MAX_DICE_PER_TYPE + 50,
        abilityDice: 0,
      };

      const result = roll(pool);
      expect(result.results).toHaveLength(DEFAULT_MAX_DICE_PER_TYPE);
    });

    test("throws error when per-type limit exceeded with throwOnLimitExceeded", () => {
      const pool: DicePool = {
        boostDice: DEFAULT_MAX_DICE_PER_TYPE + 1,
      };
      const options: RollOptions = {
        throwOnLimitExceeded: true,
      };

      expect(() => roll(pool, options)).toThrow(
        /Dice counts exceed per-type limit/,
      );
    });

    test("respects custom maxDicePerType option", () => {
      const customLimit = 50;
      const pool: DicePool = {
        abilityDice: customLimit,
      };
      const options: RollOptions = {
        maxDicePerType: customLimit,
      };

      const result = roll(pool, options);
      expect(result.results).toHaveLength(customLimit);
    });

    test("caps multiple dice types to per-type limit", () => {
      const pool: DicePool = {
        boostDice: DEFAULT_MAX_DICE_PER_TYPE + 10,
        abilityDice: DEFAULT_MAX_DICE_PER_TYPE + 20,
        proficiencyDice: DEFAULT_MAX_DICE_PER_TYPE + 30,
      };

      const result = roll(pool);
      const boostCount = result.results.filter(
        (r) => r.type === "boost",
      ).length;
      const abilityCount = result.results.filter(
        (r) => r.type === "ability",
      ).length;
      const proficiencyCount = result.results.filter(
        (r) => r.type === "proficiency",
      ).length;

      expect(boostCount).toBe(DEFAULT_MAX_DICE_PER_TYPE);
      expect(abilityCount).toBe(DEFAULT_MAX_DICE_PER_TYPE);
      expect(proficiencyCount).toBe(DEFAULT_MAX_DICE_PER_TYPE);
    });
  });

  describe("Total Dice Limits", () => {
    test("allows maximum total dice by default", () => {
      const dicePerType = Math.floor(DEFAULT_MAX_TOTAL_DICE / 7);
      const pool: DicePool = {
        boostDice: dicePerType,
        abilityDice: dicePerType,
        proficiencyDice: dicePerType,
        setBackDice: dicePerType,
        difficultyDice: dicePerType,
        challengeDice: dicePerType,
        forceDice: dicePerType,
      };

      const result = roll(pool);
      expect(result.results.length).toBeLessThanOrEqual(DEFAULT_MAX_TOTAL_DICE);
    });

    test("throws error when total dice exceeds limit", () => {
      const dicePerType = Math.floor(DEFAULT_MAX_TOTAL_DICE / 6) + 1;
      const pool: DicePool = {
        boostDice: dicePerType,
        abilityDice: dicePerType,
        proficiencyDice: dicePerType,
        setBackDice: dicePerType,
        difficultyDice: dicePerType,
        challengeDice: dicePerType,
      };

      expect(() => roll(pool)).toThrow(
        /Total dice count .* exceeds maximum allowed/,
      );
    });

    test("respects custom maxTotalDice option", () => {
      const customLimit = 200;
      const dicePerType = 35; // 35 * 6 = 210, which exceeds 200
      const pool: DicePool = {
        boostDice: dicePerType,
        abilityDice: dicePerType,
        proficiencyDice: dicePerType,
        setBackDice: dicePerType,
        difficultyDice: dicePerType,
        challengeDice: dicePerType,
      };
      const options: RollOptions = {
        maxTotalDice: customLimit,
      };

      expect(() => roll(pool, options)).toThrow(
        /Total dice count .* exceeds maximum allowed/,
      );
    });

    test("total limit is checked after per-type capping", () => {
      const pool: DicePool = {
        boostDice: DEFAULT_MAX_DICE_PER_TYPE * 2, // Will be capped to 100
        abilityDice: DEFAULT_MAX_DICE_PER_TYPE * 2, // Will be capped to 100
        proficiencyDice: DEFAULT_MAX_DICE_PER_TYPE * 2, // Will be capped to 100
        setBackDice: DEFAULT_MAX_DICE_PER_TYPE * 2, // Will be capped to 100
        difficultyDice: DEFAULT_MAX_DICE_PER_TYPE * 2, // Will be capped to 100
      };

      // After capping, total is 500, which equals DEFAULT_MAX_TOTAL_DICE
      const result = roll(pool);
      expect(result.results).toHaveLength(DEFAULT_MAX_TOTAL_DICE);
    });
  });

  describe("Edge Cases with Limits", () => {
    test("handles zero limits gracefully", () => {
      const pool: DicePool = {
        boostDice: 10,
        abilityDice: 10,
      };
      const options: RollOptions = {
        maxDicePerType: 0,
      };

      const result = roll(pool, options);
      expect(result.results).toHaveLength(0);
      expect(result.summary).toEqual({
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0,
        lightSide: 0,
        darkSide: 0,
      });
    });

    test("handles negative values with limits", () => {
      const pool: DicePool = {
        boostDice: -100,
        abilityDice: -50,
      };

      const result = roll(pool);
      expect(result.results).toHaveLength(0);
    });

    test("combines negative sanitization with upper bounds", () => {
      const pool: DicePool = {
        boostDice: -10,
        abilityDice: DEFAULT_MAX_DICE_PER_TYPE + 50,
      };

      const result = roll(pool);
      expect(result.results).toHaveLength(DEFAULT_MAX_DICE_PER_TYPE);
      expect(result.results.every((r) => r.type === "ability")).toBe(true);
    });
  });

  describe("Performance Tests", () => {
    test("handles large valid dice pools efficiently", () => {
      const startTime = Date.now();

      const pool: DicePool = {
        boostDice: 70,
        abilityDice: 70,
        proficiencyDice: 70,
        setBackDice: 70,
        difficultyDice: 70,
        challengeDice: 70,
        forceDice: 70,
      };

      const result = roll(pool);
      const endTime = Date.now();

      expect(result.results).toHaveLength(490); // 70 * 7 = 490
      expect(endTime - startTime).toBeLessThan(1000); // Should complete in under 1 second
    });

    test("handles maximum allowed dice efficiently", () => {
      const startTime = Date.now();

      const pool: DicePool = {
        boostDice: DEFAULT_MAX_DICE_PER_TYPE,
        abilityDice: DEFAULT_MAX_DICE_PER_TYPE,
        proficiencyDice: DEFAULT_MAX_DICE_PER_TYPE,
        setBackDice: DEFAULT_MAX_DICE_PER_TYPE,
        difficultyDice: DEFAULT_MAX_DICE_PER_TYPE,
      };

      const result = roll(pool);
      const endTime = Date.now();

      expect(result.results).toHaveLength(DEFAULT_MAX_TOTAL_DICE);
      expect(endTime - startTime).toBeLessThan(2000); // Should complete in under 2 seconds
    });
  });

  describe("Configuration Options", () => {
    test("allows different limits for different rolls", () => {
      const pool: DicePool = {
        boostDice: 30,
        abilityDice: 30,
      };

      // First roll with strict limits - total limit forces error
      const strictOptions: RollOptions = {
        maxDicePerType: 20,
        maxTotalDice: 30,
      };

      // This should throw because after capping to 20 each, total is 40 which exceeds 30
      expect(() => roll(pool, strictOptions)).toThrow(
        /Total dice count .* exceeds maximum allowed/,
      );

      // Second roll with relaxed limits
      const relaxedOptions: RollOptions = {
        maxDicePerType: 50,
        maxTotalDice: 100,
      };

      const relaxedResult = roll(pool, relaxedOptions);
      expect(relaxedResult.results).toHaveLength(60); // All dice allowed

      // Third roll with limits that work
      const workingOptions: RollOptions = {
        maxDicePerType: 15,
        maxTotalDice: 30,
      };

      const workingResult = roll(pool, workingOptions);
      expect(workingResult.results).toHaveLength(30); // Both dice types capped to 15 each
    });

    test("error messages include actual and maximum values", () => {
      const pool: DicePool = {
        boostDice: 150,
      };
      const options: RollOptions = {
        throwOnLimitExceeded: true,
      };

      try {
        roll(pool, options);
        fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("150"); // Actual value
        expect(error.message).toContain("100"); // Default limit
      }
    });

    test("total dice error shows helpful message", () => {
      const pool: DicePool = {
        boostDice: 100,
        abilityDice: 100,
        proficiencyDice: 100,
        setBackDice: 100,
        difficultyDice: 100,
        challengeDice: 100,
      };

      try {
        roll(pool);
        fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("Total dice count");
        expect(error.message).toContain("600"); // Actual total
        expect(error.message).toContain("500"); // Default limit
        expect(error.message).toContain("reduce the number of dice");
      }
    });
  });
});
