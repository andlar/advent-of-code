const hasVowels = (word) => word
      .split('')
      .reduce((cnt, letter) => (cnt + ('aeiou'.includes(letter) ? 1 : 0)), 0) >= 3;

const hasDouble = (word) => word
      .split('')
      .reduce((has, letter, idx, arr) => {
        if (idx === 0) { return false; }
        return has || letter === arr[idx - 1];
      }, false);

const hasBadPair = (word) =>
      word.includes('ab')
      || word.includes('cd')
      || word.includes('pq')
      || word.includes('xy');

const hasPairs = (word) => word
      .split('')
      .reduce((has, letter, idx, arr) => {
        if (idx === 0) { return false; }
        return has || word.includes(`${arr[idx - 1]}${letter}`, idx + 1);
      }, false);

const hasRepeats = (word) => word
      .split('')
      .reduce((has, letter, idx, arr) => {
        if (idx < 2) { return false; }
        return has || letter === arr[idx - 2];
      }, false);

const isNice = (word) =>
      hasVowels(word)
      && hasDouble(word)
      && !hasBadPair(word);

const isNaughty = (word) =>
      !hasPairs(word)
      || !hasRepeats(word);

const checkList = (list, fn = isNice) => list
      .filter(fn).length;

export {
  hasVowels, hasDouble, hasBadPair, isNice, checkList, hasPairs, hasRepeats, isNaughty,
};
