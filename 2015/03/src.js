const move = (world, step, moveRoboSanta = false) => {
  let i = moveRoboSanta ? world.a : world.x;
  let j = moveRoboSanta ? world.b : world.y;
  switch (step) {
    case '^': j += 1; break;
    case '>': i += 1; break;
    case 'v': j -= 1; break;
    case '<': i -= 1; break;
  }
  const next = `${i}:${j}`;
  return {
    ...world,
    delivered: new Set([...world.delivered, next]),
    x: moveRoboSanta ? world.x : i,
    y: moveRoboSanta ? world.y : j,
    a: moveRoboSanta ? i : world.a,
    b: moveRoboSanta ? j : world.b,
  };
};

const travel = (world, steps, roboSanta = false) => steps
      .split('')
      .reduce((w, step, idx) => move(w, step, roboSanta && idx % 2 === 1), world);

export {
  move, travel,
};
