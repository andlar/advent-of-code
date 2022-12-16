import { md } from '../util';

const makeGrid = (rows) => {
  let s, e;
  const grid = rows.reduce((acc, row, y) => {
    const cells = row.split('').map((c, x) => {
      if (c === 'S') {
        s = {x, y};
        c = 'a';
      }
      if (c === 'E') {
        e = {x, y};
        c = 'z';
      }
      return {
        x,
        y,
        val: c,
      };
    });
    return acc.concat(cells);
  }, []);
  return [grid, s, e];
};

const populateGrid = (grid, s, e, down = false) => grid.map((c) => ({
  ...c,
  f: (c.x === s.x && c.y === s.y ? (0 + md(c, e)) : undefined),
  g: (c.x === s.x && c.y === s.y ? 0 : undefined),
  h: down ? 0 : md(c, e),
  parent: undefined,
}));

const initializeAlg = (grid) => [[grid.find((c) => c.f)], []];

const findNeighbors = (grid, cell, down) => grid.filter((c) => {
  const dis = md(c, cell);
  const diff = down ? (cell.val.charCodeAt() - c.val.charCodeAt()) : (c.val.charCodeAt() - cell.val.charCodeAt());
  return dis === 1 && diff <= 1;
});

const step = (grid, open, closed, down = false) => {
  let [active, ...o] = open.sort((a, b) => a.f - b.f);
  const neighbors =
        findNeighbors(grid, active, down)
        .filter((n) => !closed.find((c) => c.x === n.x && c.y === n.y))
        .map((n) => {
          const g = active.g + 1;
          const f = g + n.h;
          const already = open.find((c) => c.x === n.x && c.y === n.y);
          if (already && already.f < f) {
            return already;
          }
          return {
            ...n,
            f,
            g,
            parent: {x: active.x, y: active.y},
          };
        });
  const newOpen = o.filter((o) => !neighbors.find((n) => n.x === o.x && n.y === o.y)).concat(neighbors);
  return [grid, newOpen, closed.concat(active)];
};

const search = (grid, end, down = false) => {
  let [open, closed] = initializeAlg(grid);
  if (down) {
    while (!closed.find((c) => c.val === 'a')) {
      [grid, open, closed] = step(grid, open, closed, down);
    };
    return [closed, closed.find((c) => c.val === 'a')];
  }
  while (!closed.find((c) => md(c, end) === 0)) {
    [grid, open, closed] = step(grid, open, closed, down);
  };
  return [closed, closed.find((c) => md(c, end) === 0)];
};

export {
  makeGrid,
  populateGrid,
  initializeAlg,
  step,
  search,
};
