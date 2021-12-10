const dropChunk = (state) => {
  const out = {
    ...state,
  }
  const start = state.data.length;
  out.data = out.data.replace(/\(\)|\[\]|\{\}|<>|\n\n/gm, '');
  const end = out.data.length;
  out.done = start === end;
  return out;
};

const getCorruptionScore = (state) => {
  const regex = /\)|\]|\}|>/;
  const values = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };
  const score = state.data
        .split('\n')
        .filter((line) => regex.test(line))
        .map((line) => line[line.search(regex)])
        .map((char) => values[char])
        .reduce((total, value) => total + value, 0);
  return score;
};

const findCorruptionScore = (state) => {
  if (state.done) {
    return getCorruptionScore(state);
  }
  const next = dropChunk(state);
  return findCorruptionScore(next);
}

const getLineCompletionScore = (line) => {
  const values = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
  };
  let input = line;
  let output = 0;
  while (input.length > 0) {
    const scoring = input.charAt(input.length - 1);
    const value = values[scoring];
    output = ((output * 5) + value);
    input = input.substring(0, input.length - 1);
  }
  return output;
};

const getCompletionScore = (state) => {
  const corrupt = /\)|\]|\}|>/;
  const score = state.data
        .split('\n')
        .filter((line) => !corrupt.test(line))
        .map((line) => getLineCompletionScore(line))
        .sort((a, b) => a - b);
  return score[(score.length - 1) / 2];
};

const findCompletionScore = (state) => {
  if (state.done) {
    return getCompletionScore(state);
  }
  const next = dropChunk(state);
  return findCompletionScore(next);
}

export {
  findCorruptionScore,
  findCompletionScore,
  getLineCompletionScore,
};
