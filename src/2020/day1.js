const findEntries = (vals, total) => vals.filter((v, idx, arr) => arr.includes((total || 2020) - v));

const getAnswer = vals => vals.reduce((sum, acc) => sum * acc, 1);

const findTriple = vals => vals.filter((v, idx, arr) => findEntries(arr, 2020 - v).length === 2);

export { findEntries, getAnswer, findTriple };
