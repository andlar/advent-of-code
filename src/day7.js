import { runProgram, continueProgram } from './intcode';

const amplify = (state, mode) => {
    let next = {...state};
    next.input = [...state.output];
    next.input.unshift(mode);
    next.output = [];
    next.done = false;
    return runProgram(next);
}

const getThrusterSignal = (memory, setting) => {
    let state = {
        memory: [...memory],
        input: [0],
        output: [],
                                        }
    let output = {...state};
    state.output.push(0);
    while (setting.length) {
        output = amplify(output, setting.shift());
    }
    return output;
}

const findAllSignals = memory => {
    return testInputs(memory, [0,1,2,3,4], getThrusterSignal);
}

const testInputs = (memory, settings, fun) => {
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
                                        output['' + a + b + c + d + e] = fun(memory, [a,b,c,d,e]).output[0];
                                    });
                            });
                    });
            });
    });
    return output
}

const sendOutputToInput = (a, b) => {
    b.input = [...a.output];
    a.output = [];
}

const getFeedbackSignal = (memory, setting) => {
    let state = {
        input: [],
        output: [],
    }
    let ampA = {
        input: [setting.shift(), 0],
        output: [],
        memory: [...memory],
    }
    let ampB = {
        input: [setting.shift()],
        output: [],
        memory: [...memory],
    }
    let ampC = {
        input: [setting.shift()],
        output: [],
        memory: [...memory],
    }
    let ampD = {
        input: [setting.shift()],
        output: [],
        memory: [...memory],
    }
    let ampE = {
        input: [setting.shift()],
        output: [],
        memory: [...memory],
    }
    ampA = runProgram(ampA);
    ampB = runProgram(ampB);
    ampC = runProgram(ampC);
    ampD = runProgram(ampD);
    ampE = runProgram(ampE);
    while (!ampA.done && !ampB.done && !ampC.done && !ampD.done && !ampE.done) {
        ampA = continueProgram(ampA);
        sendOutputToInput(ampA, ampB);
        ampB = continueProgram(ampB);
        sendOutputToInput(ampB, ampC);
        ampC = continueProgram(ampC);
        sendOutputToInput(ampC, ampD);
        ampD = continueProgram(ampD);
        sendOutputToInput(ampD, ampE);
        ampE = continueProgram(ampE);
        if (!ampE.done) {
            sendOutputToInput(ampE, ampA);
        }
    }
    return ampE;
}

const findFeedbackSignals = memory => {
    return testInputs(memory, [5,6,7,8,9], getFeedbackSignal);
}

export { getThrusterSignal, findAllSignals, getFeedbackSignal, findFeedbackSignals };
