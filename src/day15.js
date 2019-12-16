import { runProgram, continueProgram } from './intcode';
import { drawGrid } from './util';
import { Point } from './point';
import { program } from './data/day15.data';

const initWorld = () => {
    let world = {
        grid: {'0:0': 'o'},
        droids: [{
            location: '0:0',
            history: [],
            droid: {
                memory: [...program],
                input: [],
                output: [],
            },
        }],
    }
    return world;
}

const spawnDroids = droid => {
    let droids = [];
    for (let direction = 1; direction <= 4; direction += 1) {
        let newDroid = {
            droid: {
                memory: [...droid.droid.memory],
                input: [...droid.history, direction],
                output: [],
            },
            history: [...droid.history, direction],
            location: droid.location,
        };
        droids.push(newDroid);
    };
    return droids;
}

const takeStep = (world, droid) => {
    let nextWorld = {...world};
    nextWorld.droids = [];
    let direction = droid.droid.input[droid.droid.input.length - 1];
    let nextLocation;
    switch (direction) {
    case 1:
        nextLocation = Point.fromKey(droid.location);
        nextLocation.y += 1;
        break;
    case 2:
        nextLocation = Point.fromKey(droid.location);
        nextLocation.x += 1;
        break;
    case 3:
        nextLocation = Point.fromKey(droid.location);
        nextLocation.y -= 1;
        break;
    case 4:
        nextLocation = Point.fromKey(droid.location);
        nextLocation.x -= 1;
        break;
    default:
        console.log(world, droid, direction);
    }
    //nextWorld.droids = nextWorld.droids.filter(d => d.location !== droid.location);
    if (!world.grid[nextLocation.key()]) {
        let nextDroid = {
            history: [...droid.history],
            location: nextLocation.key(),
            droid: runProgram(droid.droid),
        };
        switch (nextDroid.droid.output[droid.droid.output.length - 1]) {
        case 0:
            nextWorld.grid[nextLocation.key()] = '#';
            //nextWorld.droids = nextWorld.droids.filter(d => d.location !== droid.location);
            break;
        case 1:
            nextWorld.grid[nextLocation.key()] = '.';
            nextWorld.droids.push(nextDroid);
            break;
        default:
            console.log(nextDroid);
        }
    }
    return nextWorld;
}

const explore = world => {
    let nextWorld = {...world};
    let activeDroids = [];
    let nextDroids = [];
    world.droids.forEach(d => {
        activeDroids = activeDroids.concat(spawnDroids(d));
    });
    //activeDroids.forEach(d => console.log(d.history, d.droid.input));
    activeDroids.forEach(d => {
        nextWorld = takeStep(nextWorld, d);
        nextDroids = nextDroids.concat(nextWorld.droids);
    });
    //nextDroids.forEach(d => console.log(d.history, d.droid.output));
    nextWorld.droids = nextDroids;
    //console.log(nextWorld);
    //console.log(nextWorld.droids.map(d => d.location));
    return nextWorld;
}

export { initWorld, spawnDroids, takeStep, explore };
