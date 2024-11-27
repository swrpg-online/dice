"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roll = void 0;
const rollDie = (sides) => Math.floor(Math.random() * sides) + 1;
const boostDieResult = (roll) => {
    switch (roll) {
        case 3:
            return { successes: 1, failures: 0, advantages: 0, threats: 0, triumphs: 0, despair: 0 };
        case 4:
            return { successes: 1, failures: 0, advantages: 1, threats: 0, triumphs: 0, despair: 0 };
        case 5:
            return { successes: 0, failures: 0, advantages: 2, threats: 0, triumphs: 0, despair: 0 };
        case 6:
            return { successes: 0, failures: 0, advantages: 1, threats: 0, triumphs: 0, despair: 0 };
        default:
            return { successes: 0, failures: 0, advantages: 0, threats: 0, triumphs: 0, despair: 0 };
    }
};
const setBackDieResult = (roll) => {
    switch (roll) {
        case 3:
        case 4:
            return { successes: 0, failures: 1, advantages: 0, threats: 0, triumphs: 0, despair: 0 };
        case 5:
        case 6:
            return { successes: 0, failures: 0, advantages: 0, threats: 1, triumphs: 0, despair: 0 };
        default:
            return { successes: 0, failures: 0, advantages: 0, threats: 0, triumphs: 0, despair: 0 };
    }
};
const abilityDieResult = (roll) => {
    switch (roll) {
        case 2:
        case 3:
            return { successes: 1, failures: 0, advantages: 0, threats: 0, triumphs: 0, despair: 0 };
        case 4:
            return { successes: 2, failures: 0, advantages: 0, threats: 0, triumphs: 0, despair: 0 };
        case 5:
        case 6:
            return { successes: 0, failures: 0, advantages: 1, threats: 0, triumphs: 0, despair: 0 };
        case 7:
            return { successes: 1, failures: 0, advantages: 1, threats: 0, triumphs: 0, despair: 0 };
        case 8:
            return { successes: 0, failures: 0, advantages: 2, threats: 0, triumphs: 0, despair: 0 };
        default:
            return { successes: 0, failures: 0, advantages: 0, threats: 0, triumphs: 0, despair: 0 };
    }
};
const difficultyDieResult = (roll) => {
    switch (roll) {
        case 2:
            return { successes: 0, failures: 1, advantages: 0, threats: 0, triumphs: 0, despair: 0 };
        case 3:
            return { successes: 0, failures: 2, advantages: 0, threats: 0, triumphs: 0, despair: 0 };
        case 4:
        case 5:
        case 6:
            return { successes: 0, failures: 0, advantages: 0, threats: 1, triumphs: 0, despair: 0 };
        case 7:
            return { successes: 0, failures: 0, advantages: 0, threats: 2, triumphs: 0, despair: 0 };
        case 8:
            return { successes: 0, failures: 1, advantages: 0, threats: 1, triumphs: 0, despair: 0 };
        default:
            return { successes: 0, failures: 0, advantages: 0, threats: 0, triumphs: 0, despair: 0 };
    }
};
const proficiencyDieResult = (roll) => {
    switch (roll) {
        case 2:
        case 3:
            return { successes: 1, failures: 0, advantages: 0, threats: 0, triumphs: 0, despair: 0 };
        case 4:
        case 5:
            return { successes: 2, failures: 0, advantages: 0, threats: 0, triumphs: 0, despair: 0 };
        case 6:
            return { successes: 0, failures: 0, advantages: 1, threats: 0, triumphs: 0, despair: 0 };
        case 7:
        case 8:
        case 9:
            return { successes: 1, failures: 0, advantages: 1, threats: 0, triumphs: 0, despair: 0 };
        case 10:
        case 11:
            return { successes: 0, failures: 0, advantages: 2, threats: 0, triumphs: 0, despair: 0 };
        case 12:
            return { successes: 0, failures: 0, advantages: 0, threats: 0, triumphs: 1, despair: 0 };
        default:
            return { successes: 0, failures: 0, advantages: 0, threats: 0, triumphs: 0, despair: 0 };
    }
};
const challengeDieResult = (roll) => {
    switch (roll) {
        case 2:
        case 3:
            return { successes: 0, failures: 1, advantages: 0, threats: 0, triumphs: 0, despair: 0 };
        case 4:
        case 5:
            return { successes: 0, failures: 2, advantages: 0, threats: 0, triumphs: 0, despair: 0 };
        case 6:
        case 7:
            return { successes: 0, failures: 0, advantages: 0, threats: 1, triumphs: 0, despair: 0 };
        case 8:
        case 9:
            return { successes: 0, failures: 1, advantages: 0, threats: 1, triumphs: 0, despair: 0 };
        case 10:
        case 11:
            return { successes: 0, failures: 0, advantages: 0, threats: 2, triumphs: 0, despair: 0 };
        case 12:
            return { successes: 0, failures: 0, advantages: 0, threats: 0, triumphs: 0, despair: 1 };
        default:
            return { successes: 0, failures: 0, advantages: 0, threats: 0, triumphs: 0, despair: 0 };
    }
};
const sumResults = (results) => {
    const sums = results.reduce((acc, curr) => ({
        successes: acc.successes + curr.successes,
        failures: acc.failures + curr.failures,
        advantages: acc.advantages + curr.advantages,
        threats: acc.threats + curr.threats,
        triumphs: acc.triumphs + curr.triumphs,
        despair: acc.despair + curr.despair
    }), {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0
    });
    // Calculate net successes/failures
    let netSuccesses = 0;
    let netFailures = 0;
    if (sums.successes === sums.failures) {
        netSuccesses = 0;
        netFailures = 0;
    }
    else if (sums.successes > sums.failures) {
        netSuccesses = sums.successes - sums.failures;
    }
    else {
        netFailures = sums.failures - sums.successes;
    }
    return {
        successes: netSuccesses,
        failures: netFailures,
        advantages: sums.advantages,
        threats: sums.threats,
        triumphs: sums.triumphs,
        despair: sums.despair
    };
};
const roll = (pool) => {
    var _a, _b, _c, _d, _e, _f;
    // Initialize all dice counts to 0 if undefined
    const boostCount = (_a = pool.boostDice) !== null && _a !== void 0 ? _a : 0;
    const abilityCount = (_b = pool.abilityDice) !== null && _b !== void 0 ? _b : 0;
    const proficiencyCount = (_c = pool.proficiencyDice) !== null && _c !== void 0 ? _c : 0;
    const setBackCount = (_d = pool.setBackDice) !== null && _d !== void 0 ? _d : 0;
    const difficultyCount = (_e = pool.difficultyDice) !== null && _e !== void 0 ? _e : 0;
    const challengeCount = (_f = pool.challengeDice) !== null && _f !== void 0 ? _f : 0;
    // Ensure all dice counts are non-negative
    const sanitizedPool = {
        boostDice: Math.max(0, boostCount),
        abilityDice: Math.max(0, abilityCount),
        proficiencyDice: Math.max(0, proficiencyCount),
        setBackDice: Math.max(0, setBackCount),
        difficultyDice: Math.max(0, difficultyCount),
        challengeDice: Math.max(0, challengeCount)
    };
    const detailedResults = [];
    // Roll boost dice
    for (let i = 0; i < sanitizedPool.boostDice; i++) {
        const roll = rollDie(6);
        detailedResults.push({
            type: 'boost',
            roll,
            result: boostDieResult(roll)
        });
    }
    // Roll ability dice
    for (let i = 0; i < sanitizedPool.abilityDice; i++) {
        const roll = rollDie(8);
        detailedResults.push({
            type: 'ability',
            roll,
            result: abilityDieResult(roll)
        });
    }
    // Roll proficiency dice
    for (let i = 0; i < sanitizedPool.proficiencyDice; i++) {
        const roll = rollDie(12);
        detailedResults.push({
            type: 'proficiency',
            roll,
            result: proficiencyDieResult(roll)
        });
    }
    // Roll setback dice
    for (let i = 0; i < sanitizedPool.setBackDice; i++) {
        const roll = rollDie(6);
        detailedResults.push({
            type: 'setback',
            roll,
            result: setBackDieResult(roll)
        });
    }
    // Roll difficulty dice
    for (let i = 0; i < sanitizedPool.difficultyDice; i++) {
        const roll = rollDie(8);
        detailedResults.push({
            type: 'difficulty',
            roll,
            result: difficultyDieResult(roll)
        });
    }
    // Roll challenge dice
    for (let i = 0; i < sanitizedPool.challengeDice; i++) {
        const roll = rollDie(12);
        detailedResults.push({
            type: 'challenge',
            roll,
            result: challengeDieResult(roll)
        });
    }
    return {
        results: detailedResults,
        summary: sumResults(detailedResults.map(r => r.result))
    };
};
exports.roll = roll;
