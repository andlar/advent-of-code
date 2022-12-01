const findMaxElf = (elves) => {
  return Math.max(...elves.map((elf) => {
    const items = elf.split('\n').map((f) => parseInt(f, 10));
    const sum = items.reduce((total, f) => total + f, 0);
    return sum;
  }));
};

const findTopThree = (elves) => {
  const [a, b, c] = elves.map((elf) => {
    const items = elf.split('\n').map((f) => parseInt(f, 10));
    const sum = items.reduce((total, f) => total + f, 0);
    return sum;
  }).sort((a, b) => a < b ? 1 : -1);
  return a + b + c;
};

export {
  findMaxElf,
  findTopThree,
};
