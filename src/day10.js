import { Point } from './point';

const parseChart = chartData => {
    let output = [];
    chartData.split('\n')
        .forEach((row, y) => {
            row.split('')
                .forEach((col, x) => {
                    if (col === '#') {
                        output.push((new Point(x, y)).key());
                    }
                });
        });
    return output;
}

const findVectors = (origin, chart) => {
    let output = {};
    let start = Point.fromKey(origin);
    chart.forEach(p => {
        let target = Point.fromKey(p);
        output[Point.direction(start, target).key()] = true;
    });
    return output;
}

const generateVectorMap = chart => {
    let output = {};
    chart.forEach(origin => output[origin] = findVectors(origin, chart.filter(p => p !== origin)));
    return output;
}

const findBestLocation = vectorMap => {
    let max = 0;
    let best = '';
    Object.keys(vectorMap).forEach(key => {
        let len = Object.keys(vectorMap[key]).length;
        if (len > max) {
            best = key;
            max = len;
        }
    });
    let output = {};
    output[best] = max;
    return output;
}

const vaporize = (origin, direction, chart) => {
    let start = Point.fromKey(origin);
    let vector = Point.fromKey(direction);
    let laser = Point.add(start, vector);
    while (!chart.includes(laser.key())) {
        laser = Point.add(laser, vector);
    }
    return chart.filter(p => p !== laser.key());
}

const laserSweep = (origin, lasers, chart) => {
    let nextChart = [...chart];
    lasers.forEach(l => {
        nextChart = vaporize(origin, l, nextChart);
    });
    return nextChart;
}

const sortLasers = lasers => {
    let sortedLasers = lasers.sort((a, b) => {
        let pA = Point.fromKey(a);
        let pB = Point.fromKey(b);
        let ret = Math.atan2(pB.x, pB.y) - Math.atan2(pA.x, pA.y);
        return ret;
    });
    return sortedLasers;
}

const findNextToVaporize = (origin, direction, chart) => {
    let start = Point.fromKey(origin);
    let vector = Point.fromKey(direction);
    let laser = Point.add(start, vector);
    while (!chart.includes(laser.key())) {
        laser = Point.add(laser, vector);
    }
    return laser.key();
}

const findNthToVaporize = (origin, lasers, nth, chart) => {
    let nextChart = [...chart], totalVaporized = 0;
    while (totalVaporized < (nth - 1)) {
        nextChart = vaporize(origin, lasers.shift(), chart);
        totalVaporized += 1;
    }
    return findNextToVaporize(origin, lasers[0], chart);
}

export { parseChart, findVectors, generateVectorMap, findBestLocation, vaporize, laserSweep, sortLasers, findNextToVaporize, findNthToVaporize };
