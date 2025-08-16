import { hintCostDisplayText, hints } from "../src/hints";
import { SYMBOLS } from "../src/types";

describe("Hint Display System", () => {
  describe("hintCostDisplayText", () => {
    test("displays single advantage cost correctly", () => {
      const hint = {
        description: "Test hint",
        cost: {
          [SYMBOLS.ADVANTAGE]: 1,
        },
      };
      expect(hintCostDisplayText(hint)).toBe("1 Advantage");
    });

    test("displays multiple advantages cost correctly", () => {
      const hint = {
        description: "Test hint",
        cost: {
          [SYMBOLS.ADVANTAGE]: 3,
        },
      };
      expect(hintCostDisplayText(hint)).toBe("3 Advantages");
    });

    test("displays single triumph cost correctly", () => {
      const hint = {
        description: "Test hint",
        cost: {
          [SYMBOLS.TRIUMPH]: 1,
        },
      };
      expect(hintCostDisplayText(hint)).toBe("1 Triumph");
    });

    test("displays multiple triumphs cost correctly", () => {
      const hint = {
        description: "Test hint",
        cost: {
          [SYMBOLS.TRIUMPH]: 2,
        },
      };
      expect(hintCostDisplayText(hint)).toBe("2 Triumphs");
    });

    test("displays single threat cost correctly", () => {
      const hint = {
        description: "Test hint",
        cost: {
          [SYMBOLS.THREAT]: 1,
        },
      };
      expect(hintCostDisplayText(hint)).toBe("1 Threat");
    });

    test("displays multiple threats cost correctly", () => {
      const hint = {
        description: "Test hint",
        cost: {
          [SYMBOLS.THREAT]: 3,
        },
      };
      expect(hintCostDisplayText(hint)).toBe("3 Threats");
    });

    test("displays single despair cost correctly", () => {
      const hint = {
        description: "Test hint",
        cost: {
          [SYMBOLS.DESPAIR]: 1,
        },
      };
      expect(hintCostDisplayText(hint)).toBe("1 Despair");
    });

    test("displays OR conditions correctly with two options", () => {
      const hint = {
        description: "Test hint",
        cost: {
          [SYMBOLS.ADVANTAGE]: 1,
          [SYMBOLS.TRIUMPH]: 1,
        },
      };
      expect(hintCostDisplayText(hint)).toBe("1 Advantage OR 1 Triumph");
    });

    test("displays OR conditions correctly with multiple costs", () => {
      const hint = {
        description: "Test hint",
        cost: {
          [SYMBOLS.ADVANTAGE]: 2,
          [SYMBOLS.TRIUMPH]: 1,
        },
      };
      expect(hintCostDisplayText(hint)).toBe("2 Advantages OR 1 Triumph");
    });

    test("displays OR conditions correctly with threat and despair", () => {
      const hint = {
        description: "Test hint",
        cost: {
          [SYMBOLS.THREAT]: 3,
          [SYMBOLS.DESPAIR]: 1,
        },
      };
      expect(hintCostDisplayText(hint)).toBe("3 Threats OR 1 Despair");
    });

    test("handles empty cost object correctly", () => {
      const hint = {
        description: "Test hint",
        cost: {},
      };
      expect(hintCostDisplayText(hint)).toBe("No cost");
    });

    test("handles undefined cost correctly", () => {
      const hint = {
        description: "Test hint",
        cost: undefined as any,
      };
      expect(hintCostDisplayText(hint)).toBe("No cost");
    });

    test("filters out zero values from cost display", () => {
      const hint = {
        description: "Test hint",
        cost: {
          [SYMBOLS.ADVANTAGE]: 2,
          [SYMBOLS.TRIUMPH]: 0,
        },
      };
      expect(hintCostDisplayText(hint)).toBe("2 Advantages");
    });

    test("filters out undefined values from cost display", () => {
      const hint = {
        description: "Test hint",
        cost: {
          [SYMBOLS.ADVANTAGE]: 3,
          [SYMBOLS.TRIUMPH]: undefined,
        },
      };
      expect(hintCostDisplayText(hint)).toBe("3 Advantages");
    });

    test("returns 'No cost' when all values are zero", () => {
      const hint = {
        description: "Test hint",
        cost: {
          [SYMBOLS.ADVANTAGE]: 0,
          [SYMBOLS.TRIUMPH]: 0,
        },
      };
      expect(hintCostDisplayText(hint)).toBe("No cost");
    });
  });

  describe("hints data validation", () => {
    test("all hints have descriptions", () => {
      hints.forEach((hint, index) => {
        expect(hint.description).toBeTruthy();
        expect(typeof hint.description).toBe("string");
        expect(hint.description.length).toBeGreaterThan(0);
      });
    });

    test("all hints have valid cost structures", () => {
      const validSymbols = [
        SYMBOLS.ADVANTAGE,
        SYMBOLS.TRIUMPH,
        SYMBOLS.THREAT,
        SYMBOLS.DESPAIR,
      ];

      hints.forEach((hint, index) => {
        expect(hint.cost).toBeDefined();
        expect(typeof hint.cost).toBe("object");

        Object.entries(hint.cost).forEach(([symbol, value]) => {
          expect(validSymbols).toContain(symbol);
          expect(typeof value).toBe("number");
          expect(value).toBeGreaterThan(0);
        });
      });
    });

    test("hints with OR conditions have multiple cost options", () => {
      const hintsWithOrConditions = hints.filter(
        (hint) => Object.keys(hint.cost).length > 1
      );

      expect(hintsWithOrConditions.length).toBeGreaterThan(0);

      hintsWithOrConditions.forEach((hint) => {
        const costText = hintCostDisplayText(hint);
        expect(costText).toContain(" OR ");
      });
    });

    test("advantage hints are properly structured", () => {
      const advantageHints = hints.filter(
        (hint) => SYMBOLS.ADVANTAGE in hint.cost
      );

      expect(advantageHints.length).toBeGreaterThan(0);

      advantageHints.forEach((hint) => {
        const advantageCost = hint.cost[SYMBOLS.ADVANTAGE];
        expect(advantageCost).toBeGreaterThanOrEqual(1);
        expect(advantageCost).toBeLessThanOrEqual(3);
      });
    });

    test("threat hints are properly structured", () => {
      const threatHints = hints.filter(
        (hint) => SYMBOLS.THREAT in hint.cost
      );

      expect(threatHints.length).toBeGreaterThan(0);

      threatHints.forEach((hint) => {
        const threatCost = hint.cost[SYMBOLS.THREAT];
        expect(threatCost).toBeGreaterThanOrEqual(1);
        expect(threatCost).toBeLessThanOrEqual(3);
      });
    });

    test("triumph-only hints exist", () => {
      const triumphOnlyHints = hints.filter(
        (hint) =>
          Object.keys(hint.cost).length === 1 &&
          SYMBOLS.TRIUMPH in hint.cost
      );

      expect(triumphOnlyHints.length).toBeGreaterThan(0);
    });

    test("despair-only hints exist", () => {
      const despairOnlyHints = hints.filter(
        (hint) =>
          Object.keys(hint.cost).length === 1 &&
          SYMBOLS.DESPAIR in hint.cost
      );

      expect(despairOnlyHints.length).toBeGreaterThan(0);
    });
  });
});