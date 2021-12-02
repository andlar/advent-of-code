const countIncreases = (input, diff = 1) => input
      .split('\n')
      .map((val) => parseInt(val, 10))
      .filter((val, idx, arr) => val > arr[idx - diff])
      .length;

export { countIncreases };
