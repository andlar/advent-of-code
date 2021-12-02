const badMove = (pos, vector) => {
  const newPos = {...pos};
  const items = vector.split(' ');
  switch (items[0]) {
    case 'forward':
      newPos.forward += parseInt(items[1], 10);
      break;
    case 'up':
      newPos.depth -= parseInt(items[1], 10);
      break;
    case 'down':
      newPos.depth += parseInt(items[1], 10);
      break;
  };
  return newPos;
};

const followSimpleCourse = (course) => {
  return course
    .split('\n')
    .reduce((position, vector) => {
      return badMove(position, vector);
    }, { forward: 0, depth: 0});
};

const move = (pos, vector) => {
  const newPos = {...pos};
  const items = vector.split(' ');
  switch (items[0]) {
    case 'forward':
      newPos.forward += parseInt(items[1], 10);
      newPos.depth += pos.aim * parseInt(items[1], 10);
      break;
    case 'up':
      newPos.aim -= parseInt(items[1], 10);
      break;
    case 'down':
      newPos.aim += parseInt(items[1], 10);
      break;
  };
  return newPos;
};

const followCourse = (course) => {
  return course
    .split('\n')
    .reduce((position, vector) => {
      return move(position, vector);
    }, { forward: 0, depth: 0, aim: 0});
};

export { badMove, followSimpleCourse, move, followCourse };
