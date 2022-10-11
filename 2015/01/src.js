const move = (input) => input
      .split('')
      .reduce((sum, f) => sum + (f === '(' ? 1 : -1), 0);


const findBasement = (input) => {
  let loc = 0;
  let pos = 0;
  for (const f of input.split('')) {
    loc = loc + (f === '(' ? 1 : -1);
    pos = pos + 1;
    if (loc < 0) { return pos; }
  }
  return undefined;
};

export {
  move,
  findBasement,
};
