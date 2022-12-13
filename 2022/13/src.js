const parse = (input) => input
      .map((pair) => pair.split('\n').reduce((p, r, idx) => ({
        ...p,
        [idx === 0 ? 'left' : 'right']: eval(r),
      }), {}));

const makeList = (input) => input
      .map((pair) => pair.split('\n').map((r) => eval(r)))
      .reduce((list, r) => list.concat(r), []);

const isInOrder = (left, right) => {
  if (typeof left === 'number' && typeof right === 'number') {
    if (left < right) { return true; }
    if (left > right) { return false; }
  }
  if (typeof left === 'object' && typeof right === 'object') {
    if (left.length === 0 && right.length === 0) { return; }
    if (left.length === 0 && right.length > 0) { return true; }
    if (left.length > 0 && right.length === 0) { return false; }
    const isOrdered = isInOrder(left[0], right[0]);
    if (isOrdered === undefined) { return isInOrder(left.slice(1), right.slice(1)); }
    return isOrdered;
  }
  if (typeof left === 'object' && typeof right === 'number') {
    return isInOrder(left, [right]);
  }
  if (typeof left === 'number' && typeof right === 'object') {
    return isInOrder([left], right);
  }
};

const findIndices = (pairs) => pairs.map((p) => isInOrder(p.left, p.right))
      .map((v, idx) => (v ? idx + 1 : 0))
      .filter((v) => v !== 0);

const getSum = (indices) => indices.reduce((sum, v) => sum + v, 0);

const sortList = (list) => list.sort((a, b) => isInOrder(a, b) ? -1 : 1);

const findDecoderKey = (list) => {
  let first, second;
  list.forEach((r, idx) => {
    if (r.length === 1 && r[0].length === 1 && r[0][0] === 2) { first = idx + 1; }
    if (r.length === 1 && r[0].length === 1 && r[0][0] === 6) { second = idx + 1; }
  });
  return first * second;
};

export {
  parse,
  makeList,
  isInOrder,
  findIndices,
  getSum,
  sortList,
  findDecoderKey,
};
