const getPosition = (instructions, cycle) => { // return value of register at end of cycle
  let cnt = 0;
  let idx = 0;
  while (cnt < cycle) {
    cnt += (instructions[idx] === 'noop') ? 1 : 2;
    idx += 1;
  }
  return instructions
        .slice(0, idx - (cnt === cycle ? 0 : 1))
        .filter((ins) => ins !== 'noop')
        .map((ins) => parseInt(ins.split(' ')[1], 10))
        .reduce((sum, val) => sum + val, 1);
};

const getRegisterValue = (instructions, cycle) => cycle * getPosition(instructions, cycle - 1);

const getTotalStrength = (instructions) => getRegisterValue(instructions, 20)
      + getRegisterValue(instructions, 60)
      + getRegisterValue(instructions, 100)
      + getRegisterValue(instructions, 140)
      + getRegisterValue(instructions, 180)
      + getRegisterValue(instructions, 220);

const getPixel = (instructions, cycle) => Math.abs(getPosition(instructions, cycle) - cycle % 40) <= 1 ? '#' : '.';

const drawRow = (instructions, row) => Array(40)
        .fill(0)
        .map((v, idx) => row * 40 + idx)
        .map((v) => getPixel(instructions, v))
        .join('');

const drawAllRows = (instructions) => {
  return [0, 1, 2, 3, 4, 5].map((v) => drawRow(instructions, v)).join('\n');
};

export {
  getPosition,
  getRegisterValue,
  getTotalStrength,
  getPixel,
  drawRow,
  drawAllRows,
};
