const parseReactions = data => {
    let output = {};
    data.forEach(line => {
        output = {...parseReaction(line), ...output};
    });
    return findDistance(output);
}

const parseReaction = line => {
    let output = {}
    let elements = line.split('=>').map(s => s.trim());
    let out = elements[1].split(' ').map(s => s.trim());
    output[out[1]] = {
        output: parseInt(out[0], 10),
        input: elements[0].split(',').map(s => s.trim()).map(s => {
            let parts = s.split(' ');
            let ret = {
                element: parts[1],
                value: parseInt(parts[0], 10),
            }
            return ret;
        }),
    };
    return output;
}

const findDistance = reactions => {
    let output = {};
    Object.keys(reactions).forEach(r => {
        output[r] = {
            distance: getDistance(reactions[r], reactions),
            ...reactions[r],
        };
    });
    return output;
}

const getDistance = (reaction, reactions) => {
    if (reaction.input[0].element === 'ORE') {
        return 1;
    }
    return 1 + reaction.input.reduce((acc, reaction) => Math.max(acc, getDistance(reactions[reaction.element], reactions)), 1);
}

const decompose = (state, reactions) => {
    let nextState = {};
    let highest = highestRank(state, reactions);
    Object
        .keys(state)
        .forEach(element => {
            if (reactions[element].distance !== highest) {
                if (!nextState[element]) {
                    nextState[element] = 0;
                }
                nextState[element] += state[element];
            } else {
                if (reactions[element].input[0].element === 'ORE') {
                    if (!nextState[element]) {
                        nextState[element] = 0;
                    }
                    nextState[element] += state[element];
                } else {
                    reactions[element].input.forEach(input => {
                        if (!nextState[input.element]) {
                            nextState[input.element] = 0;
                        }
                        nextState[input.element] += atLeastOne(state[element], reactions[element].output) * input.value;
                    });
                }
            }
        });
    return nextState;
}

const atLeastOne = (num, den) => {
    let response = Math.floor(num / den);
    if (num % den !== 0) {
        response += 1;
    }
    return response;
}

const moreToDo = (state, reactions) => {
    return Object.keys(state).reduce((acc, cur) => acc || reactions[cur].input[0].element !== 'ORE', false);
}

const highestRank = (state, reactions) => {
    return Object
        .keys(state)
        .map(key => reactions[key].distance)
        .reduce((a, b) => Math.max(a, b));
}

const reduce = (state, reactions) => {
    let endState = {...state};
    while (moreToDo(endState, reactions)) {
        endState = decompose(endState, reactions);
    }
    return endState;
}

const getOreNeeds = (state, reactions) => {
    let needs = Object.keys(state).reduce((ore, element) => {
        let nextOre = atLeastOne(state[element], reactions[element].output) * reactions[element].input[0].value;
        return ore + nextOre;
    }, 0);
    return needs;
}

const getMaxFuel = (maxOre, reactions) => {
    let minFuel = 0, maxFuel = maxOre, testFuel, ore, state;
    while (minFuel + 1 < maxFuel) {
    //for (let i = 0; i < 55; i++) {
        testFuel = minFuel + Math.floor(Math.random() * (maxFuel - minFuel));
        state = {FUEL: testFuel};
        state = reduce(state, reactions);
        ore = getOreNeeds(state, reactions);
        //console.log('min: ' + minFuel, ', max: ' + maxFuel, ', tested: ' + testFuel, ', ore: ' + ore, ', difference: ' + (maxOre - ore));
        if (ore > maxOre) {
            maxFuel = testFuel;
        } else {
            minFuel = testFuel;
        }
    }
    return minFuel;
}

export { parseReactions, findDistance, decompose, moreToDo, highestRank, reduce, getOreNeeds, getMaxFuel };
