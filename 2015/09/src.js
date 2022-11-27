const interpretRow = (row) => {
  const [f, , t, , d] = row.split(' ');
  const key = [f, t].sort((a, b) => a < b ? -1 : 1).join('.');
  return [key, parseInt(d, 10), new Set([f, t])];
};

const interpretInput = (input) => {
  let distances = {};
  let locations = []
  input.forEach((row) => {
    const [k, d, l] = interpretRow(row);
    distances = {...distances, [k]: d};
    locations = locations.concat([...l]);
  });
  return [distances, new Set(locations)];
};

export {
  interpretRow,
  interpretInput,
};
