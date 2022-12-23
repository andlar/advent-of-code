const getVal = (key, func, part2) => {
  if (part2) {
    if (key === 'humn') { return ['noop', '=', 0]; }
    if (key === 'root') {
      const [first, , second] = func.split(' ');
      return [first, '=', second];
    }
  }
  return isNaN(parseInt(func, 10)) ? func.split(' ') : parseInt(func, 10);
};

const parseInput = (rows, part2 = false) => rows.reduce((monkeys, row) => {
  const [key, func] = row.split(': ');
  return {
    ...monkeys,
    [key]: getVal(key, func, part2),
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

const findPartialAnswer = (input) => {
  let monkeys = {...input};
  let toGo = Object.keys(monkeys).filter((monkey) => !isNaN(monkeys[monkey])).length;
  while (toGo > 0) {
    monkeys = yell(monkeys);
    toGo = Object.keys(monkeys).filter((monkey) => !isNaN(monkeys[monkey])).length;
  };
  return monkeys;
};

const unwind = (monkeys) => {
  let [first, op, second] = monkeys['root'];
  let rootVal = isNaN(first) ? second : first;
  let rootKey = isNaN(first) ? first : second;
  [first, op, second] = monkeys[rootKey];
  let val = isNaN(first) ? second : first;
  let key = isNaN(first) ? first : second;
  let rev = false;
  if ((op === '-' || op === '/') && isNaN(second)) { rev = true; }
  switch (op) {
    case '/': rootVal = (rev ?  val / rootVal : rootVal * val); break;
    case '+': rootVal = rootVal - val; break;
    case '*': rootVal = rootVal / val; break;
    case '-': rootVal = (rev ? val - rootVal : rootVal + val); break;
  }
  return Object.keys(monkeys)
    .filter((monkey) => monkey !== rootKey)
    .filter((monkey) => monkey !== 'root')
    .reduce((out, monkey) => ({
      ...out,
      [monkey]: monkeys[monkey],
    }), {
      root: [key, '=', rootVal],
    });
};

const findHuman = (input) => {
  let monkeys = {...input};
  while (Object.keys(monkeys).length > 2) {
    const [key, op, val] = monkeys['root'];
    monkeys = unwind(monkeys);
  }
  const [, , human] = monkeys['root'];
  return human;
};

export {
  parseInput,
  yell,
  yellALot,
  findPartialAnswer,
  unwind,
  findHuman,
};
