const parseMap = (input) => ({
  mod: input[0].length,
  locations: input
    .join('')
    .split('')
    .map((cell) => parseInt(cell, 10)),
})

const findLowpoints = (state) => {
  let out = state.locations.filter((cell, idx) => {
    let lowest = true;
    lowest = lowest && cell < (state.locations[idx - state.mod] ?? 99); // n
    lowest = lowest && (idx % state.mod === state.mod - 1 ? true : cell < state.locations[idx + 1]); // e
    lowest = lowest && cell < (state.locations[idx + state.mod] ?? 99); // s
    lowest = lowest && (idx % state.mod === 0 ? true : cell < state.locations[idx - 1]); // w
    return lowest;
  });
  return out;
}

const findRiskLevel = (state) => {
  return state.reduce((total, val) => total + val + 1, 0);
}

export {
  parseMap,
  findLowpoints,
  findRiskLevel,
};
