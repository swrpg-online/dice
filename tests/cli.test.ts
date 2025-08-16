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

    test("should format results with hints", () => {
      const result = {
        results: [],
        summary: {
          successes: 2,
          failures: 0,
          advantages: 2,
          threats: 0,
          triumphs: 0,
          despair: 0,
          lightSide: 0,
          darkSide: 0,
          hints: [
            "1 Advantage - Recover one strain",
            "2 Advantages OR 1 Triumph - Perform a free maneuver",
          ],
        },
      };

      const formatted = formatResult(result);
      expect(formatted).toContain("2 Success(es), 2 Advantage(s)");
      expect(formatted).toContain("Possible actions:");
      expect(formatted).toContain(" • 1 Advantage - Recover one strain");
      expect(formatted).toContain(" • 2 Advantages OR 1 Triumph - Perform a free maneuver");
    });

    test("should format results with empty hints array", () => {
      const result = {
        results: [],
        summary: {
          successes: 1,
          failures: 0,
          advantages: 0,
          threats: 0,
          triumphs: 0,
          despair: 0,
          lightSide: 0,
          darkSide: 0,
          hints: [],
        },
      };

      const formatted = formatResult(result);
      expect(formatted).toBe("1 Success(es)");
      expect(formatted).not.toContain("Possible actions:");
    });

    test("should format results with multiple hints", () => {
      const result = {
        results: [],
        summary: {
          successes: 0,
          failures: 0,
          advantages: 3,
          threats: 0,
          triumphs: 1,
          despair: 0,
          lightSide: 0,
          darkSide: 0,
          hints: [
            "1 Advantage - Recover strain",
            "2 Advantages OR 1 Triumph - Add boost die",
            "3 Advantages OR 1 Triumph - Negate defense",
            "1 Triumph - Upgrade difficulty",
          ],
        },
      };

      const formatted = formatResult(result);
      expect(formatted).toContain("3 Advantage(s), 1 Triumph(s)");
      expect(formatted).toContain("Possible actions:");
      const lines = formatted.split("\n");
      const hintLines = lines.filter(line => line.includes(" • "));
      expect(hintLines).toHaveLength(4);
    });

    test("should format results with threat hints", () => {
      const result = {
        results: [],
        summary: {
          successes: 0,
          failures: 1,
          advantages: 0,
          threats: 2,
          triumphs: 0,
          despair: 1,
          lightSide: 0,
          darkSide: 0,
          hints: [
            "1 Threat OR 1 Despair - Suffer strain",
            "2 Threats OR 1 Despair - Opponent free maneuver",
            "1 Despair - Weapon damaged",
          ],
        },
      };

      const formatted = formatResult(result);
      expect(formatted).toContain("1 Failure(s), 2 Threat(s), 1 Despair(s)");
      expect(formatted).toContain("Possible actions:");
      expect(formatted).toContain(" • 1 Threat OR 1 Despair - Suffer strain");
      expect(formatted).toContain(" • 2 Threats OR 1 Despair - Opponent free maneuver");
      expect(formatted).toContain(" • 1 Despair - Weapon damaged");
    });

    test("should handle undefined hints", () => {
      const result = {
        results: [],
        summary: {
          successes: 2,
          failures: 0,
          advantages: 1,
          threats: 0,
          triumphs: 0,
          despair: 0,
          lightSide: 0,
          darkSide: 0,
          // hints is undefined
        },
      };

      const formatted = formatResult(result);
      expect(formatted).toBe("2 Success(es), 1 Advantage(s)");
      expect(formatted).not.toContain("Possible actions:");
    });

    test("should format mixed positive and negative results with hints", () => {
      const result = {
        results: [],
        summary: {
          successes: 1,
          failures: 0,
          advantages: 2,
          threats: 1,
          triumphs: 0,
          despair: 0,
          lightSide: 0,
          darkSide: 0,
          hints: [
            "2 Advantages OR 1 Triumph - Add setback die",
            "1 Threat OR 1 Despair - Lose maneuver benefit",
          ],
        },
      };

      const formatted = formatResult(result);
      expect(formatted).toContain("1 Success(es), 2 Advantage(s), 1 Threat(s)");
      expect(formatted).toContain("Possible actions:");
      expect(formatted).toContain(" • 2 Advantages OR 1 Triumph - Add setback die");
      expect(formatted).toContain(" • 1 Threat OR 1 Despair - Lose maneuver benefit");
    });

    test("should handle single hint correctly", () => {
      const result = {
        results: [],
        summary: {
          successes: 0,
          failures: 0,
          advantages: 1,
          threats: 0,
          triumphs: 0,
          despair: 0,
          lightSide: 0,
          darkSide: 0,
          hints: [
            "1 Advantage - Recover one strain",
          ],
        },
      };

      const formatted = formatResult(result);
      expect(formatted).toBe("1 Advantage(s)\n\nPossible actions:\n • 1 Advantage - Recover one strain");
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
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

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
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: Invalid dice notation: "invalid" - number not found',
    );
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
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: Invalid dice notation: "ayg" - number not found',
    );
  });

  test("handles invalid numbers like 'abc'", () => {
    expect(parseDiceNotation("abc")).toEqual({
      boostDice: 0,
      abilityDice: 0,
      proficiencyDice: 0,
      setBackDice: 0,
      difficultyDice: 0,
      challengeDice: 0,
      forceDice: 0,
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: Invalid dice notation: "abc" - number not found',
    );
  });

  test("handles decimal numbers like '2.5g'", () => {
    expect(parseDiceNotation("2.5g")).toEqual({
      boostDice: 0,
      abilityDice: 0,
      proficiencyDice: 0,
      setBackDice: 0,
      difficultyDice: 0,
      challengeDice: 0,
      forceDice: 0,
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: Invalid dice notation: "2.5g" - dice count must be a whole number',
    );
  });

  test("handles comma numbers like '2,5g'", () => {
    expect(parseDiceNotation("2,5g")).toEqual({
      boostDice: 0,
      abilityDice: 0,
      proficiencyDice: 0,
      setBackDice: 0,
      difficultyDice: 0,
      challengeDice: 0,
      forceDice: 0,
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: Invalid dice notation: "2,5g" - dice count must be a whole number',
    );
  });

  test("handles invalid dice colors like '2x' or '3zz'", () => {
    expect(parseDiceNotation("2x 3zz")).toEqual({
      boostDice: 0,
      abilityDice: 0,
      proficiencyDice: 0,
      setBackDice: 0,
      difficultyDice: 0,
      challengeDice: 0,
      forceDice: 0,
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: Invalid dice color: "x" in "2x"',
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: Invalid dice color: "zz" in "3zz"',
    );
  });

  test("handles numbers without dice color like '5'", () => {
    expect(parseDiceNotation("5")).toEqual({
      boostDice: 0,
      abilityDice: 0,
      proficiencyDice: 0,
      setBackDice: 0,
      difficultyDice: 0,
      challengeDice: 0,
      forceDice: 0,
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: Invalid dice notation: "5" - no dice color specified',
    );
  });

  test("handles mixed valid and invalid notation", () => {
    expect(parseDiceNotation("2g invalid 1p 3.5b 1r 2x")).toEqual({
      boostDice: 0,
      abilityDice: 2,
      proficiencyDice: 0,
      setBackDice: 0,
      difficultyDice: 1,
      challengeDice: 1,
      forceDice: 0,
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: Invalid dice notation: "invalid" - number not found',
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: Invalid dice notation: "3.5b" - dice count must be a whole number',
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: Invalid dice color: "x" in "2x"',
    );
  });

  test("handles whitespace-only input", () => {
    expect(parseDiceNotation("   ")).toEqual({
      boostDice: 0,
      abilityDice: 0,
      proficiencyDice: 0,
      setBackDice: 0,
      difficultyDice: 0,
      challengeDice: 0,
      forceDice: 0,
    });
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  test("handles multiple spaces between valid dice", () => {
    expect(parseDiceNotation("1g    2p")).toEqual({
      boostDice: 0,
      abilityDice: 1,
      proficiencyDice: 0,
      setBackDice: 0,
      difficultyDice: 2,
      challengeDice: 0,
      forceDice: 0,
    });
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  test("handles special characters in notation", () => {
    expect(parseDiceNotation("@#$% 1g !@#")).toEqual({
      boostDice: 0,
      abilityDice: 1,
      proficiencyDice: 0,
      setBackDice: 0,
      difficultyDice: 0,
      challengeDice: 0,
      forceDice: 0,
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: Invalid dice notation: "@#$%" - number not found',
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Warning: Invalid dice notation: "!@#" - number not found',
    );
  });

  test("handles negative numbers", () => {
    expect(parseDiceNotation("-2g")).toEqual({
      boostDice: 0,
      abilityDice: -2,
      proficiencyDice: 0,
      setBackDice: 0,
      difficultyDice: 0,
      challengeDice: 0,
      forceDice: 0,
    });
    // Negative numbers are technically parsed but may not make sense semantically
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  test("handles zero dice counts", () => {
    expect(parseDiceNotation("0g 0p")).toEqual({
      boostDice: 0,
      abilityDice: 0,
      proficiencyDice: 0,
      setBackDice: 0,
      difficultyDice: 0,
      challengeDice: 0,
      forceDice: 0,
    });
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  test("handles very large numbers", () => {
    expect(parseDiceNotation("999999g")).toEqual({
      boostDice: 0,
      abilityDice: 999999,
      proficiencyDice: 0,
      setBackDice: 0,
      difficultyDice: 0,
      challengeDice: 0,
      forceDice: 0,
    });
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });
});

describe("CLI main function", () => {
  // Mock console.log
  const mockConsoleLog = jest
    .spyOn(console, "log")
    .mockImplementation(() => {});
  // Mock console.error - create a fresh spy for this test suite
  let mockConsoleError: jest.SpyInstance;
  // Mock process.exit
  const mockExit = jest.spyOn(process, "exit").mockImplementation((number) => {
    throw new Error("process.exit: " + number);
  });
  // Store original argv
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = ["node", "script.js"]; // Reset to default
    mockConsoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    mockConsoleLog.mockClear();
    mockConsoleError.mockRestore();
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

  test("shows error message for completely invalid notation", () => {
    process.argv = ["node", "script.js", "invalid", "xyz"];
    expect(() => main()).toThrow("process.exit: 1");
    // Multiple console.error calls are made - check for the main error message
    const errorCalls = mockConsoleError.mock.calls.map((call) => call[0]);
    expect(errorCalls).toContain(
      "\nError: No valid dice found in the notation.",
    );
  });

  test("processes mixed valid and invalid notation", () => {
    process.argv = ["node", "script.js", "1y", "invalid", "2g"];
    // This should still work since it has some valid dice
    expect(() => main()).not.toThrow();
    // Check that warning was logged for invalid notation
    const errorCalls = mockConsoleError.mock.calls.map((call) => call[0]);
    expect(errorCalls).toContain(
      'Warning: Invalid dice notation: "invalid" - number not found',
    );
    // Check that the result was still displayed
    expect(mockConsoleLog).toHaveBeenCalled();
  });

  test("processes dice with --hints flag", () => {
    process.argv = ["node", "script.js", "2y", "1g", "--hints"];
    expect(() => main()).not.toThrow();
    expect(mockConsoleLog).toHaveBeenCalled();
  });

  test("handles --hints flag in middle of arguments", () => {
    process.argv = ["node", "script.js", "1y", "--hints", "2g"];
    expect(() => main()).not.toThrow();
    expect(mockConsoleLog).toHaveBeenCalled();
  });

  test("handles --hints flag at beginning", () => {
    process.argv = ["node", "script.js", "--hints", "1y", "2g"];
    expect(() => main()).not.toThrow();
    expect(mockConsoleLog).toHaveBeenCalled();
  });

  test("processes dice without --hints flag", () => {
    process.argv = ["node", "script.js", "2y", "1g", "1p"];
    expect(() => main()).not.toThrow();
    expect(mockConsoleLog).toHaveBeenCalled();
  });
});
