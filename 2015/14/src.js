const interpretRow = (row) => row
      .split(' ')
      .filter((v) => !isNaN(parseInt(v, 10)))
      .map((v) => (parseInt(v, 10)));

const interpretInput = (input) => input.map((row) => {
  const [vel, dur, rest] = interpretRow(row);
  return { vel, dur, total: dur + rest };
});

const travel = (reindeer, duration) => {
  const fullTurns = Math.floor(duration / reindeer.total);
  const excess = duration % reindeer.total;
  const partialSecs = Math.min(excess, reindeer.dur);
  const distance = reindeer.vel * (fullTurns * reindeer.dur + partialSecs);
  //console.log({reindeer, duration, fullTurns, excess, partialSecs, distance});
  return distance;
};

const findWinner = (reindeer, duration) => Math.max(...reindeer.map((r) => travel(r, duration)));

export {
  interpretRow,
  interpretInput,
  travel,
  findWinner,
};
