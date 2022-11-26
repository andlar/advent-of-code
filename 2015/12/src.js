const tokenize = (str) => str.split(/,|\[|\]|\{|\}|"|:/)
      .filter((v) => v)
      .filter((v) => !isNaN(parseInt(v, 10)))
      .map((v) => parseInt(v, 10));

const sum = (str) => tokenize(str)
      .reduce((acc, v) => acc + v, 0);

const hasRed = (obj) => Object.values(obj).includes('red');

const dropObj = (obj) => Object
      .keys(obj)
      .reduce((ret, key) => ({
        ...ret,
        [key]: drop(obj[key]),
      }), {});

const drop = (thing) => {
  if (typeof thing === 'object') {
    if (Array.isArray(thing)) {
      return thing
        .map((v) => drop(v))
        .filter((v) => v);
    }
    return hasRed(thing) ? undefined : dropObj(thing);
  }
  return thing;
};

const dropRed = (str) => JSON.stringify(drop(JSON.parse(str)));

export {
  tokenize,
  sum,
  dropRed,
};
