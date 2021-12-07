const findMedian = (values) => values[Math.floor(values.length / 2)];

const findMean = (values) => values.reduce((total, cur) => total += cur, 0) / values.length;

const findFuelCost = (state, target) => state.reduce((cost, cur) => cost += Math.abs(target - cur), 0);

const findExpensiveFuelCost = (state, target) => state.reduce((cost, cur) => {
  const diff = Math.abs(target - cur);
  return cost + (diff * (diff + 1)) / 2;
}, 0);

const findCheapestLocationByMean = (state) => {
  const mean = findMean(state);
  const low = findExpensiveFuelCost(state, Math.trunc(mean));
  const high = findExpensiveFuelCost(state, Math.ceil(mean));
  if (low < high) {
    return {
      location: Math.trunc(mean),
      cost: low,
    };
  }
    return {
      location: Math.ceil(mean),
      cost: high,
    };
}

export {
  findMedian,
  findFuelCost,
  findExpensiveFuelCost,
  findCheapestLocationByMean,
};
