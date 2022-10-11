const parseInput = (input) => {
  const state = {
    east: new Set(),
    south: new Set(),
    width: input[0].length,
    height: input.length,
  };
  input.forEach((row, y) => {
    row.split('').forEach((cell, x) => {
      if (cell === '>') {
        state.east.add(`${x},${y}`);
      }
      if (cell === 'v') {
        state.south.add(`${x},${y}`);
      }
    })
  });
  return state;
};

const print = (state) => {
  let out = '';
  for (let y = 0; y < state.height; y++) {
    for (let x = 0; x < state.width; x++) {
      const point = `${x},${y}`;
      out += state.east.has(point) ? '>' : (state.south.has(point) ? 'v' : '.');
    }
    out += '\n';
  }
  return out;
};

const isEmpty = (state, x, y) => {
  const point = `${x},${y}`;
  return !state.east.has(point) && !state.south.has(point);
};

const step = (state) => {
  let first = {
    ...state,
    east: new Set(),
    moved: false,
  };
  state.east.forEach((point) => {
    const [x, y] = point.split(',').map((v) => parseInt(v, 10));
    if (isEmpty(state, (x + 1) % state.width, y)) {
      first.east.add(`${(x + 1) % state.width},${y}`);
      first.moved = true;
    } else {
      first.east.add(`${x},${y}`);
    }
  })
  let second = {
    ...first,
    south: new Set(),
  }
  first.south.forEach((point) => {
    const [x, y] = point.split(',');
    if (isEmpty(first, x, (y + 1) % state.height)) {
      second.south.add(`${x},${(y + 1) % state.height}`);
      second.moved = true;
    } else {
      second.south.add(`${x},${y}`);
    }
  })
  return second;
};

const settle = (state) => {
  let next = step(state)
  let steps = 1;
  while (next.moved) {
    next = step(next);
    steps += 1;
  }
  return {
    ...next,
    steps,
  }
};

export {
  parseInput,
  print,
  step,
  settle,
};
