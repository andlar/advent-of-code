import { Point } from '../src/point';

const genPoints = (origin, definition, label, trace) => {
    let steps = definition.split(',');
    let points = [new Point(0, 0)];
    trace['0:0'] = 'o';
    steps.forEach(def => {
        let nextSteps = takeSteps(points[points.length - 1], def);
        nextSteps.forEach((step, stepCount) => {
            if (!trace[step.key()]) {
                trace[step.key()] = label + '-' + (stepCount + points.length);
            } else if (!trace[step.key()].includes(label)) {
                trace[step.key()] = trace[step.key()] + '&' + label + '-' + (stepCount + points.length);
            }
        });
        points = points.concat(nextSteps);
    });
    return trace;
}

const takeSteps = (start, step) => {
    let points = [];
    let nextPoint = Point.copy(start);
    let direction = step.substring(0, 1);
    for (let i = 0; i < parseInt(step.substring(1), 10); i++) {
        switch (direction) {
        case 'R': nextPoint.x += 1; break;
        case 'U': nextPoint.y += 1; break;
        case 'L': nextPoint.x -= 1; break;
        case 'D': nextPoint.y -= 1; break;
        }
        points.push(nextPoint);
        nextPoint = Point.copy(nextPoint);
    }
    return points;
}

const getClosestDistance = points => {
    let distances = [];
    Object.keys(points).forEach(key => {
        if (points[key].includes('&')) {
            distances.push(Point.manhattanDistance(Point.fromKey(key), new Point(0, 0)));
        }
    });
    return distances.sort((a, b) => a - b)[0];
}

const getShortestPath = points => {
    let distances = [];
    Object.keys(points).forEach(key => {
        if (points[key].includes('&')) {
            distances.push(points[key].split('&').reduce((acc, val) => acc + parseInt(val.split('-')[1], 10), 0));
        }
    });
    return distances.sort((a, b) => a - b)[0];
}

const getGridBoundary = points => {
    let boundary = {
        maxX: 0,
        maxY: 0,
        minX: 0,
        minY: 0,
    }
    Object.keys(points).forEach(key => {
        let x = parseInt(key.split(':')[0], 10);
        let y = parseInt(key.split(':')[1], 10);
        if (x > boundary.maxX) { boundary.maxX = x };
        if (y > boundary.maxY) { boundary.maxY = y };
        if (x < boundary.minX) { boundary.minX = x };
        if (y < boundary.minY) { boundary.minY = y };
    });
    return boundary;
}

const drawGrid = (points, boundary) => {
    let grid = fillInBlanks(points, boundary);
    let ret = '';
    for (let y = boundary.maxY; y >= boundary.minY; y-- ) {
        for (let x = boundary.minX; x <= boundary.maxX; x++ ) {
            ret += points[x + ':' + y];
        }
        if (y !== boundary.minY) {
            ret += '|';
        }
    }
    return ret;
}


const fillInBlanks = (points, boundary) => {
    for (let x = boundary.minX; x <= boundary.maxX; x++ ) {
        for (let y = boundary.minY; y <= boundary.maxY; y++ ) {
            if (!points[x + ':' + y]) {
                points[x + ':' + y] = '.';
            }
        }
    }
    return points;
}
export { genPoints, getClosestDistance, getShortestPath, getGridBoundary, drawGrid };
