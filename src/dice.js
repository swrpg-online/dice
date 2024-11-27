"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roll = void 0;
var rollDie = function (sides) { return Math.floor(Math.random() * sides) + 1; };
var boostDieResult = function (roll) {
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
var setBackDieResult = function (roll) {
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
var abilityDieResult = function (roll) {
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
var difficultyDieResult = function (roll) {
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
var proficiencyDieResult = function (roll) {
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
var challengeDieResult = function (roll) {
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
var sumResults = function (results) {
    var sums = results.reduce(function (acc, curr) { return ({
        successes: acc.successes + curr.successes,
        failures: acc.failures + curr.failures,
        advantages: acc.advantages + curr.advantages,
        threats: acc.threats + curr.threats,
        triumphs: acc.triumphs + curr.triumphs,
        despair: acc.despair + curr.despair
    }); }, {
        successes: 0,
        failures: 0,
        advantages: 0,
        threats: 0,
        triumphs: 0,
        despair: 0
    });
    // Calculate net successes/failures
    var netSuccesses = 0;
    var netFailures = 0;
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
var roll = function (pool) {
    var _a, _b, _c, _d, _e, _f;
    // Initialize all dice counts to 0 if undefined
    var boostCount = (_a = pool.boostDice) !== null && _a !== void 0 ? _a : 0;
    var abilityCount = (_b = pool.abilityDice) !== null && _b !== void 0 ? _b : 0;
    var proficiencyCount = (_c = pool.proficiencyDice) !== null && _c !== void 0 ? _c : 0;
    var setBackCount = (_d = pool.setBackDice) !== null && _d !== void 0 ? _d : 0;
    var difficultyCount = (_e = pool.difficultyDice) !== null && _e !== void 0 ? _e : 0;
    var challengeCount = (_f = pool.challengeDice) !== null && _f !== void 0 ? _f : 0;
    // Ensure all dice counts are non-negative
    var sanitizedPool = {
        boostDice: Math.max(0, boostCount),
        abilityDice: Math.max(0, abilityCount),
        proficiencyDice: Math.max(0, proficiencyCount),
        setBackDice: Math.max(0, setBackCount),
        difficultyDice: Math.max(0, difficultyCount),
        challengeDice: Math.max(0, challengeCount)
    };
    var detailedResults = [];
    // Roll boost dice
    for (var i = 0; i < sanitizedPool.boostDice; i++) {
        var roll_1 = rollDie(6);
        detailedResults.push({
            type: 'boost',
            roll: roll_1,
            result: boostDieResult(roll_1)
        });
    }
    // Roll ability dice
    for (var i = 0; i < sanitizedPool.abilityDice; i++) {
        var roll_2 = rollDie(8);
        detailedResults.push({
            type: 'ability',
            roll: roll_2,
            result: abilityDieResult(roll_2)
        });
    }
    // Roll proficiency dice
    for (var i = 0; i < sanitizedPool.proficiencyDice; i++) {
        var roll_3 = rollDie(12);
        detailedResults.push({
            type: 'proficiency',
            roll: roll_3,
            result: proficiencyDieResult(roll_3)
        });
    }
    // Roll setback dice
    for (var i = 0; i < sanitizedPool.setBackDice; i++) {
        var roll_4 = rollDie(6);
        detailedResults.push({
            type: 'setback',
            roll: roll_4,
            result: setBackDieResult(roll_4)
        });
    }
    // Roll difficulty dice
    for (var i = 0; i < sanitizedPool.difficultyDice; i++) {
        var roll_5 = rollDie(8);
        detailedResults.push({
            type: 'difficulty',
            roll: roll_5,
            result: difficultyDieResult(roll_5)
        });
    }
    // Roll challenge dice
    for (var i = 0; i < sanitizedPool.challengeDice; i++) {
        var roll_6 = rollDie(12);
        detailedResults.push({
            type: 'challenge',
            roll: roll_6,
            result: challengeDieResult(roll_6)
        });
    }
    return {
        results: detailedResults,
        summary: sumResults(detailedResults.map(function (r) { return r.result; }))
    };
};
exports.roll = roll;
