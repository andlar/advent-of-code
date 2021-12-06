const parseLine = (line) => {
  return line
    .split(' ')
    .filter((val) => val !== '')
    .map((val) => parseInt(val, 10));
};

const getVert = (a, b, c, d, e, val) => {
  return [a[val], b[val], c[val], d[val], e[val]];
};

const parseInput = (data) => {
  let input = [...data];
  const output = {
    boards: [],
  };
  output.numbers = input.shift()
    .split(',')
    .map((val) => parseInt(val, 10));

  while (input.length > 0) {
    input.shift();
    const line1 = parseLine(input.shift());
    const line2 = parseLine(input.shift());
    const line3 = parseLine(input.shift());
    const line4 = parseLine(input.shift());
    const line5 = parseLine(input.shift());
    const verts = [];
    for (let i = 0; i < 5; i++) {
      verts.push(getVert(line1, line2, line3, line4, line5, i));
    };
    const things = [].concat(line1).concat(line2).concat(line3).concat(line4).concat(line5).concat(verts);
    output.boards.push(things.flat());
  };
  return output;
};

const callANumber = (state) => {
  let next = {...state};
  next.lastCalled = next.numbers.shift();
  next.boards = next.boards
    .map((board) => board
         .map((val) => val === next.lastCalled ? '.' : val));
  return next;
};

const isWinning = (board) => {
  return board
    .map((val, idx, arr) => idx % 5 === 0 && val === '.' && arr[idx + 1] === '.' && arr[idx + 2] === '.' && arr[idx + 3] === '.' && arr[idx + 4] === '.')
    .reduce((ret, cur) => ret || cur);
};

const play = (state) => {
  if (state.boards.reduce((ret, board) => ret || isWinning(board), false)) {
    let winning;
    state.boards.forEach((b, idx) => {
      if (isWinning(b)) {
        winning = idx;
      }
    });
    return {
      ...state,
      scoringBoard: winning
    };
  }
  return play(callANumber(state));
};

const score = (state) => {
  return {
    ...state,
    score: state.lastCalled * state.boards[state.scoringBoard].reduce((ret, val) => ret += val !== '.' ? val : 0, 0) / 2,
  };
};

const playToLose = (state) => {
  if (state.boards.length === 1 && isWinning(state.boards[0])) {
    return {
      ...state,
      scoringBoard: 0,
    };
  }
  if (state.boards.length === 1) {
    return playToLose(callANumber(state));
  }
  return playToLose(callANumber({
    ...state,
    boards: state.boards.filter((board) => !isWinning(board)),
  }));
};

export {
  parseInput,
  callANumber,
  isWinning,
  play,
  score,
  playToLose,
};
