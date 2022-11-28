const interpretRow = (row) => {
  const [per1, , op, diff, , , , , , , per2] = row.slice(0, -1).split(' ');
  const key = [per1, per2].sort((a, b) => a < b ? -1 : 1).join('.');
  return [key, parseInt(diff, 10) * (op === 'gain' ? 1 : -1), new Set([per1, per2])];
};

const interpretInput = (input) => {
  let values = {};
  let people = []
  input.forEach((row) => {
    const [k, v, p] = interpretRow(row);
    values = {...values, [k]: values[k] ? values[k] + v : v};
    people = people.concat([...p]);
  });
  return [values, new Set(people)];
};

const buildArrangements = (people) => {
  let arrangements = [...people];
  for (let i = 1; i < people.size; i++) {
    arrangements = arrangements.flatMap((a) => [...people]
                                        .filter((v) => !a.includes(v))
                                        .map((v) => `${a}.${v}`))
  }
  return arrangements;
};

const calculateHappiness = (values, arrangement) => arrangement
      .split('.')
      .reduce((sum, person, idx, arr) => {
        let key;
        if (idx === 0) {
          key = [person, arr[arr.length - 1]]
            .sort((a, b) => (a < b ? -1 : 1))
            .join('.');
        } else {
          key = [person, arr[idx - 1]]
            .sort((a, b) => (a < b ? -1 : 1))
            .join('.');
        }
        return sum + values[key];
      }, 0);

const findArrangement = (input, plusMe = false) => {
  let values, people;
  if (plusMe) {
    [values, people] = addMe(interpretInput(input));
  } else {
    [values, people] = interpretInput(input);
  }
  const arrangements = buildArrangements(people);
  const happiness = new Set(arrangements.map((a) => calculateHappiness(values, a)));
  return Math.max(...[...happiness]);
};

const addMe = ([values, people]) => {
  const newValues = [...people].reduce((nV, person) => ({
    ...nV,
    [`${person}.ZZZMe`]: 0,
  }), values);
  return [newValues, new Set([...people, 'ZZZMe'])];
};

export {
  interpretRow,
  interpretInput,
  buildArrangements,
  calculateHappiness,
  findArrangement,
  addMe,
};
