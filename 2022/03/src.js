const findDuplicates = (rucksacks) => rucksacks.map((rucksack) => {
  const fHalf = rucksack.substring(0, rucksack.length / 2);
  const lHalf = rucksack.substring(rucksack.length / 2);
  const dup = lHalf
        .split('')
        .find((c) => fHalf.includes(c));
  return dup;
});

const getValue = (char) => {
  const val = char.charCodeAt(0);
  if (val >= 96) {
    return val - 96;
  }
  return val - 38;
};

const calculateValue = (rucksacks, findBadge = false) => (findBadge ? findBadges(rucksacks) : findDuplicates(rucksacks))
    .reduce((total, sack) => total + getValue(sack), 0);

const findBadges = (rucksacks) => rucksacks
      .map((rucksack, idx) => {
        if (idx % 3 !== 2) { return undefined; }
        return rucksack
          .split('')
          .find((c) => rucksacks[idx - 1].includes(c) && rucksacks[idx - 2].includes(c));
      })
      .filter((badge) => !!badge);


export {
  findDuplicates,
  getValue,
  calculateValue,
  findBadges,
};
