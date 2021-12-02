const simpleMove = ([direction, size], pos = { forward: 0, depth: 0 }) => {
  if (direction === 'forward') {
    return {
      ...pos,
      forward: pos.forward += size,
    };
  }
  return {
    ...pos,
    depth: pos.depth += size * (direction === 'up' ? -1 : 1),
  };
};

const move = ([direction, size], pos = { forward: 0, depth: 0, aim: 0 }) => {
  if (direction === 'forward') {
    return {
      ...pos,
      forward: pos.forward += size,
      depth: pos.depth += pos.aim * size,
    };
  }
  return {
    ...pos,
    aim: pos.aim += size * (direction === 'up' ? -1 : 1),
  };
};

const navigate = (movement, course) => course
      .split('\n')
      .map((line) => line.split(' '))
      .map((vector) => [vector[0], parseInt(vector[1], 10)])
      .reduce((position, vector) => movement(vector, position), { forward: 0, depth: 0, aim: 0 });

const followSimpleCourse = (course) => navigate(simpleMove, course);

const followCourse = (course) => navigate(move, course);

export { simpleMove, followSimpleCourse, move, followCourse };
