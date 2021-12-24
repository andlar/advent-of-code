const explode = (number) => {
  let count = 0,
      left = 0,
      right = 0,
      pivot = false;
  const digits = /\d\d?/;
  number.split('').forEach((c, idx) => {
    if (c === '[') { count += 1; };
    if (c === ']') { count -= 1; };
    if (c === ',' && count === 5 && !pivot) {
      left = parseInt(number.substring(idx - 2, idx).match(digits), 10);
      right = parseInt(number.substring(idx + 1, idx + 3).match(digits), 10);
      pivot = idx;
    }
  });
  if (pivot) {
    let nextLeft = number
        .substring(0, pivot - (left > 9 ? 3 : 2))
        .split('')
        .reverse()
        .join('')
        .replace(digits, (match) => (parseInt(match
                                              .split('')
                                              .reverse()
                                              .join(''), 10) + left).toString()
                 .split('')
                 .reverse()
                 .join(''))
        .split('')
        .reverse()
        .join('');
    let nextRight = number
        .substring(pivot + (right > 9 ? 4 : 3))
        .replace(digits, (match) => parseInt(match, 10) + right);
    return `${nextLeft}0${nextRight}`;
  }
  return number;
};

const split = (number) => {
  const digits = /\d\d/;
  return number.replace(digits, (match) => {
    const val = parseInt(match, 10);
    const left = Math.floor(val / 2);
    const right = Math.ceil(val / 2);
    return `[${left},${right}]`;
  });
};

const reduce = (number) => {
  let next = explode(number);
  if (number !== next) { return reduce(next); }
  next = split(number);
  if (number !== next) { return reduce(next); }
  return next;
};

const add = (n1, n2) => reduce(`[${n1},${n2}]`);

const addAll = (numbers) => {
  let output = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    output = add(output, numbers[i]);
  };
  return output;
};

const getMagnitude = (number) => {
  const leaf = /^\d$/;
  if (number.match(leaf)) {
    return parseInt(number, 10);
  }
  let left = '',
      right = '',
      splitFound = false,
      count = 0;
  number.substring(1, number.length - 1).split('').forEach((c) => {
    switch (c) {
      case '[':
        count += 1;
        splitFound ? right += c : left += c;
        break;
      case ']':
        count -= 1;
        splitFound ? right += c : left += c;
        break;
      case ',':
        if (count === 0) {
          splitFound = true;
        } else {
          splitFound ? right += c : left += c;
        }
        break;
      default:
        splitFound ? right += c : left += c;
    }
  });
  return 3 * getMagnitude(left) + 2 * getMagnitude(right);
};

const findLargest = (numbers) => {
  let largest = 0;
  for (const n1 of numbers) {
    for (const n2 of numbers) {
      if (n1 !== n2) {
        let magnitude = getMagnitude(add(n1, n2));
        if (magnitude > largest) { largest = magnitude; }
        magnitude = getMagnitude(add(n2, n1));
        if (magnitude > largest) { largest = magnitude; }
      }
    }
  }
  return largest;
};

export {
  explode,
  split,
  reduce,
  add,
  addAll,
  getMagnitude,
  findLargest,
};
