/*const parseData = (data) => data
      .split('\n')
      .map((row) => row
           .split('')
           .map((val) => parseInt(val, 10)));
*/
const sumBitsHelper = (data) => {
  const output = new Array(data[0].length).fill(0);
  data.forEach((row) => {
      row.forEach((val, idx) => {
        output[idx] += val;
      });
  });
  return output;
}

const sumBits = (data) => {
  const output = new Array(data[0].length).fill(0);
  data.forEach((row) => {
      row.forEach((val, idx) => {
        output[idx] += val;
      });
  });
  return output;
};

const getGamma = (data) => {
  const isZeroIfEqualOrLessThan = Math.trunc(data.length / 2);
  const mostFrequent = sumBits(data)
        .map((val) => val > isZeroIfEqualOrLessThan ? 1 : 0)
        .join('');
  return mostFrequent;
}

const getPowerConsumption = (data) => {
  const gamma = parseInt(getGamma(data), 2);
  const epsilon = Math.pow(2, data[0].length) - gamma - 1;
  const power = gamma * epsilon;
  return power;
}

const filterForOxygen = (data, pos) => {
  const pivot = data.length / 2;
  const bitCount = sumBitsHelper(data);
  const output = data
        .filter((row) => (bitCount[pos] >= pivot) ? (row[pos] === 1) : (row[pos] === 0));
  return output;
}

const filterForCo2 = (data, pos) => {
  const pivot = data.length / 2;
  const bitCount = sumBitsHelper(data);
  const output = data
        .filter((row) => (bitCount[pos] >= pivot) ? (row[pos] === 0) : (row[pos] === 1));
  return output;
}

const findOxygen = (data, pos = 0) => {
  if (data.length === 1) {
    return parseInt(data[0].join(''), 2);
  }
  return findOxygen(filterForOxygen(data, pos), pos + 1);
}

const findCo2 = (data, pos = 0) => {
  if (data.length === 1) {
    return parseInt(data[0].join(''), 2);
  }
  return findCo2(filterForCo2(data, pos), pos + 1);
}

export {
  sumBits,
  getGamma,
  getPowerConsumption,
  filterForOxygen,
  filterForCo2,
  findOxygen,
  findCo2,
};
