const parseLine = (line) => {
  const [patterns, digits] = line.split(' | ');
  return {
    patterns: patterns.split(' ').reduce((arr, p) => ({...arr, [p.split('').sort().join('')]: undefined}), {}),
    digits: digits.split(' ').map((d) => d.split('').sort().join('')),
    reverse: [...Array(9).keys()].reduce((arr, k) => ({...arr, [k]: undefined}), {}),
  };
}

const countEasyOutputs = (state) => {
  return state.reduce((total, line) => total += line.digits.filter((d) => d.length === 2 || d.length === 4 || d.length === 3 || d.length === 7).length, 0);
}

const last = (arr) => arr[0];

const findNum = (state, num, len, filterFn = last) => {
  const ret = {...state};
  const target = Object.keys(ret.patterns)
        .filter((key) => key.length === len && ret.patterns[key] === undefined)
        .find(filterFn)
        .split('').sort().join('');
  ret.patterns[target] = num;
  ret.reverse[`${num}`] = target;
  return ret;
}

const findNumInMask = (state, num, len, mask) => {
  const ret = {...state};
  const target = Object.keys(ret.patterns)
        .filter((key) => key.length === len && ret.patterns[key] === undefined)
        .find((key) => state.reverse[mask].split('').reduce((hasAll, c) => hasAll && key.indexOf(c) >= 0, true))
        .split('').sort().join('');
  ret.patterns[target] = num;
  ret.reverse[`${num}`] = target;
  return ret;
}

const findMaskedNum = (state, num, len, mask) => {
  const ret = {...state};
  const target = Object.keys(ret.patterns)
        .filter((key) => key.length === len && ret.patterns[key] === undefined)
        .find((key) => key.split('').reduce((hasAll, c) => hasAll && ret.reverse[mask].indexOf(c) >= 0, true))
        .split('').sort().join('');
  ret.patterns[target] = num;
  ret.reverse[`${num}`] = target;
  return ret;
}

const analyzePatterns = (state) => {
  let ret = {...state};
  ret = findNum(ret, 1, 2);
  ret = findNum(ret, 7, 3);
  ret = findNum(ret, 4, 4);
  ret = findNum(ret, 8, 7);
  ret = findNumInMask(ret, 3, 5, '7');
  ret = findNumInMask(ret, 9, 6, '4');
  ret = findNumInMask(ret, 0, 6, '7');
  ret = findNum(ret, 6, 6);
  ret = findMaskedNum(ret, 5, 5, '9');
  ret = findNum(ret, 2, 5);
  return ret;
}

const readEntry = (state) => ({
  ...state,
  entry: parseInt(state.digits.map((d) => state.patterns[d]).join(''), 10),
});


export {
  parseLine,
  countEasyOutputs,
  analyzePatterns,
  readEntry,
};
