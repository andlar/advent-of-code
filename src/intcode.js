const takeStep = (memory, pointer) => {
    let nextStep = memory.slice();
    let opcode = nextStep[pointer];
    switch (opcode) {
    case 1:
        nextStep[nextStep[pointer + 3]] = nextStep[nextStep[pointer + 1]] + nextStep[nextStep[pointer + 2]];
        break;
    case 2:
        nextStep[nextStep[pointer + 3]] = nextStep[nextStep[pointer + 1]] * nextStep[nextStep[pointer + 2]];
        break;
    case 99:
        return {done: true, codes: nextStep};
    default:
        throw new Error('halt and catch fire');
    }
    return nextStep;
}

const arrayEquals = (arr1, arr2) => arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);

const calculateSteps = (memory) => {
    let pointer = 0;
    let prevStep = memory.slice();
    let nextStep = takeStep(prevStep, pointer);
    while (!nextStep.done) {
        pointer += 4;
        prevStep = nextStep.slice();
        nextStep = takeStep(prevStep, pointer);
    }
    return nextStep;
}

export { takeStep, arrayEquals, calculateSteps };
