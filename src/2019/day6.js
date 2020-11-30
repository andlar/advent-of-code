const buildMap = orbits => {
    let map = {};
    orbits.forEach(definition => {
        map = initObjects(map, definition);
        let objects = definition.split(')');
        map[objects[1]].around = objects[0];
    });
    return map;
}

const initObjects = (map, definition) => {
    definition.split(')').forEach(object => {
        if (!map[object]) {
            map[object] = {
                object: object,
                around: undefined,
            }
        }
    });
    return map;
}

const calcOrbit = (map, object) => {
    if (!map[object].around) {
        map[object].orbits = 0;
    } else {
        if (map[map[object].around].orbits === undefined) {
            map = calcOrbit(map, map[object].around);
        }
        map[object].orbits = 1 + map[map[object].around].orbits;
    }
    return map;
}

const checkSum = map => {
    Object.keys(map).forEach(key => {
        map = calcOrbit(map, key);
    });
    return Object.keys(map).reduce((acc, object) => acc + map[object].orbits, 0);
}

const pathToCenter = (map, start) => {
    let path = [];
    while (map[start].around) {
        path.push(map[start].around);
        start = map[start].around;
    }
    return path;
}

const findTransfers = (pathA, pathB) => {
    while (pathA[pathA.length - 1] === pathB[pathB.length - 1]) {
        pathA.pop();
        pathB.pop();
    }
    return pathA.length + pathB.length;
}

export { buildMap, calcOrbit, checkSum, pathToCenter, findTransfers };
