const findScore = (game) => {
  switch(game) {
    case 'A X': return 3 + 1;
    case 'A Y': return 6 + 2;
    case 'A Z': return 0 + 3;
    case 'B X': return 0 + 1;
    case 'B Y': return 3 + 2;
    case 'B Z': return 6 + 3;
    case 'C X': return 6 + 1;
    case 'C Y': return 0 + 2;
    case 'C Z': return 3 + 3;
  }
};

const findPlay = (game) => {
  switch(game) {
    case 'A X': return 0 + 3;
    case 'A Y': return 3 + 1;
    case 'A Z': return 6 + 2;
    case 'B X': return 0 + 1;
    case 'B Y': return 3 + 2;
    case 'B Z': return 6 + 3;
    case 'C X': return 0 + 2;
    case 'C Y': return 3 + 3;
    case 'C Z': return 6 + 1;
  }
};

const findTotalScore = (games, findSpecificOutcome = false) => games
      .map((g) => findSpecificOutcome ? findPlay(g) : findScore(g))
      .reduce((total, g) => g + total, 0);

export {
  findTotalScore,
};
