const walk = (world, sx, sy, ex, ey, fn) => {
  return world.map((row, y) => {
    if (y < sy || y > ey) { return row; }
    return row.map((cell, x) => {
      if (x < sx || x > ex) { return cell; }
      return fn(cell);
    });
  });
}

const turnOn = (world, sx, sy, ex, ey) => walk(world, sx, sy, ex, ey, () => true);

const inc = (world, sx, sy, ex, ey) => walk(world, sx, sy, ex, ey, (cell) => cell + 1);

const turnOff = (world, sx, sy, ex, ey) => walk(world, sx, sy, ex, ey, () => false);

const dec = (world, sx, sy, ex, ey) => walk(world, sx, sy, ex, ey, (cell) => Math.max(0, cell - 1));

const toggle = (world, sx, sy, ex, ey) => walk(world, sx, sy, ex, ey, (cell) => !cell);

const dbl = (world, sx, sy, ex, ey) => walk(world, sx, sy, ex, ey, (cell) => cell + 2);


const genWorld = (dimensions, init = false) => new Array(dimensions).fill(new Array(dimensions).fill(init));

const getNums = (pair) => pair.split(',').map((val) => parseInt(val, 10));

const parseInstruction = (line, bright = false) => {
  const words = line.split(' ');
  const cmd = words.length === 4 ? 'toggle' : words[1];
  const [sx, sy] = words.length === 4 ? getNums(words[1]) : getNums(words[2]);
  const [ex, ey] = words.length === 4 ? getNums(words[3]) : getNums(words[4]);
  let fn = cmd;
  if (bright) {
    switch (cmd) {
      case 'toggle': fn = 'dbl'; break;
      case 'on': fn = 'inc'; break;
      case 'off': fn = 'dec'; break;
    }
  }
  return {
    fn,
    sx,
    sy,
    ex,
    ey
  };
};

const act = (world, line, bright = false) => {
  const instructions = parseInstruction(line, bright);
  let fn;
  switch (instructions.fn) {
    case 'toggle':
      fn = toggle;
      break;
    case 'on':
      fn = turnOn;
      break;
    case 'off':
      fn = turnOff;
      break;
    case 'dbl':
      fn = dbl;
      break;
    case 'inc':
      fn = inc;
      break;
    case 'dec':
      fn = dec;
      break;
  };
  return fn(world, instructions.sx, instructions.sy, instructions.ex, instructions.ey);
};

const countLit = (world) => world
    .flatMap((val) => val)
    .filter((cell) => cell)
    .length;

const countBrightness = (world) => world
    .flatMap((val) => val)
    .reduce((sum, cell) => sum + cell, 0);

export {
  turnOn,
  turnOff,
  toggle,
  genWorld,
  parseInstruction,
  act,
  countLit,
  countBrightness,
};
