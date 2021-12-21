const getMap = (state) => {
  return state.values.map((pos) => {
    let char = `${pos.x === 0 && pos.y !== 0 ? '\n' : ''}${pos.value}`;
    if (pos.inPath) {
      char = '\x1b[36m' + char + '\x1b[0m'; // cyan
    } else if (pos.cost !== undefined) {
      char = '\x1b[32m' + char + '\x1b[0m'; // green
    };
    if (state.fringe.find((frg) => frg.x === pos.x && frg.y === pos.y)) {
      char = '\x1b[31m' + char + '\x1b[0m'; // red
    };
    return char;
  }).join('');
};

const getMappedMap = (state) => {
  let out = '';
  for (let y = 0; y < state.size; y++) {
    for (let x = 0; x < state.size; x++) {
      const loc = state.values[`${x},${y}`];
      let char = loc.value;
      if (loc.cost !== undefined) {
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
  const values = input
      .flatMap((row, y, ys) => row.map((value, x, xs) => ({
        value,
        x,
        y,
        cost: x === y && x === 0 ? 0 : undefined,
      })));
  return {
    values,
    xs: input[0].length,
    fringe: [].concat({...values[1]}).concat({...values[input[0].length]}),
  };
};

const parseInputAsMap = (input) => {
  const values = {};
  input.forEach((row, y) => row.map((value, x) => {
    values[`${x},${y}`] = {
        value,
      cost: x === y && x === 0 ? 0 : undefined,
    };
  }));
  return {
    values,
    size: input[0].length,
    fringe: ['0,1', '1,0'],
  };
};

const manhattanDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const findSource = (state, target) => {
  const neighbor = state.values
        .filter((source) => source.cost >= 0)
        .filter((source) => manhattanDistance(source, target) === 1)
        .sort((a, b) => a.cost - b.cost)[0];
  return neighbor;
};

const findTarget = (state) => {
  const targets = state.fringe.sort((a, b) => (a.heuristic ?? 1) - (b.heuristic ?? 1));
  return targets[0];
};

const addIfRelevant = (fringe, item, target, end) => {
  const next = [...fringe];
  if (item
      && item.cost === undefined
      && !fringe.find((frg) => frg.x === item.x && frg.y === item.y)) {
    next.push({
      ...item,
      heuristic: target.cost + item.value + manhattanDistance(item, end),
    });
  }
  return next;
};

const expandFringe = (state, target) => {
  let next = state.fringe
      .filter((pos) => !(pos.x === target.x && pos.y === target.y));
  const targetIdx = target.x + target.y * state.xs;
  if (target.x > 0) {
    next = addIfRelevant(next, state.values[targetIdx - 1], target, state.values[state.values.length - 1]);
  }
  if (target.x < (state.xs - 1)) {
    next = addIfRelevant(next, state.values[targetIdx + 1], target, state.values[state.values.length - 1]);
  }
  next = addIfRelevant(next, state.values[targetIdx - state.xs], target, state.values[state.values.length - 1]);
  next = addIfRelevant(next, state.values[targetIdx + state.xs], target, state.values[state.values.length - 1]);
  return next;
};

const step = (state) => {
  let target = findTarget(state);
  const source = findSource(state, target);
  target = {
    ...target,
    cost: source.cost + target.value,
    source: {x: source.x, y: source.y},
  }
  const next = {
    ...state,
    fringe: expandFringe(state, target),
  };
  next.values[target.x + target.y * state.xs] = target;
  return next;
};

const getLocation = (state, key) => {
  const [x, y] = key.split(',').map((v) => parseInt(v, 10));
  const location = {
    ...state.values[key],
    x,
    y,
  };
  const neighbors = [
    {...state.values[`${x - 1},${y}`], key: `${x - 1},${y}`},
    {...state.values[`${x},${y - 1}`], key: `${x},${y - 1}`},
    {...state.values[`${x + 1},${y}`], key: `${x + 1},${y}`},
    {...state.values[`${x},${y + 1}`], key: `${x},${y + 1}`},
  ]
        .filter((loc) => loc)
        .filter((loc) => loc.cost >= 0)
        .sort((a, b) => a.cost - b.cost);
  location.source = neighbors[0].key;
  if (!location.cost) {
    location.heuristic = location.value + (state.size * 2 - x - y - 2) + state.values[location.source].cost;
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
  return (state.values[key] && state.values[key].cost === undefined && !state.fringe.find((val) => val === key));
};

const expandFringeInMap = (state, target) => {
  const { x, y } = target;
  let next = state.fringe
      .filter((pos) => pos !== `${x},${y}`);
  let key = `${x - 1},${y}`;
  if (isRelevant(state, key)) {
    next.push(key);
  }
  key = `${x},${y - 1}`;
  if (isRelevant(state, key)) {
    next.push(key);
  }
  key = `${x + 1},${y}`;
  if (isRelevant(state, key)) {
    next.push(key);
  }
  key = `${x},${y + 1}`;
  if (isRelevant(state, key)) {
    next.push(key);
  }
  return next;
};

const stepMap = (state) => {
  const target = findNext(state);
  const next = {
    ...state,
    fringe: expandFringeInMap(state, target),
  };
  next.values[`${target.x},${target.y}`].cost = target.value + state.values[target.source].cost;
  next.values[`${target.x},${target.y}`].source = target.source;
  return next;
};

export {
  getMap,
  getMappedMap,
  parseInput,
  parseInputAsMap,
  findSource,
  step,
  stepMap,
};
