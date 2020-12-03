const isTree = (region, right) => {
    return region[0].charAt(right % (region[0].length)) === '#';
};

const countTrees = (region, dd, right, dr, sum) => {
    if (region.length === 0) { return sum; }
    return sum + (isTree(region, right) ? 1 : 0) + countTrees(region.slice(dd), dd, right + dr, dr, sum);
}

const findAll = region => {
    return countTrees(region, 1, 0, 1, 0) *
        countTrees(region, 1, 0, 3, 0) *
        countTrees(region, 1, 0, 5, 0) *
        countTrees(region, 1, 0, 7, 0) *
        countTrees(region, 2, 0, 1, 0);
}

export { isTree, countTrees, findAll };
