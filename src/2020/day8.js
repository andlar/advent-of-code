const executeLine = (program, acc, ptr) => {
    if (ptr < 0 || ptr >= program.length) {
        return ({acc, ptr, terminated: true});
    }
    switch (program[ptr].split(' ')[0]) {
    case 'nop':
        return ({acc, ptr: ptr + 1});
    case 'acc':
        return ({acc: acc + parseInt(program[ptr].split(' ')[1], 10), ptr: ptr + 1});
    case 'jmp':
        return({acc, ptr: ptr + parseInt(program[ptr].split(' ')[1], 10)});
        // no default
    }
}

const findLoop = program => {
    let acc = 0;
    let lineCheck = {};
    let ptr = 0;
    let terminated = false;
    while (lineCheck[ptr] === undefined) {
        lineCheck[ptr] = true;
        let next = executeLine(program, acc, ptr);
        acc = next.acc;
        lineCheck[ptr] = next.ptr;
        ptr = next.ptr;
        terminated = next.terminated;
    }
    return ({acc, ptr, terminated});
}

const terminates = program => findLoop(program);

export { executeLine, findLoop, terminates };
