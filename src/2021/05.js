const parseLine = (line) => {
  const points = line.split(' -> ');
  return {
    x1: parseInt(points[0].split(',')[0], 10),
    y1: parseInt(points[0].split(',')[1], 10),
    x2: parseInt(points[1].split(',')[0], 10),
    y2: parseInt(points[1].split(',')[1], 10),
  };
}

const parseOrthoLine = ({x1, y1, x2, y2}, state = {}) => {
  let out = {
    ...state,
  };
  if (x1 < x2) {
    for (let i = x1; i <= x2; i++) {
      out[`${i},${y1}`] = out[`${i},${y1}`] ? out[`${i},${y1}`] + 1 : 1;
    }
  }
  if (x1 > x2) {
    for (let i = x2; i <= x1; i++) {
      out[`${i},${y1}`] = out[`${i},${y1}`] ? out[`${i},${y1}`] + 1 : 1;
    }
  }
  if (y1 < y2) {
    for (let i = y1; i <= y2; i++) {
      out[`${x1},${i}`] = out[`${x1},${i}`] ? out[`${x1},${i}`] + 1 : 1;
    }
  }
  if (y1 > y2) {
    for (let i = y2; i <= y1; i++) {
      out[`${x1},${i}`] = out[`${x1},${i}`] ? out[`${x1},${i}`] + 1 : 1;
    }
  }
  return out;
};

const parseDiagLine = ({x1, y1, x2, y2}, state = {}) => {
  let out = {
    ...state,
  };
  if (x1 < x2 && y1 < y2) {
    for (let i = 0; i <= x2 - x1; i++) {
      out[`${x1 + i},${y1 + i}`] = out[`${x1 + i},${y1 + i}`] ? out[`${x1 + i},${y1 + i}`] + 1 : 1;
    }
  }
  if (x1 > x2 && y1 < y2) {
    for (let i = 0; i <= x1 - x2; i++) {
      out[`${x1 - i},${y1 + i}`] = out[`${x1 - i},${y1 + i}`] ? out[`${x1 - i},${y1 + i}`] + 1 : 1;
    }
  }
  if (x1 < x2 && y1 > y2) {
    for (let i = 0; i <= x2 - x1; i++) {
      out[`${x1 + i},${y1 - i}`] = out[`${x1 + i},${y1 - i}`] ? out[`${x1 + i},${y1 - i}`] + 1 : 1;
    }
  }
  if (x1 > x2 && y1 > y2) {
    for (let i = 0; i <= x1 - x2; i++) {
      out[`${x1 - i},${y1 - i}`] = out[`${x1 - i},${y1 - i}`] ? out[`${x1 - i},${y1 - i}`] + 1 : 1;
    }
  }
  return out;
};

const findOrthoLines = (lines) => lines.filter(({x1, x2, y1, y2}) => x1 === x2 || y1 === y2);

const findNonOrthoLines = (lines) => lines.filter(({x1, x2, y1, y2}) => x1 !== x2 && y1 !== y2);

const mapOrthoLines = (lines) => {
  let state;
  lines.forEach((line) => {
    state = parseOrthoLine(line, state);
  });
  return state;
}

const mapAllLines = (lines) => {
  let state;
  findOrthoLines(lines).forEach((line) => {
    state = parseOrthoLine(line, state);
  });
  findNonOrthoLines(lines).forEach((line) => {
    state = parseDiagLine(line, state);
  });
  return state;
};

const countIntersections = (state) => Object.values(state).filter((value) => value > 1).length;

export {
  parseLine,
  parseOrthoLine,
  parseDiagLine,
  findOrthoLines,
  findNonOrthoLines,
  mapOrthoLines,
  mapAllLines,
  countIntersections,
};
