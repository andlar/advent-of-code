const getMap = (state) => {
  return state.values.map((pos) => {
    let char = `${pos.x === 0 && pos.y !== 0 ? '\n' : ''}${pos.value}`;
    if (pos.cost !== undefined) {
      char = '\x1b[32m' + char + '\x1b[0m'; // green
    };
    if (state.fringe.find((frg) => frg.x === pos.x && frg.y === pos.y)) {
      char = '\x1b[31m' + char + '\x1b[0m'; // red cyan = 36
    };
    return char;
  }).join('');
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

const multiplyMap = (state) => {
  const next = {...state};
  return next;
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

export {
  getMap,
  parseInput,
  findSource,
  step,
  multiplyMap,
};
