// tests/cli.test.ts
import { formatResult, parseDiceNotation } from "../src/cli";

jest.mock("../src/dice", () => ({
  roll: jest.fn(),
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
      });

      expect(parseDiceNotation("2pro")).toEqual({
        boostDice: 0,
        abilityDice: 0,
        proficiencyDice: 2,
        setBackDice: 0,
        difficultyDice: 0,
        challengeDice: 0,
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
      });

      expect(parseDiceNotation("1a")).toEqual({
        boostDice: 0,
        abilityDice: 1,
        proficiencyDice: 0,
        setBackDice: 0,
        difficultyDice: 0,
        challengeDice: 0,
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
      });
      expect(parseDiceNotation("1s")).toEqual({
        boostDice: 0,
        abilityDice: 0,
        proficiencyDice: 0,
        setBackDice: 1,
        difficultyDice: 0,
        challengeDice: 0,
      });
      expect(parseDiceNotation("1sb")).toEqual({
        boostDice: 0,
        abilityDice: 0,
        proficiencyDice: 0,
        setBackDice: 1,
        difficultyDice: 0,
        challengeDice: 0,
      });
      expect(parseDiceNotation("1k")).toEqual({
        boostDice: 0,
        abilityDice: 0,
        proficiencyDice: 0,
        setBackDice: 1,
        difficultyDice: 0,
        challengeDice: 0,
      });
    });
  });

  describe("formatResult", () => {
    test("should format results with all positive outcomes", () => {
      const result = {
        summary: {
          successes: 2,
          failures: 0,
          advantages: 1,
          threats: 0,
          triumphs: 1,
          despair: 0,
        },
      };

      const formatted = formatResult(result);
      expect(formatted).toBe("2 Success(es), 1 Advantage(s), 1 Triumph(s)");
    });

    test('should return "No effects" when no results', () => {
      const result = {
        summary: {
          successes: 0,
          failures: 0,
          advantages: 0,
          threats: 0,
          triumphs: 0,
          despair: 0,
        },
      };

      const formatted = formatResult(result);
      expect(formatted).toBe("No effects");
    });
  });
});
