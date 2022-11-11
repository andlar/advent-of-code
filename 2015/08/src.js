const countChars = (line) => {
  const code = line.length;
  const converted = line.slice(1, -1)
        .replace(/QQ/g, '"')
        .replace(/SS/g, '|')
        .replace(/UU../g, 'U');
  return [code, converted.length, converted];
};

const encode = (line) => {
  const code = line.length;
  const converted = line.slice(1, -1)
        .replace(/QQ/g, '||""')
        .replace(/SS/g, '||||')
        .replace(/UU../g, '||x..');
  return [code, converted.length + 6];
};

const getSize = (line, fn = countChars) => {
  const [code, str] = fn(line);
  return Math.abs(code - str);
};

const getFileSize = (lines, fn = countChars) => lines
      .reduce((size, line) => size += getSize(line, fn), 0);

export {
  countChars,
  encode,
  getSize,
  getFileSize,
};
