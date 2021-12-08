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

const find3 = (state) => {
  const ret = {...state};
  const three = Object.keys(ret.patterns)
    .filter((key) => key.length === 5)
    .filter((key) => {
      const seven = state.reverse['7'].split('');
      return seven.reduce((hasAll, c) => hasAll && key.indexOf(c) >= 0, true);
    })[0].split('').sort().join('');
  ret.patterns[three] = 3;
  ret.reverse['3'] = three;
  return ret;
}

const find9 = (state) => {
  const ret = {...state};
  const nine = Object.keys(ret.patterns)
    .filter((key) => key.length === 6)
    .filter((key) => {
      const four = state.reverse['4'].split('');
      return four.reduce((hasAll, c) => hasAll && key.indexOf(c) >= 0, true);
    })[0].split('').sort().join('');
  ret.patterns[nine] = 9;
  ret.reverse['9'] = nine;
  return ret;
}

const find5 = (state) => {
  const ret = {...state};
  const five = Object.keys(ret.patterns)
    .filter((key) => key.length === 5 && ret.patterns[key] === undefined)
    .filter((key) => {
      const five = key.split('');
      return five.reduce((hasAll, c) => hasAll && ret.reverse['9'].indexOf(c) >= 0, true);
    })[0].split('').sort().join('');
  ret.patterns[five] = 5;
  ret.reverse['5'] = five;
  return ret;
}

const find2 = (state) => {
  const ret = {...state};
  const two = Object.keys(ret.patterns)
        .filter((key) => key.length === 5 && ret.patterns[key] === undefined)[0].split('').sort().join('');
  ret.patterns[two] = 2;
  ret.reverse['2'] = two;
  return ret;
}

const find0 = (state) => {
  const ret = {...state};
  const zero = Object.keys(ret.patterns)
    .filter((key) => key.length === 6 && ret.patterns[key] === undefined)
    .filter((key) => {
      const seven = state.reverse['7'].split('');
      return seven.reduce((hasAll, c) => hasAll && key.indexOf(c) >= 0, true);
    })[0].split('').sort().join('');
  ret.patterns[zero] = 0;
  ret.reverse['0'] = zero;
  return ret;
}

const find6 = (state) => {
  const ret = {...state};
  const six = Object.keys(ret.patterns)
        .filter((key) => key.length === 6 && ret.patterns[key] === undefined)[0].split('').sort().join('');
  ret.patterns[six] = 6;
  ret.reverse['6'] = six;
  return ret;
}

const analyzePatterns = (state) => {
  let ret = {...state};
  Object.keys(ret.patterns).forEach((key) => {
    key = key.split('').sort().join('');
    switch (key.length) {
      case 2: ret.patterns[key] = 1; ret.reverse['1'] = key; break;
      case 3: ret.patterns[key] = 7; ret.reverse['7'] = key; break;
      case 4: ret.patterns[key] = 4; ret.reverse['4'] = key; break;
      case 7: ret.patterns[key] = 8; ret.reverse['8'] = key; break;
    };
  });
  ret = find3(ret);
  ret = find9(ret);
  ret = find5(ret);
  ret = find2(ret);
  ret = find0(ret);
  ret = find6(ret);
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
