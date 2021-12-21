const getMap = (state) => {
  let out = '';
  for (let y = 0; y < state.size; y++) {
    for (let x = 0; x < state.size; x++) {
      const loc = state.map[`${x},${y}`];
      const value = state.values[`${x},${y}`];
      let char = value;
      if (loc?.inPath) {
        char = '\x1b[36m' + char + '\x1b[0m'; // cyan
      } else if (loc?.cost !== undefined) {
        char = '\x1b[32m' + char + '\x1b[0m'; // green
      }
      if (state.fringe.find((frg) => frg === `${x},${y}`)) {
        char = '\x1b[31m' + char + '\x1b[0m'; // red
      };
      out += char;
    }
    out += '\n';
  }
  return out;
};

const parseInput = (input) => {
  const values = {};
  input.forEach((row, y) => row.map((value, x) => {
    values[`${x},${y}`] = value;
  }));
  return {
    values,
    map: { '0,0': { cost: 0 }},
    size: input[0].length,
    fringe: ['0,1', '1,0'],
  };
};

const getLocation = (state, key) => {
  const [x, y] = key.split(',').map((v) => parseInt(v, 10));
  const location = {
    ...state.map[key],
    value: state.values[key],
    x,
    y,
  };
  const neighbors = [
    {...state.map[`${x - 1},${y}`], key: `${x - 1},${y}`},
    {...state.map[`${x},${y - 1}`], key: `${x},${y - 1}`},
    {...state.map[`${x + 1},${y}`], key: `${x + 1},${y}`},
    {...state.map[`${x},${y + 1}`], key: `${x},${y + 1}`},
  ]
        .filter((loc) => loc)
        .filter((loc) => loc.cost >= 0)
        .sort((a, b) => a.cost - b.cost);
  location.source = neighbors[0].key;
  if (!location.cost) {
    location.heuristic = state.values[key] + (state.size * 2 - x - y - 2) + state.map[location.source].cost;
  }
  return location;
};

const findNext = (state) => {
  const targets = state.fringe
        .map((key) => getLocation(state, key))
        .sort((a, b) => a.heuristic - b.heuristic);
  return targets[0];
};

const isRelevant = (state, key) => {
  return (state.values[key] && !state.map[key] && !state.fringe.find((val) => val === key));
};

const expandFringe = (state, target) => {
  const { x, y } = target;
  let next = state.fringe
      .filter((pos) => pos !== `${x},${y}`);
  [
    `${x - 1},${y}`,
    `${x},${y - 1}`,
    `${x + 1},${y}`,
    `${x},${y + 1}`,
  ].forEach((key) => {
    if (isRelevant(state, key)) {
      next.push(key);
    }
  });
  return next;
};

const step = (state) => {
  const target = findNext(state);
  const next = {
    ...state,
    fringe: expandFringe(state, target),
  };
  next.map[`${target.x},${target.y}`] = {
    cost: target.value + state.map[target.source].cost,
    source: target.source,
  }
  return next;
};

export {
  getMap,
  parseInput,
  step,
};
