const parseLine = (line) => {
  const points = line.split(' -> ');
  return {
    x1: parseInt(points[0].split(',')[0], 10),
    y1: parseInt(points[0].split(',')[1], 10),
    x2: parseInt(points[1].split(',')[0], 10),
    y2: parseInt(points[1].split(',')[1], 10),
  };
}

const mapLine = ({x1, y1, x2, y2}, state = {}) => {
  let out = {
    ...state,
  };
  let start, finish;
  if (y1 === y2) {
    if (x1 < x2) {
      start = x1;
      finish = x2;
    }
    if (x1 > x2) {
      start = x2;
      finish = x1;
    }
    for (let i = start; i <= finish; i++) {
      out[`${i},${y1}`] = (out[`${i},${y1}`] ?? 0) + 1;
    }
  }
  if (x1 === x2) {
    if (y1 < y2) {
      start = y1;
      finish = y2;
    }
    if (y1 > y2) {
      start = y2;
      finish = y1;
    }
    for (let i = start; i <= finish; i++) {
      out[`${x1},${i}`] = (out[`${x1},${i}`] ?? 0) + 1;
    }
  }
  if (x1 < x2 && y1 < y2) {
    for (let i = 0; i <= x2 - x1; i++) {
      out[`${x1 + i},${y1 + i}`] = (out[`${x1 + i},${y1 + i}`] ?? 0) + 1;
    }
  }
  if (x1 > x2 && y1 < y2) {
    for (let i = 0; i <= x1 - x2; i++) {
      out[`${x1 - i},${y1 + i}`] = (out[`${x1 - i},${y1 + i}`] ?? 0) + 1;
    }
  }
  if (x1 < x2 && y1 > y2) {
    for (let i = 0; i <= x2 - x1; i++) {
      out[`${x1 + i},${y1 - i}`] = (out[`${x1 + i},${y1 - i}`] ?? 0) + 1;
    }
  }
  if (x1 > x2 && y1 > y2) {
    for (let i = 0; i <= x1 - x2; i++) {
      out[`${x1 - i},${y1 - i}`] = (out[`${x1 - i},${y1 - i}`] ?? 0) + 1;
    }
  }
  return out;
}

const findOrthoLines = (lines) => lines.filter(({x1, x2, y1, y2}) => x1 === x2 || y1 === y2);

const mapOrthoLines = (lines) => {
  let state;
  findOrthoLines(lines).forEach((line) => {
    state = mapLine(line, state);
  });
  return state;
}

const mapAllLines = (lines) => {
  let state;
  lines.forEach((line) => {
    state = mapLine(line, state);
  });
  return state;
};

const countIntersections = (state) => Object.values(state).filter((value) => value > 1).length;

export {
  parseLine,
  mapLine,
  mapOrthoLines,
  mapAllLines,
  countIntersections,
};
