const countChars = (line) => {
  const code = line.length;
  let converted = line.slice(1, -1);
  converted = converted.replace(/\"/, 'Q');
  converted = converted.replace(/\\/, '|');
  return [code, converted.length, converted];
};

export {
  countChars,
};
