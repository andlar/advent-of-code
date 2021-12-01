const parseData = (input) => input.split('\n').map((val) => parseInt(val, 10));

const countIncreases = (input) => input
      .filter((val, idx, arr) => val > arr[idx - 1])
      .length;

const convertToWindows = (input) => parseData(input)
      .map((val, idx, arr) => val + arr[idx + 1] + arr[idx + 2]);

export { parseData, countIncreases, convertToWindows };
