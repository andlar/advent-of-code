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

const getClosestDistance = grid => {
    let distances = [];
    Object.keys(grid).forEach(key => {
        if (grid[key].includes('&')) {
            distances.push(Point.manhattanDistance(Point.fromKey(key), new Point(0, 0)));
        }
    });
    return distances.sort((a, b) => a - b)[0];
}

const getShortestPath = grid => {
    let distances = [];
    Object.keys(grid).forEach(key => {
        if (grid[key].includes('&')) {
            distances.push(grid[key].split('&').reduce((acc, val) => acc + parseInt(val.split('-')[1], 10), 0));
        }
    });
    return distances.sort((a, b) => a - b)[0];
}

export { genPoints, getClosestDistance, getShortestPath };
