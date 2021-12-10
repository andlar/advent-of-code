const parseMap = (input) => ({
  mod: input[0].length,
  locations: input
    .join('')
    .split('')
    .map((cell, idx) => ({
      value: parseInt(cell, 10),
      drainsTo: undefined,
    }))
});

const findBasins = (state) => ({
  ...state,
  locations: state.locations
    .map((cell, idx) => ({
      ...cell,
      drainsTo: true
        && cell.value < (state.locations[idx - state.mod]?.value ?? 9) // n
        && (idx % state.mod === state.mod - 1 ? true : cell.value < state.locations[idx + 1].value) // e
        && cell.value < (state.locations[idx + state.mod]?.value ?? 9) // s
        && (idx % state.mod === 0 ? true : cell.value < state.locations[idx - 1].value) // w
        ? idx : undefined,
    })),
});

const findLowpoints = (state) => findBasins(state).locations
      .filter((cell, idx) => cell.drainsTo === idx)
      .map((cell) => cell.value);

const expandSmoke = (state) => {
  const out = {
    ...state,
    mapped: true,
  };
  out.locations = state.locations.map((cell, idx) => {
    if (cell.drainsTo || cell.value === 9) { return cell; }
    out.mapped = false;
    cell.drainsTo =
      state.locations[idx - state.mod]?.drainsTo // n
      || (idx % state.mod !== state.mod - 1 && state.locations[idx + 1].drainsTo) // e
      || state.locations[idx + state.mod]?.drainsTo // s
      || (idx % state.mod !== 0 && state.locations[idx - 1].drainsTo) // w
    ;
    if (cell.drainsTo) {
      out.locations[cell.drainsTo].basinSize = (out.locations[cell.drainsTo].basinSize ?? 1) + 1;
    }
    return cell;
  });
  return out;
}

const mapBasins = (state) => {
  let next = findBasins(state);
  while (!next.mapped) {
    next = expandSmoke(next);
  }
  return next.locations.filter((cell) => cell.basinSize);
}

const getMap = (state) => {
  return state.locations.map((cell, idx) => {
    let char = cell.value;
    if (cell.value === 9) {
      char = '#';
    } else if (cell.drainsTo && cell.drainsTo !== idx) {
      char = '.';
    }
    if (idx % state.mod === state.mod - 1) {
      char += '\n';
    }
    return char;
  }).join('');
}

const findRiskLevel = (state) => state.reduce((total, val) => total + val + 1, 0);

const calculateBasins = (state) => state.map((cell) => cell.basinSize).sort((a, b) => b - a).slice(0, 3).reduce((total, val) => total * val, 1);

export {
  parseMap,
  findLowpoints,
  findRiskLevel,
  mapBasins,
  getMap,
  calculateBasins,
};
