import { Point } from './point.js';

const getColor = state => {
    return state.hull[state.robotLocation] === '#' ? 1 : 0;
}

const paint = (state, color) => {
    let nextState = {
        hull: {...state.hull},
        robotLocation: state.robotLocation,
        robotDirection: state.robotDirection,
    }
    nextState.hull[state.robotLocation] = color === 0 ? '.' : '#';
    return nextState;
}

const move = (state, direction) => {
    let nextState = {
        hull: {...state.hull},
        robotLocation: state.robotLocation,
        robotDirection: state.robotDirection,
    }
    let robot = Point.fromKey(state.robotLocation);
    switch (state.robotDirection) {
    case '^':
        robot.x += direction === 0 ? -1 : 1;
        nextState.robotDirection = direction === 0 ? '<' : '>';
        break;
    case '<':
        robot.y += direction === 0 ? -1 : 1;
        nextState.robotDirection = direction === 0 ? 'v' : '^';
        break;
    case '>':
        robot.y += direction === 0 ? 1 : -1;
        nextState.robotDirection = direction === 0 ? '^' : 'v';
        break;
    case 'v':
        robot.x += direction === 0 ? 1 : -1;
        nextState.robotDirection = direction === 0 ? '>' : '<';
        break;
    }
    nextState.robotLocation = robot.key();
    return nextState;
}

export { getColor, paint, move };
