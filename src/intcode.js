const takeStep = state => {
    let nextState = {...state};
    let opcode = state.memory[state.pointer];
    let instruction = opcode % 100;
    let p1, p2, p3;
    if (Math.floor(opcode / 100) % 10 === 0) {
        p1 = nextState.memory[nextState.memory[state.pointer + 1]];
    } else {
        p1 = nextState.memory[state.pointer + 1];
    }
    if (Math.floor(opcode / 1000) % 10 === 0) {
        p2 = nextState.memory[nextState.memory[state.pointer + 2]];
    } else {
        p2 = nextState.memory[state.pointer + 2];
    }
    p3 = nextState.memory[state.pointer + 3];
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
        nextState.memory[nextState.memory[state.pointer + 1]] = nextState.input.shift();
        nextState.pointer += 2;
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
    while (!nextState.done) {
        nextState = {...takeStep(nextState)};
    }
    return nextState;
}

export { takeStep, arrayEquals, runProgram };
