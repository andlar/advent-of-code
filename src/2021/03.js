const parseData = (data) => data
      .split('\n')
      .map((row) => row
           .split('')
           .map((val) => parseInt(val, 10)));

const sumBits = (data) => parseData(data)
      .reduce((sum, row) => {
        row.forEach((val, idx) => {
          sum[idx] += val;
        }), new Array(row.length).fill(0);
        return sum;
      });

const getGamma = (data) => {
  const isZeroIfEqualOrLessThan = Math.trunc(data.split('\n').length / 2);
  const mostFrequent = sumBits(data)
        .map((val) => val > isZeroIfEqualOrLessThan ? 1 : 0)
        .join('');
  return mostFrequent;
}

const getPowerConsumption = (data) => {
  const gamma = parseInt(getGamma(data), 2);
  const epsilon = Math.pow(2, data.split('\n')[0].length) - gamma - 1;
  const power = gamma * epsilon;
  return power;
}

export { sumBits, getGamma, getPowerConsumption };
