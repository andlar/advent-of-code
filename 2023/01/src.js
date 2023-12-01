const findCalibrationValue = (line) => line
      .replace(/\D/g, '')
      .split('')
      .reduce((ret, val, idx, arr) => {
        if (idx === 0 && idx !== (arr.length - 1)) { return val; }
        if (idx !== 0 && idx === (arr.length - 1)) { return parseInt(`${ret}${val}`, 10); }
        if (idx !== 0 && idx !== (arr.length - 1)) { return ret; }
        return parseInt(`${val}${val}`, 10);
      }, '');

const convertText = (line) =>
      line
      .replace(/one/g, 'o1e')
      .replace(/two/g, 't2o')
      .replace(/three/g, 't3e')
      .replace(/four/g, 'f4r')
      .replace(/five/g, 'f5e')
      .replace(/six/g, 's6x')
      .replace(/seven/g, 's7n')
      .replace(/eight/g, 'e8t')
      .replace(/nine/g, 'n9e');

const findTextCalibrationValue = (line) => findCalibrationValue(convertText(line));

const findTotalCalibration = (lines, cv = findCalibrationValue) => lines.reduce((sum, line) => sum + cv(line), 0);

export {
  findCalibrationValue,
  findTextCalibrationValue,
  findTotalCalibration,
};
