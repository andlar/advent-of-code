const getFirstMarker = (signal, len = 4) => signal
      .split('')
      .map((v, idx, arr) => (new Set(arr.slice(idx - (len - 1), idx + 1))).size === len ? idx : undefined)
      .filter((v) => !!v)[0] + 1;

export {
  getFirstMarker,
};
