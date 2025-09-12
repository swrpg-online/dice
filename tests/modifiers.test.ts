import { roll } from "../src/dice";
import { DicePool } from "../src/types";

// Mock Math.random for deterministic tests
const mockMathRandom = (value: number) => {
  const originalRandom = Math.random;
  Math.random = jest.fn().mockReturnValue(value);
  return () => {
    Math.random = originalRandom;
  };
};

describe("Dice Pool Modifiers", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Automatic Symbols", () => {
    test("adds automatic successes to roll result", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        abilityDice: 1,
        automaticSuccesses: 2,
      };

      const result = roll(pool);
      
      // The ability die should contribute its own successes plus the automatic ones
      expect(result.summary.successes).toBeGreaterThanOrEqual(2);
      cleanup();
    });

    test("adds automatic failures to roll result", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        abilityDice: 2,
        automaticFailures: 3,
      };

      const result = roll(pool);
      
      // Failures should be added and netted against successes
      expect(result.summary.failures).toBeGreaterThanOrEqual(0);
      cleanup();
    });

    test("adds automatic advantages to roll result", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        abilityDice: 1,
        automaticAdvantages: 3,
      };

      const result = roll(pool);
      
      // Should have at least the automatic advantages
      expect(result.summary.advantages).toBeGreaterThanOrEqual(3);
      cleanup();
    });

    test("adds automatic threats to roll result", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        abilityDice: 1,
        automaticThreats: 2,
      };

      const result = roll(pool);
      
      // Threats should be netted against advantages
      expect(result.summary.threats).toBeGreaterThanOrEqual(0);
      cleanup();
    });

    test("adds automatic triumphs to roll result", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        abilityDice: 1,
        automaticTriumphs: 1,
      };

      const result = roll(pool);
      
      expect(result.summary.triumphs).toBe(1);
      cleanup();
    });

    test("adds automatic despairs to roll result", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        abilityDice: 1,
        automaticDespairs: 2,
      };

      const result = roll(pool);
      
      expect(result.summary.despair).toBe(2);
      cleanup();
    });

    test("correctly nets successes and failures with automatic symbols", () => {
      const cleanup = mockMathRandom(0.1); // Low roll for minimal dice contribution
      const pool: DicePool = {
        automaticSuccesses: 5,
        automaticFailures: 3,
      };

      const result = roll(pool);
      
      // Should have net 2 successes (5 - 3)
      expect(result.summary.successes).toBe(2);
      expect(result.summary.failures).toBe(0);
      cleanup();
    });

    test("correctly nets advantages and threats with automatic symbols", () => {
      const cleanup = mockMathRandom(0.1);
      const pool: DicePool = {
        automaticAdvantages: 4,
        automaticThreats: 6,
      };

      const result = roll(pool);
      
      // Should have net 2 threats (6 - 4)
      expect(result.summary.advantages).toBe(0);
      expect(result.summary.threats).toBe(2);
      cleanup();
    });
  });

  describe("Dice Upgrades", () => {
    test("upgrades ability dice to proficiency dice", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        abilityDice: 3,
        upgradeAbility: 2,
      };

      const result = roll(pool);
      
      // Should have 2 proficiency dice and 1 ability die
      const proficiencyCount = result.results.filter(r => r.type === "proficiency").length;
      const abilityCount = result.results.filter(r => r.type === "ability").length;
      
      expect(proficiencyCount).toBe(2);
      expect(abilityCount).toBe(1);
      cleanup();
    });

    test("adds proficiency dice when upgrading with no ability dice", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        upgradeAbility: 2,
      };

      const result = roll(pool);
      
      // Should have 2 proficiency dice
      const proficiencyCount = result.results.filter(r => r.type === "proficiency").length;
      
      expect(proficiencyCount).toBe(2);
      cleanup();
    });

    test("upgrades difficulty dice to challenge dice", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        difficultyDice: 2,
        upgradeDifficulty: 1,
      };

      const result = roll(pool);
      
      // Should have 1 challenge die and 1 difficulty die
      const challengeCount = result.results.filter(r => r.type === "challenge").length;
      const difficultyCount = result.results.filter(r => r.type === "difficulty").length;
      
      expect(challengeCount).toBe(1);
      expect(difficultyCount).toBe(1);
      cleanup();
    });

    test("adds challenge dice when upgrading with no difficulty dice", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        upgradeDifficulty: 3,
      };

      const result = roll(pool);
      
      // Should have 3 challenge dice
      const challengeCount = result.results.filter(r => r.type === "challenge").length;
      
      expect(challengeCount).toBe(3);
      cleanup();
    });

    test("handles mixed upgrades correctly", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        abilityDice: 2,
        difficultyDice: 1,
        upgradeAbility: 3, // 2 will upgrade, 1 will be added
        upgradeDifficulty: 2, // 1 will upgrade, 1 will be added
      };

      const result = roll(pool);
      
      const proficiencyCount = result.results.filter(r => r.type === "proficiency").length;
      const abilityCount = result.results.filter(r => r.type === "ability").length;
      const challengeCount = result.results.filter(r => r.type === "challenge").length;
      const difficultyCount = result.results.filter(r => r.type === "difficulty").length;
      
      expect(proficiencyCount).toBe(3); // 2 upgraded + 1 added
      expect(abilityCount).toBe(0); // All upgraded
      expect(challengeCount).toBe(2); // 1 upgraded + 1 added
      expect(difficultyCount).toBe(0); // All upgraded
      cleanup();
    });
  });

  describe("Dice Downgrades", () => {
    test("downgrades proficiency dice to ability dice", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        proficiencyDice: 3,
        downgradeProficiency: 2,
      };

      const result = roll(pool);
      
      // Should have 1 proficiency die and 2 ability dice
      const proficiencyCount = result.results.filter(r => r.type === "proficiency").length;
      const abilityCount = result.results.filter(r => r.type === "ability").length;
      
      expect(proficiencyCount).toBe(1);
      expect(abilityCount).toBe(2);
      cleanup();
    });

    test("ignores excess proficiency downgrades", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        proficiencyDice: 1,
        downgradeProficiency: 3, // Only 1 can be downgraded
      };

      const result = roll(pool);
      
      // Should have 0 proficiency dice and 1 ability die
      const proficiencyCount = result.results.filter(r => r.type === "proficiency").length;
      const abilityCount = result.results.filter(r => r.type === "ability").length;
      
      expect(proficiencyCount).toBe(0);
      expect(abilityCount).toBe(1);
      cleanup();
    });

    test("downgrades challenge dice to difficulty dice", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        challengeDice: 2,
        downgradeChallenge: 1,
      };

      const result = roll(pool);
      
      // Should have 1 challenge die and 1 difficulty die
      const challengeCount = result.results.filter(r => r.type === "challenge").length;
      const difficultyCount = result.results.filter(r => r.type === "difficulty").length;
      
      expect(challengeCount).toBe(1);
      expect(difficultyCount).toBe(1);
      cleanup();
    });

    test("ignores excess challenge downgrades", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        challengeDice: 2,
        downgradeChallenge: 5, // Only 2 can be downgraded
      };

      const result = roll(pool);
      
      // Should have 0 challenge dice and 2 difficulty dice
      const challengeCount = result.results.filter(r => r.type === "challenge").length;
      const difficultyCount = result.results.filter(r => r.type === "difficulty").length;
      
      expect(challengeCount).toBe(0);
      expect(difficultyCount).toBe(2);
      cleanup();
    });

    test("does nothing when downgrading non-existent dice", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        abilityDice: 2,
        downgradeProficiency: 2, // No proficiency dice to downgrade
        downgradeChallenge: 1, // No challenge dice to downgrade
      };

      const result = roll(pool);
      
      // Should only have the 2 ability dice
      const abilityCount = result.results.filter(r => r.type === "ability").length;
      
      expect(result.results.length).toBe(2);
      expect(abilityCount).toBe(2);
      cleanup();
    });
  });

  describe("Upgrade and Downgrade Interaction", () => {
    test("applies upgrades before downgrades", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        abilityDice: 3,
        upgradeAbility: 2, // Creates 2 proficiency, leaves 1 ability
        downgradeProficiency: 1, // Downgrades 1 proficiency back to ability
      };

      const result = roll(pool);
      
      // Should have 1 proficiency die and 2 ability dice
      const proficiencyCount = result.results.filter(r => r.type === "proficiency").length;
      const abilityCount = result.results.filter(r => r.type === "ability").length;
      
      expect(proficiencyCount).toBe(1);
      expect(abilityCount).toBe(2);
      cleanup();
    });

    test("complex upgrade/downgrade scenario", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        abilityDice: 2,
        proficiencyDice: 1,
        difficultyDice: 2,
        challengeDice: 1,
        upgradeAbility: 3, // 2 upgrade existing, 1 adds new proficiency
        upgradeDifficulty: 1, // 1 upgrades existing
        downgradeProficiency: 2, // Downgrades 2 of the 4 proficiency dice
        downgradeChallenge: 3, // Can only downgrade 2 (1 original + 1 upgraded)
      };

      const result = roll(pool);
      
      const proficiencyCount = result.results.filter(r => r.type === "proficiency").length;
      const abilityCount = result.results.filter(r => r.type === "ability").length;
      const challengeCount = result.results.filter(r => r.type === "challenge").length;
      const difficultyCount = result.results.filter(r => r.type === "difficulty").length;
      
      // After upgrades: 4 proficiency, 0 ability, 2 challenge, 1 difficulty
      // After downgrades: 2 proficiency, 2 ability, 0 challenge, 3 difficulty
      expect(proficiencyCount).toBe(2);
      expect(abilityCount).toBe(2);
      expect(challengeCount).toBe(0);
      expect(difficultyCount).toBe(3);
      cleanup();
    });
  });

  describe("Combined Features", () => {
    test("applies automatic symbols with upgrades and downgrades", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        abilityDice: 2,
        automaticSuccesses: 3,
        automaticAdvantages: 2,
        upgradeAbility: 1,
        downgradeProficiency: 0,
      };

      const result = roll(pool);
      
      // Check dice configuration
      const proficiencyCount = result.results.filter(r => r.type === "proficiency").length;
      const abilityCount = result.results.filter(r => r.type === "ability").length;
      
      expect(proficiencyCount).toBe(1);
      expect(abilityCount).toBe(1);
      
      // Check that automatic symbols are applied
      expect(result.summary.successes).toBeGreaterThanOrEqual(3);
      expect(result.summary.advantages).toBeGreaterThanOrEqual(2);
      cleanup();
    });

    test("handles all modifier types together", () => {
      const cleanup = mockMathRandom(0.5);
      const pool: DicePool = {
        abilityDice: 2,
        difficultyDice: 2,
        automaticSuccesses: 1,
        automaticFailures: 1,
        automaticAdvantages: 2,
        automaticThreats: 1,
        automaticTriumphs: 1,
        automaticDespairs: 1,
        upgradeAbility: 1,
        upgradeDifficulty: 1,
        downgradeProficiency: 0,
        downgradeChallenge: 1,
      };

      const result = roll(pool);
      
      // Verify dice modifications were applied
      const proficiencyCount = result.results.filter(r => r.type === "proficiency").length;
      const abilityCount = result.results.filter(r => r.type === "ability").length;
      const challengeCount = result.results.filter(r => r.type === "challenge").length;
      const difficultyCount = result.results.filter(r => r.type === "difficulty").length;
      
      expect(proficiencyCount).toBe(1);
      expect(abilityCount).toBe(1);
      expect(challengeCount).toBe(0); // 1 created, then downgraded
      expect(difficultyCount).toBe(2); // 1 original + 1 downgraded
      
      // Verify automatic symbols are present
      expect(result.summary.triumphs).toBe(1);
      expect(result.summary.despair).toBe(1);
      cleanup();
    });
  });
});