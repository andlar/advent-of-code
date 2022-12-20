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
  let minX = 500, maxX = 500, minY = 0, maxY = 0;
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
  }), { minX, maxX, minY, maxY });
};

const addWalls = (world) => {
  let out = {
    ...world,
    minX: world.minX - 2,
    maxX: world.maxX + 2,
    maxY: world.maxY + 2,
  };
  for (let y = 0; y <= out.maxY; y++) {
    out[`${out.minX},${y}`] = {x: out.minX, y, v: '#'};
    out[`${out.maxX},${y}`] = {x: out.maxX, y, v: '#'};
  };
  for (let x = out.minX; x <= out.maxX; x++) {
    out[`${x},${out.maxY}`] = {x, y: out.maxY, v: '#'};
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
    if (out[`${x},${y}`]?.v === '+') { return [out, true]; };
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

const factAdd = (v) => {
  if (v % 2 === 0) { return (v / 2) * (v + 1); }
  return (v + factAdd(v - 1));
};

const findHeight = (world, x) => {
  let y = 0;
  while (!world[`${x},${y}`]) {
    y += 1;
  }
  return world.maxY - y - 1;
};

const countCaughtSand = (world) => Object
      .values(world)
      .filter((c) => c.v === 'o')
      .length
      + (factAdd(findHeight(world, world.minX + 1)))
      + (factAdd(findHeight(world, world.maxX - 1)))
      + 1;

export {
  parseLine,
  buildWorld,
  addWalls,
  drop,
  releaseTheSand,
  countSand,
  countCaughtSand,
};
