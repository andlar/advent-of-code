const makesASum = (vals, sum) => vals
      .reduce((acc, v, idx, arr) => acc || arr
              .filter(a => a !== v)
              .find(t => t + v === sum) > -1,
              false);

const isASum = (input, idx, preamble = 5) => (idx < preamble)
      || makesASum(input.slice(idx - preamble, idx), input[idx]);


const firstInvalid = (input, preamble = 5) => input.find((val, idx, arr) => !isASum(arr, idx, preamble));

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
            let min = Math.min(...input.slice(idx, idx + offset));
            let max = Math.max(...input.slice(idx, idx + offset));
            ret = {min, max, total: min + max};
            return true;
        }
    });
    return ret;
}

export { makesASum, isASum, firstInvalid, findSums };
