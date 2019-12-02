import { calculateSteps } from './intcode';

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
export { findInputs };
