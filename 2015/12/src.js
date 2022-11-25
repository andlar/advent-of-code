const tokenize = (str) => str.split(/,|\[|\]|\{|\}|"|:/)
      .filter((v) => v)
      .filter((v) => !isNaN(parseInt(v, 10)))
      .map((v) => parseInt(v, 10));

const sum = (str) => tokenize(str)
      .reduce((acc, v) => acc + v, 0);

const dropRed = (str) => {
  return str.replace(/\["red"/g, '[')
    .replace(/,"red"/g, '')
    .replace(/\{.*?:"red".*?\}/g, '');
};

export {
  tokenize,
  sum,
  dropRed,
};
