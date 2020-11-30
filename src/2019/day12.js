import { lcm } from './util';

const initMoon = definition => {
    let moon = {
        position: {},
        velocity: {x: 0, y: 0, z: 0},
    };
    definition.substring(1, definition.length - 1).split(', ').forEach(ele => {
        let elements = ele.split('=');
        moon.position[elements[0]] = parseInt(elements[1], 10);
    });
    return moon;
}

const calculateChange = (a, b) => {
    if (a === b) { return 0 }
    return a < b ? 1 : -1
}

const calculateVelocities = moons => {
    let nextMoons = {...moons};
    Object.keys(moons).forEach(keyA => {
        Object.keys(moons).filter(keyB => keyB !== keyA)
            .forEach(keyB => {
                nextMoons[keyA].velocity.x += calculateChange(moons[keyA].position.x, moons[keyB].position.x);
                nextMoons[keyA].velocity.y += calculateChange(moons[keyA].position.y, moons[keyB].position.y);
                nextMoons[keyA].velocity.z += calculateChange(moons[keyA].position.z, moons[keyB].position.z);
            });
    });
    return nextMoons;
}

const moveMoons = moons => {
    let nextMoons = {...moons};
    Object.keys(nextMoons).forEach(key => {
        nextMoons[key].position.x += nextMoons[key].velocity.x;
        nextMoons[key].position.y += nextMoons[key].velocity.y;
        nextMoons[key].position.z += nextMoons[key].velocity.z;
    });
    return nextMoons;
}

const tick = (moons, count) => {
    let nextMoons = {...moons};
    count = count || 1;
    for (let i = 0; i < count; i++) {
        nextMoons = calculateVelocities(nextMoons);
        nextMoons = moveMoons(nextMoons);
    }
    return nextMoons;
}

const getEnergy = moon => {
    return (Math.abs(moon.position.x) + Math.abs(moon.position.y) + Math.abs(moon.position.z))
        * (Math.abs(moon.velocity.x) + Math.abs(moon.velocity.y) + Math.abs(moon.velocity.z));
}

const getAllEnergy = moons => {
    return Object.keys(moons).reduce((acc, key) => acc + getEnergy(moons[key]), 0);
}

const getHash = (moons, direction) => {
    let hash = Object
        .keys(moons)
        .reduce((acc, key) =>
                acc + key + direction + moons[key].position[direction]
                + direction + moons[key].velocity[direction], '');
    return hash;
}

const getTicksForOnePosition = (moons, key) => {
    let history = {};
    let ticks = 0;
    while (!history[getHash(moons, key)]) {
        history[getHash(moons, key)] = true;
        ticks += 1;
        moons = tick(moons);
    }
    return ticks;
}

const getTicksBeforeRepeat = moons => {
    let history = {};
    let ticks = 0;
    let x = getTicksForOnePosition({...moons}, 'x');
    let y = getTicksForOnePosition({...moons}, 'y');
    let z = getTicksForOnePosition({...moons}, 'z');
    return lcm(lcm(x, y), z);
}

export { initMoon, calculateVelocities, moveMoons, tick, getEnergy, getAllEnergy, getHash, getTicksBeforeRepeat };
