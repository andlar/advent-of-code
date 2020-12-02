const parseLine = line => ({
    min: parseInt(line.split('-')[0], 10),
    max: parseInt(line.split('-')[1].split(' ')[0], 10),
    ch: line.split(' ')[1].substring(0, 1),
    pw: line.split(' ')[2],
});

const validA = line => {
    const count = line.pw.split('').filter(c => c === line.ch).length;
    return line.min <= count && count <= line.max;
};

const validB = line => {
    return line.pw.charAt(line.min - 1) !== line.pw.charAt(line.max - 1) && (line.pw.charAt(line.min - 1) === line.ch || line.pw.charAt(line.max - 1) === line.ch);
}

const solve = (lines, test) => lines
      .map(l => parseLine(l))
      .filter(l => test(l)).length;

export { parseLine, validA, validB, solve };
