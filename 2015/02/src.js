const getPaperSize = (dimensions) => {
  const [l, w, h] = dimensions.split('x').map((v) => parseInt(v, 10));
  return 2 * (l * w + l * h + w * h) + Math.min(l * w, l * h, w * h);
};

const getReorderSize = (dimensions) => dimensions
      .reduce((total, size) => total + getPaperSize(size), 0);

const getRibbonLength = (dimensions) => {
  const [l, w, h] = dimensions.split('x').map((v) => parseInt(v, 10));
  return 2 * (l + w + h - Math.max(l, w, h)) + (l * w * h);
};

const getReorderLength = (dimensions) => dimensions
      .reduce((total, size) => total + getRibbonLength(size), 0);

export {
  getPaperSize,
  getReorderSize,
  getRibbonLength,
  getReorderLength,
};
