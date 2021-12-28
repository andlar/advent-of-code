const takeTurn = (state, player) => {
  let next = {
    ...state,
    die: state.die + 3 > 100 ? (state.die + 3) % 100 : state.die + 3,
    rollCount: state.rollCount + 3,
  }
  const roll1 = state.die + 1 > 100 ? 1 : state.die + 1;
  const roll2 = roll1 + 1 > 100 ? 1 : roll1 + 1;
  const roll3 = roll2 + 1 > 100 ? 1 : roll2 + 1;
  const move = roll1 + roll2 + roll3;
  next.position[player] = (state.position[player] + move) % 10;
  next.score[player] = state.score[player] + (next.position[player] === 0 ? 10 : next.position[player]);
  return next;
};

const takeDirac = (state) => {
  let turns = [
  ]
  let move, idx, count, next;

  for (const [move, count] of [[3,1], [4,3], [5,6], [6,7], [7,6], [8,3], [9,1]]) {
    next = {
      position: {...state.position},
      score: {...state.score},
      count: state.count + count,
      player: state.player === 'p1' ? 'p2' : 'p1',
    };
    next.position[state.player] = (state.position[state.player] + move) % 10;
    next.score[state.player] = state.score[state.player] + (next.position[state.player] === 0 ? 10 : next.position[state.player]);
    turns.push(next);
  }
  return turns;
};

const play = (state) => {
  let next = takeTurn(state, 'p1');
  if (next.score.p1 >= 1000) {
    return next;
  }
  next = takeTurn(next, 'p2');
  if (next.score.p2 >= 1000) {
    return next;
  }
  return play(next);
};


export {
  takeTurn,
  play,
};
