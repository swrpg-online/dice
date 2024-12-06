import { formatResult, main, parseDiceNotation } from "../src/cli";
import { DicePool } from "../src/types";

jest.mock("../src/dice", () => ({
  roll: jest.fn(() => ({
    summary: {
      successes: 1,
      failures: 0,
      advantages: 0,
      threats: 0,
      triumphs: 0,
      despair: 0,
      lightSide: 0,
      darkSide: 0,
    },
    results: [],
  })),
}));

describe("CLI", () => {
  describe("parseDiceNotation", () => {
    test("should parse yellow/proficiency dice", () => {
      expect(parseDiceNotation("2y")).toEqual({
        boostDice: 0,
        abilityDice: 0,
        proficiencyDice: 2,
        setBackDice: 0,
        difficultyDice: 0,
        challengeDice: 0,
        forceDice: 0,
      });

      expect(parseDiceNotation("2pro")).toEqual({
        boostDice: 0,
        abilityDice: 0,
        proficiencyDice: 2,
        setBackDice: 0,
        difficultyDice: 0,
        challengeDice: 0,
        forceDice: 0,
      });
    });

    test("should parse green/ability dice", () => {
      expect(parseDiceNotation("1g")).toEqual({
        boostDice: 0,
        abilityDice: 1,
        proficiencyDice: 0,
        setBackDice: 0,
        difficultyDice: 0,
        challengeDice: 0,
        forceDice: 0,
      });

      expect(parseDiceNotation("1a")).toEqual({
        boostDice: 0,
        abilityDice: 1,
        proficiencyDice: 0,
        setBackDice: 0,
        difficultyDice: 0,
        challengeDice: 0,
        forceDice: 0,
      });
    });

    test("should parse multiple dice types", () => {
      expect(parseDiceNotation("2y 1g 2p 1r")).toEqual({
        boostDice: 0,
        abilityDice: 1,
        proficiencyDice: 2,
        setBackDice: 0,
        difficultyDice: 2,
        challengeDice: 1,
        forceDice: 0,
      });
    });

    test("should parse black/setback dice", () => {
      expect(parseDiceNotation("1blk")).toEqual({
        boostDice: 0,
        abilityDice: 0,
        proficiencyDice: 0,
        setBackDice: 1,
        difficultyDice: 0,
        challengeDice: 0,
        forceDice: 0,
      });
      expect(parseDiceNotation("1s")).toEqual({
        boostDice: 0,
        abilityDice: 0,
        proficiencyDice: 0,
        setBackDice: 1,
        difficultyDice: 0,
        challengeDice: 0,
        forceDice: 0,
      });
      expect(parseDiceNotation("1sb")).toEqual({
        boostDice: 0,
        abilityDice: 0,
        proficiencyDice: 0,
        setBackDice: 1,
        difficultyDice: 0,
        challengeDice: 0,
        forceDice: 0,
      });
      expect(parseDiceNotation("1k")).toEqual({
        boostDice: 0,
        abilityDice: 0,
        proficiencyDice: 0,
        setBackDice: 1,
        difficultyDice: 0,
        challengeDice: 0,
        forceDice: 0,
      });
    });
    test("handles invalid dice color", () => {
      const input = "2x"; // Invalid color code
      const result = parseDiceNotation(input);
      expect(result).toEqual({
        boostDice: 0,
        abilityDice: 0,
        proficiencyDice: 0,
        setBackDice: 0,
        difficultyDice: 0,
        challengeDice: 0,
        forceDice: 0,
      });
    });
    test("handles invalid number format", () => {
      const input = "abc"; // Invalid number
      const result = parseDiceNotation(input);
      expect(result).toEqual({
        boostDice: 0,
        abilityDice: 0,
        proficiencyDice: 0,
        setBackDice: 0,
        difficultyDice: 0,
        challengeDice: 0,
        forceDice: 0,
      });
    });
  });

  describe("formatResult", () => {
    test("should format results with all positive outcomes", () => {
      const result = {
        results: [],
        summary: {
          successes: 2,
          failures: 0,
          advantages: 1,
          threats: 0,
          triumphs: 1,
          despair: 0,
          lightSide: 0,
          darkSide: 0,
        },
      };

      const formatted = formatResult(result);
      expect(formatted).toBe("2 Success(es), 1 Advantage(s), 1 Triumph(s)");
    });

    test('should return "No effects" when no results', () => {
      const result = {
        results: [],
        summary: {
          successes: 0,
          failures: 0,
          advantages: 0,
          threats: 0,
          triumphs: 0,
          despair: 0,
          lightSide: 0,
          darkSide: 0,
        },
      };

      const formatted = formatResult(result);
      expect(formatted).toBe("No effects");
    });

    test("formats successes and failures correctly", () => {
      const result = {
        results: [],
        summary: {
          successes: 2,
          failures: 1,
          advantages: 0,
          threats: 0,
          triumphs: 0,
          despair: 0,
          lightSide: 0,
          darkSide: 0,
        },
      };
      expect(formatResult(result)).toBe("2 Success(es), 1 Failure(s)");
    });
    test("formats advantages and threats correctly", () => {
      const result = {
        results: [],
        summary: {
          successes: 0,
          failures: 0,
          advantages: 3,
          threats: 1,
          triumphs: 0,
          despair: 0,
          lightSide: 0,
          darkSide: 0,
        },
      };
      expect(formatResult(result)).toBe("3 Advantage(s), 1 Threat(s)");
    });
    test("formats triumphs and despairs correctly", () => {
      const result = {
        results: [],
        summary: {
          successes: 1,
          failures: 0,
          advantages: 0,
          threats: 0,
          triumphs: 2,
          despair: 1,
          lightSide: 0,
          darkSide: 0,
        },
      };
      expect(formatResult(result)).toBe(
        "1 Success(es), 2 Triumph(s), 1 Despair(s)",
      );
    });
    test("handles failure with threats", () => {
      const result = {
        results: [],
        summary: {
          successes: 0,
          failures: 2,
          advantages: 0,
          threats: 3,
          triumphs: 0,
          despair: 0,
          lightSide: 0,
          darkSide: 0,
        },
      };
      expect(formatResult(result)).toBe("2 Failure(s), 3 Threat(s)");
    });
  });
});

