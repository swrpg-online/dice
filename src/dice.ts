import { DicePool, RollResult, DiceResult, DetailedDieResult } from './types';

const rollDie = (sides: number): number => Math.floor(Math.random() * sides) + 1;

const boostDieResult = (roll: number): DiceResult => {
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

const setBackDieResult = (roll: number): DiceResult => {
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

const abilityDieResult = (roll: number): DiceResult => {
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

const difficultyDieResult = (roll: number): DiceResult => {
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

const proficiencyDieResult = (roll: number): DiceResult => {
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

const challengeDieResult = (roll: number): DiceResult => {
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

const sumResults = (results: DiceResult[]): DiceResult => {
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
    } else if (sums.successes > sums.failures) {
        netSuccesses = sums.successes - sums.failures;
    } else {
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

export const roll = (pool: DicePool): RollResult => {
    // Initialize all dice counts to 0 if undefined
    const boostCount = pool.boostDice ?? 0;
    const abilityCount = pool.abilityDice ?? 0;
    const proficiencyCount = pool.proficiencyDice ?? 0;
    const setBackCount = pool.setBackDice ?? 0;
    const difficultyCount = pool.difficultyDice ?? 0;
    const challengeCount = pool.challengeDice ?? 0;

    // Ensure all dice counts are non-negative
    const sanitizedPool = {
        boostDice: Math.max(0, boostCount),
        abilityDice: Math.max(0, abilityCount),
        proficiencyDice: Math.max(0, proficiencyCount),
        setBackDice: Math.max(0, setBackCount),
        difficultyDice: Math.max(0, difficultyCount),
        challengeDice: Math.max(0, challengeCount)
    };
    
    const detailedResults: DetailedDieResult[] = [];

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
