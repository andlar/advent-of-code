const md = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

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


export {
  md,
  drawWorld,
};
