const parseElves = (row) => {
  const [a, b] = row.split(',').map((elf) => {
    const [start, end] = elf.split('-').map((v) => parseInt(v, 10));
    return { start, end };
  });
  return {
    startA: a.start,
    endA: a.end,
    startB: b.start,
    endB: b.end,
  };
};

const contains = (elves) => (elves.startA <= elves.startB && elves.endA >= elves.endB)
      || (elves.startA >= elves.startB && elves.endA <= elves.endB);

const countUnnecessary = (data, fn = contains) => data.map(parseElves)
      .filter(fn)
      .length;

const overlaps = (elves) =>  (elves.startA <= elves.startB && elves.endA >= elves.startB)
      || (elves.startA >= elves.startB && elves.startA <= elves.endB);

export {
  parseElves,
  contains,
  countUnnecessary,
  overlaps,
};
