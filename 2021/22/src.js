const parseInput = (input) => {
  const step = {
    x: { min: 0, max: 0 },
    y: { min: 0, max: 0 },
    z: { min: 0, max: 0 },
    toggle: input.split(' ')[0],
  };
  input.split(' ')[1].split(',').forEach((range) => {
    step[range.split('=')[0]] = {
      min: parseInt(range.split('=')[1].split('..')[0], 10),
      max: parseInt(range.split('=')[1].split('..')[1], 10),
    }
  });
  return step;
};

const readSteps = (steps) => {
  let cubes = new Set();
  steps.forEach((step) => {
    for (let x = Math.max(step.x.min, -50); x <= Math.min(step.x.max, 50); x++) {
      for (let y = Math.max(step.y.min, -50); y <= Math.min(step.y.max, 50); y++) {
        for (let z = Math.max(step.z.min, -50); z <= Math.min(step.z.max, 50); z++) {
          if (step.toggle === 'on') {
            cubes.add(`${x},${y},${z}`);
          } else {
            cubes.delete(`${x},${y},${z}`);
          }
        }
      }
    }
  });
  return cubes;
};

export {
  parseInput,
  readSteps,
};
