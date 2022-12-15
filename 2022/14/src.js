const parseLine = (line) => {
  const stones = line
        .split(' -> ')
        .flatMap((s, idx, arr) => {
          if (idx === 0) {
            return [s]
          }
          const [x, y] = s.split(',').map((v) => parseInt(v, 10));
          const [px, py] = arr[idx - 1].split(',').map((v) => parseInt(v, 10));
          const dir = x === px ? (y > py ? 'd' : 'u') : (x > px ? 'r' : 'l');
          let ret;
          switch (dir) {
            case 'u': ret = new Array(Math.abs(y - py)).fill(0).map((c, idx) => `${x},${y + idx}`); break;
            case 'd': ret = new Array(Math.abs(y - py)).fill(0).map((c, idx) => `${x},${y - idx}`); break;
            case 'l': ret = new Array(Math.abs(x - px)).fill(0).map((c, idx) => `${x + idx},${y}`); break;
            case 'r': ret = new Array(Math.abs(x - px)).fill(0).map((c, idx) => `${x - idx},${y}`); break;
          }
          return ret;
        });
  return stones;
};

const buildWorld = (values) => {
  let minX = 500, maxX = 500, maxY = 0;
  return values.map((v) => {
    const [x, y] = v.split(',').map((c) => parseInt(c, 10));
    if (x < minX) { minX = x; }
    if (x > maxX) { maxX = x; }
    if (y > maxY) { maxY = y; }
    return { x, y, v: '#' };
  }).reduce((world, point) => ({
    ...world,
    '500,0': {x: 500, y: 0, v: '+'},
    [`${point.x},${point.y}`]: point,
  }), { minX, maxX, maxY });
};

const drawWorld = (world) => {
  let out = '', key;
  for (let y = 0; y <= world.maxY; y++) {
    for (let x = world.minX; x <= world.maxX; x++) {
      key = `${x},${y}`;
      out += Object.keys(world).includes(key) ? world[key].v : '.';
    };
    out += '\n';
  };
  return out;
};

const drop = (world, start) => {
  let out = {
    ...world,
  };
  let x = start.x, y = start.y;
  let canMove = true;
  while (canMove) {
    if (y >= world.maxY) { return [out, true]; }
    if (!Object.keys(world).includes(`${x},${y + 1}`)) {
      y = y + 1;
      continue;
    }
    if (!Object.keys(world).includes(`${x - 1},${y + 1}`)) {
      y = y + 1;
      x = x - 1;
      continue;
    }
    if (!Object.keys(world).includes(`${x + 1},${y + 1}`)) {
      y = y + 1;
      x = x + 1;
      continue;
    }
    out[`${x},${y}`] = {x, y, v: 'o'};
    canMove = false;
  }
  return [out, false];
};

const releaseTheSand = (world) => {
  let [out, abyss] = drop(world, {x: 500, y: 0});
  while (!abyss) {
    [out, abyss] = drop(out, {x: 500, y: 0});
  }
  return out;
};

const countSand = (world) => Object
      .values(world)
      .filter((c) => c.v === 'o')
      .length;

export {
  parseLine,
  buildWorld,
  drawWorld,
  drop,
  releaseTheSand,
  countSand,
};
