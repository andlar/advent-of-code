const parseRow = (row, y) => row.split('').reduce((trees, tree, x) => ({
  ...trees,
  [`${x}:${y}`]: parseInt(tree, 10),
}), {});

const parseForest = (rows) => rows.reduce((forest, row, y) => ({
  ...forest,
  ...parseRow(row, y),
}), {});

const fromNorth = (x, y, height, forest) => (y < 0) || forest[`${x}:${y}`] < height && fromNorth(x, y - 1, height, forest);

const fromSouth = (x, y, height, forest, size) => (y > size) || forest[`${x}:${y}`] < height && fromSouth(x, y + 1, height, forest, size);

const fromEast = (x, y, height, forest, size) => (x > size) || forest[`${x}:${y}`] < height && fromEast(x + 1, y, height, forest, size);

const fromWest = (x, y, height, forest) => (x < 0) || forest[`${x}:${y}`] < height && fromWest(x - 1, y, height, forest);

const isVisible = (tree, forest, size = 4) => {
  const [x, y] = tree.split(':').map((v) => parseInt(v, 10));
  return fromNorth(x, y - 1, forest[`${x}:${y}`], forest)
    || fromSouth(x, y + 1, forest[`${x}:${y}`], forest, size)
    || fromEast(x + 1, y, forest[`${x}:${y}`], forest, size)
    || fromWest(x - 1, y, forest[`${x}:${y}`], forest);
};

const countVisible = (forest, size = 4) => Object.keys(forest).reduce((count, tree) => count + (isVisible(tree, forest, size) ? 1 : 0), 0);

const lookNorth = (x, y, height, forest) => {
  if (y < 0) { return 0; }
  if (forest[`${x}:${y}`] >= height) { return 1; }
  return 1 + lookNorth(x, y - 1, height, forest);
};

const lookSouth = (x, y, height, forest, size) => {
  if (y > size) { return 0; }
  if (forest[`${x}:${y}`] >= height) { return 1; }
  return 1 + lookSouth(x, y + 1, height, forest, size);
};

const lookEast = (x, y, height, forest, size) =>{
  if (x > size) { return 0; }
  if (forest[`${x}:${y}`] >= height) { return 1; }
  return 1 + lookEast(x + 1, y, height, forest, size);
};

const lookWest = (x, y, height, forest) =>{
  if (x < 0) { return 0; }
  if (forest[`${x}:${y}`] >= height) { return 1; }
  return 1 + lookWest(x - 1, y, height, forest);
};

const getScore = (tree, forest, size = 4) => {
  const [x, y] = tree.split(':').map((v) => parseInt(v, 10));
  return lookNorth(x, y - 1, forest[`${x}:${y}`], forest)
    * lookSouth(x, y + 1, forest[`${x}:${y}`], forest, size)
    * lookEast(x + 1, y, forest[`${x}:${y}`], forest, size)
    * lookWest(x - 1, y, forest[`${x}:${y}`], forest);
};

const getBestScore = (forest, size = 4) => Math.max(...Object.keys(forest).map((tree) => getScore(tree, forest, size)));

export {
  parseForest,
  isVisible,
  countVisible,
  getScore,
  getBestScore,
};
