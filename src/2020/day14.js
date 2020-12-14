const updateMask = (state, line) => ({...state, mask: line.split('= ')[1] });

const writeToMemory = (state, line) => {
    let next = {...state};
    let location = parseInt(line.split('[')[1], 10);
    let value = parseInt(line.split('= ')[1], 10).toString(2);
    let masked =
        state.mask.split('').map((m, idx) => {
        if (m === 'X') {
            if (36 - idx <= value.length) {
                return value[value.length - (36 - idx)];
            } else {
                return 0;
            }
        } else {
            return m;
        }
        }).join('');
    next.memory[location] = parseInt(masked, 2);
    return next;
};

const settle = mask => {
    let locations = [mask];
    while (locations[0].indexOf('X') !== -1) {
        locations = locations.flatMap(loc => [loc.replace(/X/, 0), loc.replace(/X/, 1)]);
    }
    return locations;
}
const writeFloating = (state, line) => {
    let next = {...state};
    let location = parseInt(line.split('[')[1], 10).toString(2);
    let value = parseInt(line.split('= ')[1], 10);
    let masked =
        state.mask.split('').map((m, idx) => {
        if (m === '0') {
            if (36 - idx <= location.length) {
                return location[location.length - (36 - idx)];
            } else {
                return 0;
            }
        } if (m === '1') {
            return 1
        } else {
            return 'X';
        }
        }).join('');
    let locations = settle(masked);
    locations.forEach(location => next.memory[parseInt(location, 2)] = value);
    return next;
};

const runProgram = (program, writer = writeToMemory) => {
    let state = {
        mask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        memory: {},
    };
    program.forEach(line => {
        if (line.indexOf('mask') >= 0) {
            state = updateMask(state, line);
        } else {
            state = writer(state, line);
        }
    });
    return state;
}

const findOutput = state => Object.keys(state.memory).reduce((acc, key) => acc + state.memory[key], 0);

export { updateMask, writeToMemory, writeFloating, runProgram, findOutput };
