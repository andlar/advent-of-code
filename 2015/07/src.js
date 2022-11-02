const verbs = ['NOT', 'AND', 'OR', 'LSHIFT', 'RSHIFT'];

const canCompute = (signal) => {
  const [instruction, wire] = signal.split(' -> ');
  const tokens = instruction.split(' ');
  return tokens.reduce((can, val) => can && (isFinite(val) || verbs.includes(val)), true);
};

const compute = (signal) => {
  const [instruction, wire] = signal.split(' -> ');
  return eval(instruction
              .replace('NOT', '~')
              .replace('AND', '&')
              .replace('OR', '|')
              .replace('LSHIFT', '<<')
              .replace('RSHIFT', '>>')
              + ' & 0xFFFF');
};

const insertValues = (mapping, signal) => {
  const [instruction, wire] = signal.split(' -> ');
  const tokens = instruction.split(' ');
  return [tokens.map((val) => mapping[val] !== undefined ? mapping[val] : val).join(' '), wire].join(' -> ');
};

const buildMapping = (instructions) => {
  return instructions.reduce((mapping, signal) => {
    const [instruction, wire] = signal.split(' -> ');
    return {
      ...mapping,
      [wire]: compute(signal),
    };
  }, {});
};

const iterate = (instructions) => {
  const mapping = buildMapping(instructions.filter((instruction) => canCompute(instruction)));
  const next = instructions
        .filter((instruction) => !canCompute(instruction))
        .map((instruction) => insertValues(mapping, instruction));
  return [mapping, next];
};

const findValue = (instructions, value) => {
  let [mapping, next] = iterate([...instructions]);
  while (mapping[value] === undefined) {
    [mapping, next] = iterate([...next]);
  };
  return mapping[value];
};

export {
  canCompute,
  compute,
  insertValues,
  buildMapping,
  iterate,
  findValue,
};
