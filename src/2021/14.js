const parseInput = (input) => {
  const state = {
    template: input[0],
    rules: {},
  };
  input
    .filter((line) => line.includes('->'))
    .forEach((line) => {
      const [key, out] = line.split(' -> ');
      state.rules[key] = out;
    });
  return state;
};

const step = (state) => {
  const next = {
    ...state,
    template: state.template
      .split('')
      .flatMap((input, idx, arr) => ([
        input,
        state.rules[`${input}${arr[idx + 1]}`],
      ]))
      .join(''),
  };
  return next;
};

const count = (state) => {
  let counts = {};
  state.template.split('')
    .forEach((val) => {
      counts[val] = (counts[val] ?? 0) + 1;
    });
  return counts;
}

const getScore = (counts) => {
  let max = 0;
  let min = Number.MAX_VALUE;
  Object.keys(counts).forEach((key) => {
    max = Math.max(max, counts[key]);
    min = Math.min(min, counts[key]);
  });
  return max - min;
};

export {
  parseInput,
  step,
  count,
  getScore,
};
