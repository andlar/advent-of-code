const addMap = (mapping, end) => (end === 'start') ? mapping : (mapping ?? []).concat(end);

const parseInput = (input) => {
  let state = {
    mappings: {
      end: [],
    },
    pending: ['start'],
    routes: new Set(),
  }
  input.forEach((mapping) => {
    if (mapping[0] !== 'end') {
      state.mappings[mapping[0]] = addMap(state.mappings[mapping[0]], mapping[1]);
    }
    if (mapping[1] !== 'end') {
      state.mappings[mapping[1]] = addMap(state.mappings[mapping[1]], mapping[0]);
    }
  });
  return state;
};

const grow = (state) => {
  let next = {
    ...state,
    pending: state.pending.flatMap((rte) => {
      const last = rte.split(',').slice(-1)[0];
      const ret = [];
      state.mappings[last].forEach((pos) => {
        if (pos === pos.toUpperCase() || !rte.includes(`,${pos},`)) {
          ret.push(`${rte},${pos}`);
        }
      });
      return ret;
    }),
  };
  next.pending
    .filter((route) => route.includes(',end'))
    .forEach((route) => next.routes.add(route));
  return next;
};

const alreadyHasTwoSmall = (route) => {
  let vals = route
      .split(',')
      .filter((val) => val !== val.toUpperCase());
  let sets = new Set(vals);
  return vals.length !== sets.size;
};

const growExtended = (state) => {
  let next = {
    ...state,
    pending: state.pending.flatMap((rte) => {
      const last = rte.split(',').slice(-1)[0];
      const ret = [];
      state.mappings[last].forEach((pos) => {
        if (pos === pos.toUpperCase() || (!rte.includes(`,${pos},`) || !alreadyHasTwoSmall(rte))) {
          ret.push(`${rte},${pos}`);
        }
      });
      return ret;
    }),
  };
  next.pending
    .filter((route) => route.includes(',end'))
    .forEach((route) => next.routes.add(route));
  return next;
};

const growAll = (state) => {
  if (state.pending.length === 0) { return state; }
  return growAll(grow(state));
}

const growAllExtended = (state) => {
  if (state.pending.length === 0) { return state; }
  return growAllExtended(growExtended(state));
}

export {
  parseInput,
  grow,
  growAll,
  growAllExtended,
};
