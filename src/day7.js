import { runProgram } from './intcode';

const amplify = (state, mode) => {
    let next = {...state};
    next.input = [...state.output];
    next.input.unshift(mode);
    next.output = [];
    next.done = false;
    return runProgram(next);
}

const getThrusterSignal = (state, setting) => {
    let output = {...state};
    state.output.push(0);
    while (setting.length) {
        output = amplify(output, setting.shift());
    }
    return output;
}

const findAllSignals = memory => {
    let settings = [0,1,2,3,4]
    let output = {};
    settings.forEach(a => {
        settings.filter(b => a !== b)
            .forEach(b => {
                settings.filter(c => a !== c && b !== c)
                    .forEach(c => {
                        settings.filter(d => a !== d && b !== d && c !== d)
                            .forEach(d => {
                                settings.filter(e => a !== e && b !== e && c !== e && d !== e)
                                    .forEach(e => {
                                        let state = {
                                            memory: [...memory],
                                            input: [0],
                                            output: [],
                                        }
                                        output['' + a + b + c + d + e] = getThrusterSignal(state, [a,b,c,d,e]).output[0];
                                    });
                            });
                    });
            });
    });
    return output
}

export { getThrusterSignal, findAllSignals };
