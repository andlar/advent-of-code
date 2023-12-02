const parseGame = (line) => ({
  id: parseInt(line.split(':')[0].split(' ')[1], 10),
  pulls: line.split(': ')[1].split('; ').map((pull) => {
    const ret = { red: 0, green: 0, blue: 0 };
    const vals = pull.split(', ');
    vals.forEach((p) => {
      const [num, color] = p.split(' ');
      switch (color) {
        case 'red': ret.red = parseInt(num, 10); break;
        case 'green': ret.green = parseInt(num, 10); break;
        case 'blue': ret.blue = parseInt(num, 10); break;
      }
    });
    return ret;
  }),
});

const isPossible = (game) => game.pulls.every((pull) => pull.red <= 12 && pull.green <= 13 && pull.blue <= 14);

const findPossibleGameSums = (games) => games
      .filter((game) => isPossible(parseGame(game)))
      .map((game) => parseGame(game))
      .reduce((sum, game) => sum += game.id, 0);

const findPower = (game) => {
  let max = { red: 0, blue: 0, green : 0 };
  game.pulls.forEach((pull) => {
    max = {
      ...max,
      red: Math.max(max.red, pull.red),
      green: Math.max(max.green, pull.green),
      blue: Math.max(max.blue, pull.blue),
    };
  });
  return max.red * max.blue * max.green;
};

const findAllPowers = (games) => games
      .map((game) => parseGame(game))
      .reduce((power, game) => power + findPower(game), 0);

export {
  parseGame,
  isPossible,
  findPossibleGameSums,
  findPower,
  findAllPowers,
};
