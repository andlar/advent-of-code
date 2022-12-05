const parseInput = (input) => [input
          .filter((line) => line.includes('['))
          .reduce((out, row) => {
            const [, a, , , , b, , , , c, , , , d, , , , e, , , , f, , , , g, , , , h, , , , i] = row.split('').map((v) => v.trim());
            return {
              ...out,
              [1]: a ? [...out[1], a] : out[1],
              [2]: b ? [...out[2], b] : out[2],
              [3]: c ? [...out[3], c] : out[3],
              [4]: d ? [...out[4], d] : out[4],
              [5]: e ? [...out[5], e] : out[5],
              [6]: f ? [...out[6], f] : out[6],
              [7]: g ? [...out[7], g] : out[7],
              [8]: h ? [...out[8], h] : out[8],
              [9]: i ? [...out[9], i] : out[9],
            };
          }, { [1]: [], [2]: [], [3]: [], [4]: [], [5]: [], [6]: [], [7]: [], [8]: [], [9]: [] }),
          input
          .filter((line) => line.includes('move'))
          .map((line) => {
            const [num, src, dst] = line
                  .split(' ')
                  .filter((v) => !isNaN(parseInt(v, 10)))
                  .map((v) => parseInt(v, 10));
            return { num, src, dst };
          })
         ];

const moveCrates = (crates, instruction, chunked = false) => {
  let output = {...crates};
  if (chunked) {
    output = {
      ...output,
      [instruction.dst]: output[instruction.src].slice(0, instruction.num).concat(...output[instruction.dst]),
        [instruction.src]: output[instruction.src].slice(instruction.num),
      };
  } else {
    for (let i = 0; i < instruction.num; i++) {
      output = {
        ...output,
        [instruction.dst]: [output[instruction.src][0]].concat(...output[instruction.dst]),
        [instruction.src]: output[instruction.src].slice(1),
      };
    }
  }
  return output;
};

const moveAllCrates = (crates, instructions, chunked = false) => {
  let output = {...crates};
  instructions.forEach((instruction) => {
    output = moveCrates(output, instruction, chunked);
  });
  return output;
};

const readCrates = (crates) => `${crates['1'][0]}${crates['2'][0]}${crates['3'][0]}${crates['4'][0] ? crates['4'][0] : ''}${crates['5'][0] ? crates['5'][0] : ''}${crates['6'][0] ? crates['6'][0] : ''}${crates['7'][0] ? crates['7'][0] : ''}${crates['8'][0] ? crates['8'][0] : ''}${crates['9'][0] ? crates['9'][0] : ''}`;

export {
  parseInput,
  moveCrates,
  moveAllCrates,
  readCrates,
};
