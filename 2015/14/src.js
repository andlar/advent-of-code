const interpretRow = (row) => {
  const [name] = row.split(' ');
  return row
    .split(' ')
    .filter((v) => !isNaN(parseInt(v, 10)))
    .map((v) => (parseInt(v, 10)))
    .concat(name);
};

const interpretInput = (input) => input.map((row) => {
  const [vel, dur, rest, name] = interpretRow(row);
  return { vel, dur, total: dur + rest, name };
});

const buildScoreboard = (reindeer) => {
  return reindeer.reduce((board, deer) => ({
    ...board,
    [deer.name]: 0,
  }), {});
};

const travel = (reindeer, duration) => {
  const fullTurns = Math.floor(duration / reindeer.total);
  const excess = duration % reindeer.total;
  const partialSecs = Math.min(excess, reindeer.dur);
  const distance = reindeer.vel * (fullTurns * reindeer.dur + partialSecs);
  //console.log({reindeer, duration, fullTurns, excess, partialSecs, distance});
  return distance;
};

const findWinner = (reindeer, duration) => Math.max(...reindeer.map((r) => travel(r, duration)));

const findLeader = (reindeer, board, instant) => {
  const locs = reindeer.map((r) => ({
    ...r,
    distance: travel(r, instant),
  }));
  const max = Math.max(...locs.map((r) => r.distance));
  const winners = locs.filter((l) => l.distance === max)
        .reduce((updated, r) => ({
          ...updated,
          [r.name]: updated[r.name] + 1,
        }), board);
  return winners;
};

const determinePoints = (reindeer, board, duration) => {
  let out = {...board};
  for (let i = 1; i <= duration; i++) {
    out = findLeader(reindeer, out, i);
  }
  return out;
};

const findPointsWinner = (...args) => {
  const points = determinePoints(...args);
  return Object.entries(points)
    .sort((a, b) => a[1] < b[1] ? 1 : -1)
    .map((r) => ({
      name: r[0],
      score: r[1],
    }))[0];
};

export {
  interpretRow,
  interpretInput,
  buildScoreboard,
  travel,
  findWinner,
  findLeader,
  determinePoints,
  findPointsWinner,
};
