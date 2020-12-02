const parseLine = line => ({
    min: parseInt(line.split('-')[0], 10),
    max: parseInt(line.split('-')[1].split(' ')[0], 10),
    ch: line.split(' ')[1].substring(0, 1),
    pw: line.split(' ')[2],
});

const validA = line => {
    const l = parseLine(line);
    const count = l.pw.split('').filter(c => c === l.ch).length;
    return l.min <= count && count <= l.max;
};

const validB = line => {
    const l = parseLine(line);
    return l.pw.charAt(l.min - 1) !== l.pw.charAt(l.max - 1) && (l.pw.charAt(l.min - 1) === l.ch || l.pw.charAt(l.max - 1) === l.ch);
}

const solve = (lines, test) => lines.filter(l => test(l)).length;

export { validA, validB, solve };
