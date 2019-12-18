import { runProgram, continueProgram } from './intcode';
import { drawGrid } from './util';
import { Point } from './point';
import { program } from './data/day17.data';

const initScaffolds = () => {
    let ascii = {
        memory: [...program],
        input: [],
        output: [],
    }
    ascii = runProgram(ascii);
    return ascii.output;
}

const makeGrid = scaffolds => {
    let grid = {};
    let y = 0, x = 0;
    scaffolds.forEach((code, idx) => {
        if (code === 10) {
            y += 1;
            x = -1;
        } else {
            grid[x + ':' + y] = String.fromCharCode(code);
        }
        x += 1;
    });
    return grid;
}

const findIntersections = grid => {
    let intersections = [];
    Object.keys(grid).forEach(c => {
        let center = Point.fromKey(c);
        if (grid[center.x + ':' + center.y] === '#'
            && grid[(center.x + 1) + ':' + center.y] === '#'
            && grid[(center.x - 1) + ':' + center.y] === '#'
            && grid[center.x + ':' + (center.y + 1)] === '#'
            && grid[center.x + ':' + (center.y - 1)] === '#') {
            intersections.push(c);
        }
    });
    return intersections;
}

const getAlignmentsSum = intersections => {
    return intersections.reduce((acc, cur) => {
        let alignment = Point.fromKey(cur);
        return acc + alignment.x * alignment.y;
    }, 0);
}

export { initScaffolds, makeGrid, findIntersections, getAlignmentsSum };
