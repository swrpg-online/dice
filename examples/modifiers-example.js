const { roll, createCombatCheck, applyTalentModifiers } = require("../dist");

console.log("=== Star Wars RPG Dice Pool Modifiers Example ===\n");

// Example 1: Basic roll with automatic successes from a talent
console.log("1. Sharpshooter talent adds +1 automatic success:");
const sharpshooterPool = {
  abilityDice: 2,
  proficiencyDice: 1,
  difficultyDice: 2,
  automaticSuccesses: 1, // From Sharpshooter talent
};
const result1 = roll(sharpshooterPool);
console.log(
  `   Result: ${result1.summary.successes} successes, ${result1.summary.advantages} advantages\n`,
);

// Example 2: Weapon attachment adds automatic advantages
console.log("2. Weapon with Superior attachment adds +1 automatic advantage:");
const superiorWeaponPool = {
  abilityDice: 3,
  difficultyDice: 2,
  automaticAdvantages: 1, // From Superior weapon quality
};
const result2 = roll(superiorWeaponPool);
console.log(
  `   Result: ${result2.summary.successes} successes, ${result2.summary.advantages} advantages\n`,
);

// Example 3: Adversary talent upgrades difficulty
console.log("3. Adversary 2 upgrades difficulty twice:");
const adversaryPool = {
  abilityDice: 2,
  proficiencyDice: 1,
  difficultyDice: 3,
  upgradeDifficulty: 2, // Adversary 2 talent
};
const result3 = roll(adversaryPool);
console.log(`   Dice rolled: ${result3.results.map((r) => r.type).join(", ")}`);
console.log(
  `   Result: ${result3.summary.successes} successes, ${result3.summary.threats} threats\n`,
);

// Example 4: Aim maneuver upgrades ability
console.log("4. Aiming upgrades ability dice:");
const aimPool = {
  abilityDice: 3,
  difficultyDice: 2,
  upgradeAbility: 1, // From Aim maneuver
};
const result4 = roll(aimPool);
console.log(`   Dice rolled: ${result4.results.map((r) => r.type).join(", ")}`);
console.log(`   Result: ${result4.summary.successes} successes\n`);

// Example 5: Complex scenario with multiple modifiers
console.log("5. Complex scenario - Sniper with multiple bonuses:");
const complexPool = {
  abilityDice: 3,
  proficiencyDice: 1,
  difficultyDice: 3,
  automaticSuccesses: 1, // Sharpshooter talent
  automaticAdvantages: 1, // Superior weapon
  upgradeAbility: 2, // Two Aim maneuvers
  upgradeDifficulty: 1, // Adversary 1
};
const result5 = roll(complexPool);
console.log(`   Dice rolled: ${result5.results.map((r) => r.type).join(", ")}`);
console.log(
  `   Result: ${result5.summary.successes} successes, ${result5.summary.advantages} advantages\n`,
);

// Example 6: Using the helper function to apply talent modifiers
console.log("6. Using applyTalentModifiers helper:");
const basePool = createCombatCheck(3, 1, 1); // 3 ability, 1 proficiency, 1 boost
const talentBonus = {
  automaticSuccesses: 1,
  upgradeAbility: 1,
};
const modifiedPool = applyTalentModifiers(basePool, talentBonus);
const result6 = roll(modifiedPool);
console.log(
  `   Result: ${result6.summary.successes} successes, ${result6.summary.advantages} advantages\n`,
);

// Example 7: Downgrades from environmental effects
console.log("7. Disoriented condition downgrades proficiency:");
const disorientedPool = {
  abilityDice: 1,
  proficiencyDice: 2,
  difficultyDice: 2,
  downgradeProficiency: 1, // Disoriented condition
};
const result7 = roll(disorientedPool);
console.log(`   Dice rolled: ${result7.results.map((r) => r.type).join(", ")}`);
console.log(`   Result: ${result7.summary.successes} successes\n`);
