const parseInput = (rows) => rows.reduce((monkeys, row) => {
  const [key, func] = row.split(': ');
  return {
    ...monkeys,
    [key]: isNaN(parseInt(func, 10)) ? func.split(' ') : parseInt(func, 10),
  };
}, {});

const yell = (input) => {
  const next = Object.keys(input).reduce((monkeys, monkey) => {
    if (typeof input[monkey] === 'number') { return monkeys; }
    let [first, op, second] = input[monkey];
    if (typeof input[first] === 'number') { first = input[first]; }
    if (typeof input[second] === 'number') { second = input[second]; }
    return {
      ...monkeys,
      [monkey]: (typeof first === 'number' && typeof second === 'number') ? eval(`${first} ${op} ${second}`) : [first, op, second],
    };
  }, {})
  return next;
};

const yellALot = (input) => {
  let monkeys = {...input};
  while (typeof monkeys['root'] === 'object') {
    monkeys = yell(monkeys);
  };
  return monkeys;
};

export {
  parseInput,
  yell,
  yellALot,
};
