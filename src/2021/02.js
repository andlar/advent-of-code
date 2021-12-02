const simpleMove = (vector, pos = { forward: 0, depth: 0 }) => {
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

const move = (vector, pos = { forward: 0, depth: 0, aim: 0 }) => {
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

const navigate = (movement, course) => course
      .split('\n')
      .reduce((position, vector) => movement(vector, position), { forward: 0, depth: 0, aim: 0 });

const followSimpleCourse = (course) => navigate(simpleMove, course);

const followCourse = (course) => navigate(move, course);

export { simpleMove, followSimpleCourse, move, followCourse };
