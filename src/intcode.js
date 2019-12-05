const takeStep = state => {
    let nextState = {...state};
    let opcode = state.memory[state.pointer];
    switch (opcode) {
    case 1:
        nextState.memory[nextState.memory[state.pointer + 3]] = nextState.memory[nextState.memory[state.pointer + 1]] + nextState.memory[nextState.memory[state.pointer + 2]];
        nextState.pointer += 4;
        break;
    case 2:
        nextState.memory[nextState.memory[state.pointer + 3]] = nextState.memory[nextState.memory[state.pointer + 1]] * nextState.memory[nextState.memory[state.pointer + 2]];
        nextState.pointer += 4;
        break;
    case 3:
        nextState.memory[nextState.memory[state.pointer + 1]] = nextState.input.shift();
        nextState.pointer += 2;
        break;
    case 4:
        nextState.output.push(nextState.memory[nextState.memory[state.pointer + 1]]);
        nextState.pointer += 2;
        break;
    case 99:
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
