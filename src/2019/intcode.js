const zeroIfEmpty = val => {
    return typeof val === 'number' ? val : 0;
}

const takeStep = state => {
    let nextState = {...state};
    let opcode = state.memory[state.pointer];
    let instruction = opcode % 100;
    let p1, p2, p3;
    if (Math.floor(opcode / 100) % 10 === 0) {
        p1 = nextState.memory[nextState.memory[state.pointer + 1]];
    } else if (Math.floor(opcode / 100) % 10 === 1) {
        p1 = nextState.memory[state.pointer + 1];
    } else if (Math.floor(opcode / 100) % 10 === 2) {
        p1 = nextState.memory[nextState.memory[state.pointer + 1] + state.relativeBase];
    }
    p1 = zeroIfEmpty(p1);
    if (Math.floor(opcode / 1000) % 10 === 0) {
        p2 = nextState.memory[nextState.memory[state.pointer + 2]];
    } else if (Math.floor(opcode / 1000) % 10 === 1) {
        p2 = nextState.memory[state.pointer + 2];
    } else if (Math.floor(opcode / 1000) % 10 === 2) {
        p2 = nextState.memory[nextState.memory[state.pointer + 2] + state.relativeBase];
    }
    if (Math.floor(opcode / 10000) % 10 === 0) {
        p3 = nextState.memory[state.pointer + 3];
    } else if (Math.floor(opcode / 10000) % 10 === 2) {
        p3 = nextState.memory[state.pointer + 3] + state.relativeBase;
    } else {
        throw new Error('invalid mode');
    }
    p1 = zeroIfEmpty(p1);
    p2 = zeroIfEmpty(p2);
    switch (instruction) {
    case 1: // add
        nextState.memory[p3] = p1 + p2;
        nextState.pointer += 4;
        break;
    case 2: // multiply
        nextState.memory[p3] = p1 * p2;
        nextState.pointer += 4;
        break;
    case 3: // input
        if (nextState.input.length === 0) {
            nextState.awaitingInput = true;
        } else {
            nextState.awaitingInput = false;
            if (Math.floor(opcode / 100) % 10 === 0) {
                nextState.memory[nextState.memory[state.pointer + 1]] = nextState.input.shift();
            } else if (Math.floor(opcode / 100) % 10 === 1) {
                throw new Error('cannot write to self');
            } else if (Math.floor(opcode / 100) % 10 === 2) {
                nextState.memory[nextState.memory[state.pointer + 1] + state.relativeBase] = nextState.input.shift();
            } else {
                throw new Error('invalid mode');
            }
            nextState.pointer += 2;
        }
        break;
    case 4: // output
        nextState.output.push(p1);
        nextState.pointer += 2;
        break;
    case 5: // jump if true
        if (p1 === 0) {
            nextState.pointer += 3;
        } else {
            nextState.pointer = p2;
        }
        break;
    case 6: // jump if false
        if (p1 !== 0) {
            nextState.pointer += 3;
        } else {
            nextState.pointer = p2;
        }
        break;
    case 7: // jump if false
        nextState.memory[p3] = p1 < p2 ? 1 : 0;
        nextState.pointer += 4;
        break;
    case 8: // jump if false
        nextState.memory[p3] = p1 === p2 ? 1 : 0;
        nextState.pointer += 4;
        break;
    case 9: // updated relativeBase
        nextState.relativeBase += p1;
        nextState.pointer += 2;
        break;
    case 99: // end
        nextState.done = true;
        break;
    default:
        throw new Error('halt and catch fire');
    }
    return nextState;
}

const arrayEquals = (arr1, arr2) => arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);

const runProgram = (state) => {
    let nextState = {...state};
    nextState.pointer = 0;
    nextState.relativeBase = 0;
    return continueProgram(nextState);
}

const continueProgram = (state) => {
    let nextState = {...state};
    nextState.done = false;
    nextState.awaitingInput = false;
    while (!nextState.done && !nextState.awaitingInput) {
        nextState = {...takeStep(nextState)};
    }
    return nextState;
}

export { takeStep, arrayEquals, runProgram, continueProgram };
