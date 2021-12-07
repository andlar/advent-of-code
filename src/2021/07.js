const findMedian = (values) => {
  const mid = Math.floor(values.length / 2);
  return values[mid];
}

const findFuelCost = (state, target) => {
  return state.reduce((cost, cur) => cost += Math.abs(target - cur), 0);
}

const findExpensiveFuelCost = (state, target) => {
  return state.reduce((cost, cur) => {
    const diff = Math.abs(target - cur);
    return cost + (diff * (diff + 1)) / 2;
  }, 0);
}

const findCheapestLocation = (state) => {
  const locations = [];
  for (let i = 0; i < state[state.length - 1]; i++) {
    locations[i] = {
      location: i,
      cost: findExpensiveFuelCost(state, i),
    }
  }
  return locations
    .sort((a, b) => a.cost - b.cost)
  [0];
}

export {
  findMedian,
  findFuelCost,
  findExpensiveFuelCost,
  findCheapestLocation,
};
