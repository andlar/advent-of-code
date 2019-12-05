import { runProgram } from './intcode';

const findInputs = (memory, target) => {
    let data = {
        noun: 12,
        verb: 2
    };
    for (data.noun = 0; data.noun <= 99; data.noun++) {
        for (data.verb = 0; data.verb <= 99; data.verb++) {
            try {
                let state = {
                    memory: [...memory],
                    pointer: 0,
                }
                state.memory[1] = data.noun;
                state.memory[2] = data.verb;
                let endState = runProgram(state);
                if (endState.memory[0] === target) {
                    //console.log(endState.memory[0], data.noun, data.verb, data.noun * 100 + data.verb);
                    return data;
                }
            } catch (e) {
                //console.error(e, i, j);
            }
       }
    }
}
export { findInputs };
