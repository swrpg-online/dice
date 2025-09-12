import { parseDiceNotation } from "../src/cli";

describe("CLI Modifier Parsing", () => {
  describe("Automatic Symbol Parsing", () => {
    test("parses automatic successes", () => {
      const pool = parseDiceNotation("2g +3s");
      expect(pool.abilityDice).toBe(2);
      expect(pool.automaticSuccesses).toBe(3);
    });

    test("parses automatic failures", () => {
      const pool = parseDiceNotation("1y +2f");
      expect(pool.proficiencyDice).toBe(1);
      expect(pool.automaticFailures).toBe(2);
    });

    test("parses automatic advantages", () => {
      const pool = parseDiceNotation("3p +4a");
      expect(pool.difficultyDice).toBe(3);
      expect(pool.automaticAdvantages).toBe(4);
    });

    test("parses automatic threats", () => {
      const pool = parseDiceNotation("2r +1t");
      expect(pool.challengeDice).toBe(2);
      expect(pool.automaticThreats).toBe(1);
    });

    test("parses automatic triumphs", () => {
      const pool = parseDiceNotation("1g +2tr");
      expect(pool.abilityDice).toBe(1);
      expect(pool.automaticTriumphs).toBe(2);
    });

    test("parses automatic despairs", () => {
      const pool = parseDiceNotation("2p +1d");
      expect(pool.difficultyDice).toBe(2);
      expect(pool.automaticDespairs).toBe(1);
    });

    test("parses negative automatic symbols", () => {
      const pool = parseDiceNotation("2g -1s +3a -2t");
      expect(pool.abilityDice).toBe(2);
      expect(pool.automaticSuccesses).toBe(-1);
      expect(pool.automaticAdvantages).toBe(3);
      expect(pool.automaticThreats).toBe(-2);
    });

    test("parses long form symbol names", () => {
      const pool = parseDiceNotation(
        "+2success +1failure +3advantage +1threat +1triumph +1despair",
      );
      expect(pool.automaticSuccesses).toBe(2);
      expect(pool.automaticFailures).toBe(1);
      expect(pool.automaticAdvantages).toBe(3);
      expect(pool.automaticThreats).toBe(1);
      expect(pool.automaticTriumphs).toBe(1);
      expect(pool.automaticDespairs).toBe(1);
    });
  });

  describe("Upgrade/Downgrade Parsing", () => {
    test("parses ability upgrades", () => {
      const pool = parseDiceNotation("2g +2ua");
      expect(pool.abilityDice).toBe(2);
      expect(pool.upgradeAbility).toBe(2);
    });

    test("parses difficulty upgrades", () => {
      const pool = parseDiceNotation("3p +1ud");
      expect(pool.difficultyDice).toBe(3);
      expect(pool.upgradeDifficulty).toBe(1);
    });

    test("parses proficiency downgrades", () => {
      const pool = parseDiceNotation("3y +2dp");
      expect(pool.proficiencyDice).toBe(3);
      expect(pool.downgradeProficiency).toBe(2);
    });

    test("parses challenge downgrades", () => {
      const pool = parseDiceNotation("2r +1dc");
      expect(pool.challengeDice).toBe(2);
      expect(pool.downgradeChallenge).toBe(1);
    });

    test("parses long form upgrade/downgrade names", () => {
      const pool = parseDiceNotation(
        "+2upgradeability +1upgradedifficulty +1downgradeproficiency +2downgradechallenge",
      );
      expect(pool.upgradeAbility).toBe(2);
      expect(pool.upgradeDifficulty).toBe(1);
      expect(pool.downgradeProficiency).toBe(1);
      expect(pool.downgradeChallenge).toBe(2);
    });

    test("handles multiple upgrades and downgrades", () => {
      const pool = parseDiceNotation("+1ua +2ua +1dp");
      expect(pool.upgradeAbility).toBe(3); // 1 + 2
      expect(pool.downgradeProficiency).toBe(1);
    });
  });

  describe("Complex Notation", () => {
    test("parses mixed dice and modifiers", () => {
      const pool = parseDiceNotation("2y 1g 2p 1r +2s +1a +1ua +1ud");
      expect(pool.proficiencyDice).toBe(2);
      expect(pool.abilityDice).toBe(1);
      expect(pool.difficultyDice).toBe(2);
      expect(pool.challengeDice).toBe(1);
      expect(pool.automaticSuccesses).toBe(2);
      expect(pool.automaticAdvantages).toBe(1);
      expect(pool.upgradeAbility).toBe(1);
      expect(pool.upgradeDifficulty).toBe(1);
    });

    test("parses all dice types with all modifiers", () => {
      const pool = parseDiceNotation(
        "1y 2g 1b 1r 2p 1s 1w +1s +1f +1a +1t +1tr +1d +1ua +1ud +1dp +1dc",
      );

      // Check dice
      expect(pool.proficiencyDice).toBe(1);
      expect(pool.abilityDice).toBe(2);
      expect(pool.boostDice).toBe(1);
      expect(pool.challengeDice).toBe(1);
      expect(pool.difficultyDice).toBe(2);
      expect(pool.setBackDice).toBe(1);
      expect(pool.forceDice).toBe(1);

      // Check automatic symbols
      expect(pool.automaticSuccesses).toBe(1);
      expect(pool.automaticFailures).toBe(1);
      expect(pool.automaticAdvantages).toBe(1);
      expect(pool.automaticThreats).toBe(1);
      expect(pool.automaticTriumphs).toBe(1);
      expect(pool.automaticDespairs).toBe(1);

      // Check upgrades/downgrades
      expect(pool.upgradeAbility).toBe(1);
      expect(pool.upgradeDifficulty).toBe(1);
      expect(pool.downgradeProficiency).toBe(1);
      expect(pool.downgradeChallenge).toBe(1);
    });

    test("handles case insensitivity", () => {
      const pool = parseDiceNotation("2Y 1G +2S +1UA");
      expect(pool.proficiencyDice).toBe(2);
      expect(pool.abilityDice).toBe(1);
      expect(pool.automaticSuccesses).toBe(2);
      expect(pool.upgradeAbility).toBe(1);
    });

    test("handles extra spaces", () => {
      const pool = parseDiceNotation("  2g   1p    +3s   +2a  ");
      expect(pool.abilityDice).toBe(2);
      expect(pool.difficultyDice).toBe(1);
      expect(pool.automaticSuccesses).toBe(3);
      expect(pool.automaticAdvantages).toBe(2);
    });
  });

  describe("Error Handling", () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    test("warns on invalid modifier notation", () => {
      parseDiceNotation("+xs");
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Invalid modifier notation"),
      );
    });

    test("warns on invalid modifier type", () => {
      parseDiceNotation("+2xyz");
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Invalid modifier type"),
      );
    });

    test("continues parsing after encountering errors", () => {
      const pool = parseDiceNotation("2g +xyz 1p +2s");
      expect(pool.abilityDice).toBe(2);
      expect(pool.difficultyDice).toBe(1);
      expect(pool.automaticSuccesses).toBe(2);
    });
  });
});
