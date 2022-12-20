const drawWorld = (world) => {
  let out = '', key;
  for (let y = world.minY; y <= world.maxY; y++) {
    for (let x = world.minX; x <= world.maxX; x++) {
      key = `${x},${y}`;
      out += Object.keys(world).includes(key) ? world[key].v : '.';
    };
    out += '\n';
  };
  return out;
};

const md = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const unionRange = (a, b) => {
  const [aMin, aMax] = a.split(':').map((v) => parseInt(v, 10));
  const [bMin, bMax] = b.split(':').map((v) => parseInt(v, 10));
  if (aMax < bMin || bMax < aMin) { return [a, b]; }
  return [[Math.min(aMin, bMin), Math.max(aMax, bMax)].join(':')];
};

const unionRanges = (rngs) => {
  if (rngs.length === 1) { return rngs; }
  let first, rest, can, cant, next = [...rngs];
  while (next.length > 1) {
    [first, ...rest] = next;
    can = rest.filter((rng) => unionRange(first, rng).length === 1).flatMap((rng) => unionRange(first, rng));
    cant = rest.filter((rng) => unionRange(first, rng).length === 2);
    next = can.concat(cant);
    if (can.length === 0 && cant.length > 0) {
      return [first].concat(unionRanges(cant));
    }
  }
  return next;
};

export {
  drawWorld,
  md,
  unionRange,
  unionRanges,
};
