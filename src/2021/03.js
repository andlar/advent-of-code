const countBits = (data) => {
  const output = new Array(data[0].length).fill(0);
  data.forEach((row) => {
      row.forEach((val, idx) => {
        output[idx] += val;
      });
  });
  return output;
};

const getGamma = (data) => parseInt(
  countBits(data)
    .map((val) => (val > data.length / 2) ? 1 : 0)
    .join('')
  , 2);

const getPowerConsumption = (data) => {
  const gamma = getGamma(data);
  const epsilon = Math.pow(2, data[0].length) - gamma - 1;
  return {
    gamma,
    epsilon,
    power: gamma * epsilon,
  };
}

const forOxygen = (count, pivot, val) => count >= pivot ? (val === 1) : (val === 0);

const forCo2 = (count, pivot, val) => count >= pivot ? (val === 0) : (val === 1);

const filterFor = (data, pos, filterType) => data.filter((row) => filterType(countBits(data)[pos], data.length / 2, row[pos]));

const filterForOxygen = (data, pos) => filterFor(data, pos, forOxygen);

const filterForCo2 = (data, pos) => filterFor(data, pos, forCo2);

const findRating = (data, filter, pos = 0) => (data.length === 1) ? parseInt(data[0].join(''), 2) : findRating(filterFor(data, pos, filter), filter, pos + 1);

const findLifeSupportRating = (data) => {
  const oxygen = findRating(data, forOxygen);
  const co2 = findRating(data, forCo2);
  return {
    oxygen,
    co2,
    lsr: oxygen * co2,
  };
}

export {
  countBits,
  getPowerConsumption,
  filterForOxygen,
  filterForCo2,
  findLifeSupportRating,
};
