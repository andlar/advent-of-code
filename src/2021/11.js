const parseInput = (input) => ({
  steps: 0,
  flashes: 0,
  mod: input[0].length,
  locations: input
    .join('')
    .split('')
    .map((octopus, idx) => ({
      value: parseInt(octopus, 10),
      flashed: false,
    }))
});

const getDisplay = (state) => {
  return state.locations.map((octopus, idx) => {
    let char = octopus.value > 9 ? '#' : octopus.value;
    if (char === 0) {
      char = '\x1b[36m' + char + '\x1b[0m';
    }
    if (!octopus.flashed && char === '#') {
      char = '\x1b[31m' + '#' + '\x1b[0m';
    }
    if (idx % state.mod === state.mod - 1) {
      char += '\n';
    }
    return char;
  }).join('');
}

const incrementAll = (state) => ({
  ...state,
  locations: state.locations.map((octopus) => ({
    ...octopus,
    value: octopus.value + 1,
  })),
});

const flashOnce = (state) => {
  const next = {
    ...state,
    flashed: false,
  };
  next.locations.forEach((octopus, idx) => {
    if (octopus.value <= 9 || octopus.flashed) { return; }
    next.flashed = true;
    octopus.flashed = true;
    next.flashes += 1;
    if (next.locations[idx - next.mod]) {
      next.locations[idx - next.mod].value += 1;
    } // n
    if (idx % next.mod !== next.mod - 1 && next.locations[idx - next.mod + 1]) {
      next.locations[idx - next.mod + 1].value += 1;
    } // ne
    if (idx % next.mod !== next.mod - 1 && next.locations[idx + 1]) {
      next.locations[idx + 1].value += 1;
    } // e
    if (idx % next.mod !== next.mod - 1 && next.locations[idx + next.mod + 1]) {
      next.locations[idx + next.mod + 1].value += 1;
    } // se
    if (next.locations[idx + next.mod]) {
      next.locations[idx + next.mod].value += 1;
    } // s
    if (idx % next.mod !== 0 && next.locations[idx + next.mod - 1]) {
      next.locations[idx + next.mod - 1].value += 1;
    } // sw
    if (idx % next.mod !== 0 && next.locations[idx - 1]) {
      next.locations[idx - 1].value += 1;
    } // w
    if (idx % next.mod !== 0 && next.locations[idx - next.mod - 1]) {
      next.locations[idx - next.mod - 1].value += 1;
    } // nw
  });
  return next;
};

const flashAll = (state) => {
  let next = flashOnce(state);
  if (next.flashed) { return flashAll(next); }
  return next;
}

const reset = (state) => ({
  ...state,
  locations: state.locations.map((octopus) => ({
    ...octopus,
    flashed: false,
    value: octopus.value > 9 ? 0 : octopus.value,
  })),
});

const step = (state) => {
  let next = incrementAll({...state, steps: state.steps += 1});
  next = flashAll(next);
  next = reset(next);
  return next;
}

const isSynchronized = (state) => state.locations
      .reduce((synchronized, octopus) => synchronized && octopus.value === 0, true);

const stepUntilSynchronized = (state) => {
  let next = {...state};
  while (!isSynchronized(next)) {
    next = step(next);
  }
  return next;
};

export {
  parseInput,
  getDisplay,
  incrementAll,
  flashOnce,
  flashAll,
  reset,
  step,
  stepUntilSynchronized,
};
