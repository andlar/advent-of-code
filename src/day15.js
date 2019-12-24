import { runProgram, continueProgram } from './intcode';
import { drawGrid } from './util';
import { Point } from './point';
import { program, paths } from './data/day15.data';

const initGrid = () => {
    let grid = {
        '0:0': 'o',
    };
    return grid;
}

const walk = directions => {
    let droid = {
        memory: [...program],
        input: [...directions],
        output: [],
    };
    let nextDroid = runProgram(droid);
    let steps = nextDroid.output.map(s => {
        switch (s) {
        case 0: return '#';
        case 1: return '.';
        default: return '?';
        }
    });
    return steps;
}

const parseMovement = (directions, steps) => {
    let grid = {'0:0': 'o'};
    let location = new Point(0,0);
    let direction, step;
    while (directions && directions.length > 0) {
        let direction = directions.shift();
        let step = steps.shift();
        switch (direction) {
        case 1: //north
            location.y += 1;
            break;
        case 2: //south
            location.y -= 1;
            break;
        case 3: //west
            location.x -= 1;
            break;
        case 4: //east
            location.x += 1;
            break;
        default:
            console.log(grid, direction, step, location);
        }
        grid[location.key()] = step;
    }
    return { grid: grid, lastLocation: location.key() };
}

const explore = stepCount => {
    let grid = {};
    let directions = [];
    let activePath, steps, output;
    let pathsToExplore = [[]];
    let step = 0;
    let solution = {};
    while (pathsToExplore && pathsToExplore.length > 0) {
        directions = pathsToExplore.shift();
        for (let i = 1; i <= 4; i++) {
            activePath = [...directions, i];
            steps = walk(activePath);
            let endedOnOpenSpace = steps[steps.length - 1] === '.';
            if (steps[steps.length - 1] === '?') {
                solution.activePath = [...directions, i];
                solution.steps = [...steps];
            }
            output = parseMovement(activePath, steps);
            if (step < stepCount || stepCount === undefined) {
                if (endedOnOpenSpace && !grid[output.lastLocation]) {
                    pathsToExplore.push([...directions, i]);
                }
            }
            grid = {...grid, ...output.grid};
        }
        step += 1;
    }
    return { grid: grid, solution: solution};
}

const drawMaze = () => {
    return drawGrid(paths);
}

export { initGrid, walk, parseMovement, explore, drawMaze };
