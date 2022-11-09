const lookAndSay = (seq) => seq
      .split('')
      .reduce((res, val, idx, arr) => {
        if (res.length === 0) {
          return [val];
        }
        if (val === arr[idx - 1]) {
          const first = res.slice(0, -1);
          const last = res.slice(-1)[0];
          return [...first, `${last}${val}`];
        }
        return [...res, [val]];
      }, [])
      .reduce((str, arr) => `${str}${arr.length}${arr[0]}`, '');

const playRounds = (seq, rounds) => {
  if (rounds === 0) { return seq; }
  return playRounds(lookAndSay(seq), rounds -= 1);
};

export {
  lookAndSay,
  playRounds,
};
