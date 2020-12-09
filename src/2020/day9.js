const makesASum = (vals, sum) => vals.reduce((acc, v, idx, arr) => {
    let pos = arr.filter(a => a !== v);
    let can = pos.find(t => t + v === sum) > -1;
    return acc || can;
}, false);

const isASum = (input, preamble, idx) => {
    if (idx < preamble) { return true; }
    return makesASum(input.slice(idx - preamble, idx), input[idx])
}

const firstInvalid = (input, preamble = 5) => {
    for (let i = 0; i < input.length; i++) {
        if (!isASum(input, preamble, i)) {
            return input[i];
        }
    }
}

const findSums = (input, target) => {
    let ret = {};
    input.some((val, idx, input) => {
        let sum = val;
        let offset = 1;
        while (sum < target) {
            sum += input[idx + offset];
            offset += 1;
        };
        if (sum === target) {
            ret = {
                min: Math.min(...input.slice(idx, idx + offset)),
                max: Math.max(...input.slice(idx, idx + offset)),
            };
            return true;
        }
    });
    return ret;
}

export { makesASum, isASum, firstInvalid, findSums };
