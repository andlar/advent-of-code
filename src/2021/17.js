const sums = (n) => (n * n + n) / 2;

const getX = (x, t) => sums(x) - (x > t ? sums(x - t) : 0);

const getY = (y, t) => sums(y) - sums(y - t);

const intersects = (target, trajectory) => {
  let t = 0, x = 0, y = 0;
  let intersects = false;
  while (x <= target.x.max && y > target.y.min) {
    x = getX(trajectory.x, t);
    y = getY(trajectory.y, t);
    if (target.x.min <= x && x <= target.x.max && target.y.min <= y && y <= target.y.max) {
      intersects = true;
    }
    t = t + 1;
  }
  return intersects;
};

const countTrajectories = (target) => {
  let trajectories = [];
  let trajectory;
  for (let x = 1; x <= target.x.max; x++) {
    for (let y = Math.abs(target.y.min); y >= (target.y.min); y--) {
      if (intersects(target, {x, y})) {
        trajectories.push({x, y});
      }
    }
  }
  return trajectories;
};

export {
  getX,
  getY,
  intersects,
  countTrajectories,
};
