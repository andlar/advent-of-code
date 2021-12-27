const parseInput = (input) => {
  const algorithm = new Set();
  input[0].split('').forEach((val, idx) => {
    if (val === '#') { algorithm.add(idx); }
  });
  const image = new Set();
  let max = {
    x: Number.MIN_VALUE,
    y: Number.MIN_VALUE,
  }
  let min = {
    x: 0,
    y: 0,
  }
  max.y = input.length - 3;
  for (let yIdx = 2; yIdx < input.length; yIdx++) {
    const xs = input[yIdx].split('');
    const y = yIdx - 2;
    max.x = xs.length - 1;
    for (let x = 0; x < xs.length; x++) {
      image[`${x},${y}`] = xs[x] === '#';
    }
  }
  return {
    algorithm,
    state: {
      image,
      max,
      min,
      unknown: false,
    },
  };
};

const isDot = (algorithm, state, point) => {
  let considered = '';
  for (const y of [-1, 0, 1]) {
    for (const x of [-1, 0, 1]) {
      let check = `${point.x + x},${point.y + y}`;
      if (state.image[check] !== undefined) {
        considered += state.image[check] ? '1' : '0';
      } else {
        considered += state.unknown ? '1' : '0';
      }
    }
  }
  const dot = algorithm.has(parseInt(considered, 2));
  return dot;
};

const enhance = (algorithm, state) => {
  let next = {
    ...state,
    image: new Set(),
    max: {
      x: state.max.x + 1,
      y: state.max.y + 1,
    },
    min: {
      x: state.min.x - 1,
      y: state.min.y - 1,
    },
    unknown: state.unknown ? algorithm.has(parseInt('111111111', 2)) : algorithm.has(parseInt('000000000', 2)),
  };
  for (let y = state.min.y - 1; y <= state.max.y + 1; y++) {
    for (let x = state.min.x - 1; x <= state.max.x + 1; x++) {
      next.image[`${x},${y}`] = isDot(algorithm, state, {x, y});
    }
  }
  return next;
};

const print = (state) => {
  let output = '';
  for (let y = state.min.y; y <= state.max.y; y++) {
    for (let x = state.min.x; x <= state.max.x; x++) {
      output += state.image[`${x},${y}`] ? '#' : '.';
    };
    output += '\n';
  }
  return output;
};

const lit = (state) => Object.keys(state.image).filter((key) => state.image[key]).length;

export {
  parseInput,
  enhance,
  print,
  lit,
};
