const parseInput = (input) => {
  const state = {
    counts: {},
    rules: {},
    last: input[0].slice(-1),
  };
  input[0].split('')
    .forEach((val, idx, arr) => {
      if (idx !== arr.length - 1) {
        state.counts[`${val}${arr[idx + 1]}`] = (state.counts[`${val}${arr[idx + 1]}`] ?? 0) + 1;
      }
    });
  input.filter((line) => line.includes('->'))
    .forEach((line) => {
      const [key, out] = line.split(' -> ');
      const [start, finish] = key.split('');
      state.rules[key] = [`${start}${out}`, `${out}${finish}`];
    });
  return state;
};

const step = (state) => {
  const next = {
    ...state,
    counts: {},
  };
  Object.entries(state.counts).forEach(([key, value]) => {
    state.rules[key].forEach((out) => {
      next.counts[out] = (next.counts[out] ?? 0) + value;
    });
  });
  return next;
};

const count = (state) => {
  let counts = {
  };
  counts[state.last] = 1;
  Object.entries(state.counts).forEach(([key, value]) => {
    const val = key.charAt(0);
    counts[val] = (counts[val] ?? 0) + value;
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
