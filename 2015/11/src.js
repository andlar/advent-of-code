const toNumber = (pw) => parseInt(
  pw.split('')
    .map((v) => (parseInt(v, 36) - 10).toString(26))
    .join('')
  , 26);

const toPassword = (val) => val
      .toString(26)
      .split('')
      .map((v) => (parseInt(v, 26) + 10).toString(36))
      .join('');

const formatPassword = (pw) => pw.padStart(8, 'a');

const isNotConfusing = (pw) =>
      !pw.includes('i')
  && !pw.includes('l')
  && !pw.includes('o');

const hasDoubledLetters = (pw) => {
  const vals = pw
        .split('')
        .map((v, idx, arr) => {
          if (idx === 0) { return undefined }
          return v === arr[idx - 1] ? idx : undefined;
        })
        .filter((v) => !!v);
  return vals.length >= 2 && (Math.max(...vals) - Math.min(...vals)) > 1
};

const hasARun = (pw) => pw
      .split('')
      .map((v) => parseInt(v, 36))
      .some((v, idx, arr) => {
        if (idx <= 1) { return false; }
        return (v - 1 === arr[idx - 1]) && (v - 2 === arr[idx - 2]);
      });

const isValid = (pw) =>
      isNotConfusing(pw)
      && hasDoubledLetters(pw)
      && hasARun(pw);

const findNext = (pw) => {
  let num = toNumber(pw) + 1;
  while (!isValid(toPassword(num))) {
    num += 1;
  }
  return formatPassword(toPassword(num));
};

export {
  toNumber,
  toPassword,
  formatPassword,
  isValid,
  findNext,
};
