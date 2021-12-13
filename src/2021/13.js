const parseInput = (input) => {
  const state = {
    dots: new Set(
      input
        .filter((line) => line.includes(','))),
    folds: input
      .filter((line) => line.includes('fold'))
      .map((line) => {
        const vals = line.split(' ');
        const fold = vals[2].split('=');
        return {
          direction: fold[0],
          line: parseInt(fold[1], 10),
        };
      }),
    maxX: 0,
    maxY: 0,
  }
  state.dots.forEach((dot) => {
    const vals = dot.split(',');
    const x = parseInt(vals[0], 10);
    const y = parseInt(vals[1], 10);
    state.maxX = Math.max(x + 1, state.maxX);
    state.maxY = Math.max(y + 1, state.maxY);
  });
  return state;
};

const drawMap = (state) => {
  let out = [];
  for (let i = 0; i < state.maxX * state.maxY; i++) {
    const x = i % state.maxX;
    const y = Math.trunc(i / state.maxX);
    let ret;
    if (state.dots.has(`${x},${y}`)) {
      ret = '#';
    } else {
      ret = '.';
    }
    if (x === state.maxX - 1) {
      ret += '\n';
    }
    out[i] = ret;
  }
  return out.join('');
};

const fold = (state) => {
  let next = {
    ...state,
    dots: new Set(),
    folds: state.folds.slice(1),
    maxX: 0,
    maxY: 0,
  };
  const { direction, line } = state.folds[0];
  state.dots.forEach((dot) => {
    const vals = dot.split(',');
    let x = parseInt(vals[0], 10);
    let y = parseInt(vals[1], 10);
    let diff;
    if (direction === 'y') {
      if (y > line) {
        diff = y - line;
        y = y - diff - diff;
      }
    }
    if (direction === 'x') {
      if (x > line) {
        diff = x - line;
        x = x - diff - diff;
      }
    }
    next.dots.add(`${x},${y}`)
    next.maxX = Math.max(x + 1, next.maxX);
    next.maxY = Math.max(y + 1, next.maxY);
  });
  return next;
};

const getCode = (state) => state.folds.length > 0 ? getCode(fold(state)) : state;

export {
  parseInput,
  drawMap,
  fold,
  getCode,
};
