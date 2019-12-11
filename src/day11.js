import { runProgram, continueProgram } from './intcode';
import { getColor, paint, move } from './hull';
import { program } from './data/day11.data';
import { drawGrid } from './util';

const initRobot = () => {
    return {
        memory: [...program],
        input: [],
        output: [],
    }
}

const initHull = options => {
    let hull = {
        hull: {},
        robotLocation: '0:0',
        robotDirection: '^',
    }
    if (options && options.startingWithWhite) {
        hull.hull['0:0'] = '#';
    }
    return hull;
}

const paintHull = options => {
    let robot = runProgram(initRobot());
    let hull = initHull(options);
    let possiblyPaintedSpaces = {};
    while (!robot.done || robot.output.length > 0) {
        while (robot.output.length > 0) {
            possiblyPaintedSpaces[hull.robotLocation] = true;
            hull = paint(hull, robot.output.shift());
            hull = move(hull, robot.output.shift());
        }
        if (robot.awaitingInput) {
            robot.input.push(getColor(hull));
        }
        robot = continueProgram(robot);
    }
    if (options && options.startingWithWhite) {
        console.log(drawGrid(hull.hull));
        return drawGrid(hull.hull);
    } else {
        console.log(drawGrid(hull.hull));
        return possiblyPaintedSpaces;
    }
}

export { initRobot, initHull, paintHull };
