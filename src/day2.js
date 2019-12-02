const takeStep = (codes, index) => {
    let nextStep = codes.slice();
    switch (nextStep[index]) {
    case 1:
        nextStep[nextStep[index + 3]] = nextStep[nextStep[index + 1]] + nextStep[nextStep[index + 2]];
        break;
    case 2:
        nextStep[nextStep[index + 3]] = nextStep[nextStep[index + 1]] * nextStep[nextStep[index + 2]];
        break;
    case 99:
        return {done: true, codes: nextStep};
    default:
        throw new Error('halt and catch fire');
    }
    return nextStep;
}

const arrayEquals = (array1, array2) => array1.length === array2.length && array1.every((value, index) => value === array2[index]);

const calculateSteps = (codes) => {
    let index = 0;
    let prevStep = codes.slice();
    let nextStep = takeStep(prevStep, index);
    while (!nextStep.done) {
        index += 4;
        prevStep = nextStep.slice();
        nextStep = takeStep(prevStep, index);
    }
    return nextStep;
}

const findInputs = (memory, target) => {
    let data = {
        noun: 12,
        verb: 2
    };
    for (data.noun = 0; data.noun <= 99; data.noun++) {
        for (data.verb = 0; data.verb <= 99; data.verb++) {
            try {
                let input = memory.slice();
                input[1] = data.noun;
                input[2] = data.verb;
                let codes = calculateSteps(input);
                if (codes.codes[0] === target) {
                    console.log(codes.codes[0], data.noun, data.verb, data.noun * 100 + data.verb);
                    return data;
                }
            } catch (e) {
                //console.error(e, i, j);
            }
       }
    }
}
export { takeStep, arrayEquals, calculateSteps, findInputs };
