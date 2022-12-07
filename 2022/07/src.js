const parseLine = (fs, dirs, loc, line) => {
  if (line === '$ cd /') {
    return [fs, dirs, ''];
  }
  if (line === '$ cd ..') {
    return [fs, dirs, loc.split(':').filter((v) => v).slice(0, -1).join(':')];
  }
  if (line.startsWith('dir')) {
    const [, dir] = line.split(' ');
    return [fs, [...dirs].concat(loc.split(':').filter((v) => v).concat(dir).join(':')), loc];
  }
  if (!line.startsWith('$')) {
    const [size, name] = line.split(' ');
    return [{
      ...fs,
      [loc.split(':').filter((v) => v).concat(name).join(':')]: parseInt(size, 10),
    }, dirs, loc];
  }
  if (line.startsWith('$ cd')) {
    const [, , dir] = line.split(' ');
    return [fs, dirs, loc.split(':').filter((v) => v).concat(dir).join(':')];
  }
  return [fs, dirs, loc];
};

const parseAll = (ins) => {
  let fs = {};
  let dirs = [];
  let loc = '';
  ins.forEach((line) => {
    [fs, dirs, loc] = parseLine(fs, dirs, loc, line);
  });
  return [fs, dirs, loc];
};

const analyzeDirs = (fs, dirs) => {
  return dirs.reduce((out, dir) => ({
    ...out,
    [dir]: Object.keys(fs).filter((f) => f.startsWith(`${dir}:`)).reduce((sum, f) => sum + fs[f], 0),
  }), {});
};

const findSum = (dirs) => Object.values(dirs).filter((val) => val <= 100000).reduce((sum, v) => sum + v, 0);

const findDeletable = (fs, dirs) => Math.min(...Object.values(dirs).filter((s) => s >= (30000000 - (70000000 - Object.values(fs).reduce((sum, f) => sum + f, 0)))));

export {
  parseLine,
  parseAll,
  analyzeDirs,
  findSum,
  findDeletable,
};
