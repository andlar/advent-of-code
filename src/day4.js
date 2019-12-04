const hasAdjacent = code => {
    let passes = false;
    for (let i = 0; i < 5; i++) {
        passes = passes || (code + '').substring(i, i+1) === (code + '').substring(i+1, i+2);
    }
    return passes;
}

const containsPair = code => {
    let testval = '-' + code + '-'
    let passes = false;
    for (let i = 1; i < 6; i++) {
        passes = passes || (
            ((testval + '').substring(i, i+1) === (testval + '').substring(i+1, i+2))
                && ((testval + '').substring(i, i+1) !== (testval + '').substring(i+2, i+3))
                && ((testval + '').substring(i-1, i) !== (testval + '').substring(i, i+1))
        );
    }
    return passes;
}

const increases = code => {
    let passes = true;
    for (let i = 0; i < 5; i++) {
        passes = passes && (parseInt((code + '').substring(i, i+1), 10) <= parseInt((code + '').substring(i+1, i+2), 10));
    }
    return passes;
}

const findPossibles = (start, end) => {
    let possibles = [];
    for (let code = start; code <= end; code ++) {
        if (hasAdjacent(code) && increases(code)) {
            possibles.push(code);
        }
    }
    return possibles;
}

const findPossiblesWithPairs = (start, end) => {
    let possibles = [];
    for (let code = start; code <= end; code ++) {
        if (hasAdjacent(code) && increases(code) && containsPair(code)) {
            possibles.push(code);
        }
    }
    return possibles;
}

export { hasAdjacent, containsPair, increases, findPossibles, findPossiblesWithPairs };
