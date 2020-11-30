const parseSequence = input => {
    let output = input.split('').map(c => parseInt(c, 10));
    return output;
}

const calculateElement = (sequence, pattern) => {
    let output = sequence
        .map((v, idx) => v * pattern[(idx + 1) % pattern.length])
        .reduce((acc, cur) => acc + cur) % 10;
    return Math.abs(output);
}

const calculatePattern = (pattern, position) => {
    let output = pattern.reduce((acc, cur) => {
        for (let i = 0; i < position; i++) {
            acc.push(cur);
        }
        return acc;
    }, []);
    return output;
}

const calculatePhase = (input, root) => {
    let output = parseSequence(input)
        .map((val, idx, arr) => {
            let pattern = calculatePattern(root, (idx + 1));
            let element = calculateElement(arr, pattern);
            return element;
        })
        .join('');
    return output;
}

const calculatePhases = (input, root, number) => {
    let output = input;
    for (let i = 0; i < number; i++) {
        output = calculatePhase(output, root);
    }
    return output;
}

const generateFullSignal = signal => {
    let output = '';
    for (let i = 0; i < 10000; i++) {
        output += signal;
    }
    return output;
}

const getSignal = signal => {
    let offset = parseInt(signal.substring(0, 7), 10);
    return signal.substring(offset, offset + 8);
}

export { parseSequence, calculateElement, calculatePattern, calculatePhase, calculatePhases, generateFullSignal, getSignal };
