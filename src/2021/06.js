 const parseData = (values) => {
  const state = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  };
  values.forEach((value) => state[value] = state[value] + 1);
  return state;
}

const tick = (state) => ({
    0: state[1],
    1: state[2],
    2: state[3],
    3: state[4],
    4: state[5],
    5: state[6],
    6: state[7] + state[0],
    7: state[8],
    8: state[0],
});


const countFish = (state) => [...Array(9).keys()].reduce((total, tick) => total + state[tick], 0);

export {
  parseData,
  tick,
  countFish,
};
