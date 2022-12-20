import { md, unionRanges } from '../util';

const readLine = (line) => line
        .split(' ')
        .filter((v) => v.includes('='))
        .map((v) => v.split('=')[1])
        .map((v, idx) => parseInt(idx === 3 ? v : v.substring(0, v.length - 1), 10));

const parseInput = (rows) => {
  let minX = Number.MAX_VALUE, maxX = Number.MIN_VALUE, minY = Number.MAX_VALUE, maxY = Number.MIN_VALUE;
  return rows.reduce((world, line) => {
    const [sx, sy, bx, by] = readLine(line);
    minX = Math.min(sx, bx, minX);
    maxX = Math.max(sx, bx, maxX);
    minY = Math.min(sy, by, minY);
    maxY = Math.max(sy, by, maxY);
    return {
      ...world,
      [`${sx},${sy}`]: { x: sx, y: sy, v: 'S', vis: md({x: sx, y: sy}, {x: bx, y: by})},
      [`${bx},${by}`]: { x: bx, y: by, v: 'B'},
      minX, maxX, minY, maxY,
    };
  }, {});
};

const cannotHasBeacon = (world, key, y) => {
  const sensor = world[key];
  const vis = sensor.vis - Math.abs(sensor.y - y)
  if (vis < 0) { return; }
  return [sensor.x - vis, sensor.x + vis].join(':');
};

const cannotHasBeacons = (world, y) => Object.keys(world)
      .filter((key) => world[key]?.v === 'S')
      .map((key) => cannotHasBeacon(world, key, y))
      .filter((v) => !!v);

const countCants = (world, rng, y) => {
  const [minX, maxX] = rng.split(':').map((v) => parseInt(v, 10));
  const beaconCount = Object.keys(world)
        .filter((key) => world[key]?.v === 'B')
        .filter((key) => world[key].x >= minX && world[key].x <= maxX && world[key].y === y)
        .length;
  return maxX - minX + 1 - beaconCount;
};

const countCantsCountingBeacons = (world, y) => {
  const ranges = unionRanges(cannotHasBeacons(world, y));
  const beaconCount = ranges.reduce((sum, rng) => sum + countCants(world, rng, y), 0);
  return beaconCount;
};

const findBlanks = (world, maxY) => {
  let ranges, y;
  for (y = 0; y <= maxY; y++) {
    ranges = unionRanges(cannotHasBeacons(world, y));
    if (ranges.length === 2) { break; }
  }
  return [ranges, y];
};

const findBeacon = (world, maxY) => {
  const [ranges, y] = findBlanks(world, maxY);
  const x = parseInt(ranges[0].split(':')[1], 10) + 1;
  return [x, y];
};

const getTuningFrequency = (x, y) => x * 4000000 + y;

export {
  parseInput,
  cannotHasBeacon,
  cannotHasBeacons,
  countCants,
  countCantsCountingBeacons,
  findBlanks,
  findBeacon,
  getTuningFrequency,
};