describe("CLI Functions", () => {
  describe("parseDiceNotation", () => {
    test("parses valid dice notation", () => {
      const input = "2y 1g 2p 1r";
      const expected: DicePool = {
        proficiencyDice: 2,
        abilityDice: 1,
        boostDice: 0,
        challengeDice: 1,
        difficultyDice: 2,
        setBackDice: 0,
        forceDice: 0,
      };
      expect(parseDiceNotation(input)).toEqual(expected);
    });
    test("parses alternative dice notation", () => {
      const input = "1pro 1a 1boo 1c 1diff 1sb";
      const expected: DicePool = {
        proficiencyDice: 1,
        abilityDice: 1,
        boostDice: 1,
        challengeDice: 1,
        difficultyDice: 1,
        setBackDice: 1,
        forceDice: 0,
      };
      expect(parseDiceNotation(input)).toEqual(expected);
    });
    test("handles empty input", () => {
      const input = "";
      const expected: DicePool = {
        proficiencyDice: 0,
        abilityDice: 0,
        boostDice: 0,
        challengeDice: 0,
        difficultyDice: 0,
        setBackDice: 0,
        forceDice: 0,
      };
      expect(parseDiceNotation(input)).toEqual(expected);
    });
  });
});

describe("Error handling", () => {
  test("handles invalid dice notation", () => {
    expect(parseDiceNotation("invalid")).toEqual({
      boostDice: 0,
      abilityDice: 0,
      proficiencyDice: 0,
      setBackDice: 0,
      difficultyDice: 0,
      challengeDice: 0,
      forceDice: 0,
    });
  });
  test("handles malformed dice numbers", () => {
    expect(parseDiceNotation("ayg")).toEqual({
      boostDice: 0,
      abilityDice: 0,
      proficiencyDice: 0,
      setBackDice: 0,
      difficultyDice: 0,
      challengeDice: 0,
      forceDice: 0,
    });
  });
});

describe("CLI main function", () => {
  // Mock console.log
  const mockConsoleLog = jest
    .spyOn(console, "log")
    .mockImplementation(() => {});
  // Mock process.exit
  const mockExit = jest.spyOn(process, "exit").mockImplementation((number) => {
    throw new Error("process.exit: " + number);
  });
  // Store original argv
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = ["node", "script.js"]; // Reset to default
  });

  afterEach(() => {
    mockConsoleLog.mockClear();
    mockExit.mockClear();
  });

  afterAll(() => {
    process.argv = originalArgv;
    mockConsoleLog.mockRestore();
    mockExit.mockRestore();
  });

  test("shows usage when no arguments provided", () => {
    expect(() => main()).toThrow("process.exit: 1");
    expect(mockConsoleLog).toHaveBeenCalledWith(
      expect.stringContaining("Usage:"),
    );
  });

  test("processes valid dice notation", () => {
    process.argv = ["node", "script.js", "1y", "2g"];
    expect(() => main()).not.toThrow();
    expect(mockConsoleLog).toHaveBeenCalled();
  });
});
