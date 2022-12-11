const getOperation = (line) => {
  const [first, op, second] = line.split('= ')[1].split(' ');
  if (op === '+') {
    return (value) => value + parseInt(second, 10);
  }
  return (value) => value * (second === 'old' ? value : parseInt(second, 10));
};

const getThrow = (lines) => {
  const divisor = parseInt(lines[0].split(' ').find((v) => !isNaN(parseInt(v))), 10);
  const t =  parseInt(lines[1].split(' ').find((v) => !isNaN(parseInt(v))), 10);
  const f =  parseInt(lines[2].split(' ').find((v) => !isNaN(parseInt(v))), 10);
  return (value) => value % divisor === 0 ? t : f;
};

const makeMonkey = (input) => {
  const lines = input.split('\n');
  return {
    items: lines[1].split(':')[1].split(', ').map((v) => parseInt(v.trim(), 10)),
    divisor: parseInt(lines[3].split(' ').find((v) => !isNaN(parseInt(v))), 10),
    operate: getOperation(lines[2]),
    throw: getThrow(lines.slice(3, 6)),
    inspected: 0,
  };
};

const getDivisor = (monkeys) => monkeys.reduce((div, m) => div * m.divisor, 1);

const takeTurn = (monkeys, active, worried = true) => {
  const newMonkey = {
    ...monkeys[active],
    items: [],
    inspected: monkeys[active].inspected + monkeys[active].items.length,
  };
  const to = monkeys[active].items.reduce((out, v) => {
    const evaluated = newMonkey.operate(v);
    const newV = worried ? Math.floor(evaluated / 3) : evaluated % getDivisor(monkeys);
    const target = newMonkey.throw(newV);
    if (!out[target]) {
      return {
        ...out,
        [target]: [newV],
      };
    }
    return {
      ...out,
      [target]: out[target].concat(newV),
    };
  }, {});
  const ret = monkeys.map((m, idx) => {
    if (idx === active) { return newMonkey; }
    if (to[idx]) {
      return {
        ...m,
        items: m.items.concat(to[idx]),
      };
    }
    return m;
  });
  return ret;
};

const takeRound = (monkeys, worried = true) => {
  let out = [...monkeys];
  for (let i = 0; i < monkeys.length; i++) {
    out = takeTurn(out, i, worried);
  }
  return out;
};

const play = (monkeys, rounds, worried = true) => {
  let out = [...monkeys];
  for (let i = 0; i < rounds; i++) {
    out = takeRound(out, worried);
  }
  return out;
};

const getMonkeyBusiness = (monkeys) => {
  const [a, b] = monkeys.map((m) => m.inspected).sort((a, b) => a < b ? 1 : -1);
  return a * b;
};

export {
  makeMonkey,
  getDivisor,
  takeTurn,
  takeRound,
  play,
  getMonkeyBusiness,
};
