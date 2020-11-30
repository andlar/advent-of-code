import { input, samples } from './data/day12.data';

import { initMoon, calculateVelocities, moveMoons, tick, getEnergy, getAllEnergy, getHash, getTicksBeforeRepeat } from '../src/day12';

describe('day 12 tests', () => {
    describe('part 1', () => {
        it('should create a moon', () => {
            let io = initMoon(input[0]);
            expect(io.position).toEqual({x: -9, y: 10, z: -1});
            expect(io.velocity).toEqual({x: 0, y: 0, z: 0});
        });

        it('should calculate velocities between io and europa', () => {
            let moons = {
                io: initMoon(input[0]),
                europa: initMoon(input[1]),
            }
            moons = calculateVelocities(moons);
            expect(moons.io.velocity).toEqual({x: -1, y: -1, z: 1});
            expect(moons.europa.velocity).toEqual({x: 1, y: 1, z: -1});
        });

        it('should calculate velocities between ganymede and callisto', () => {
            let moons = {
                ganymede: initMoon(input[2]),
                callisto: initMoon(input[3]),
            }
            moons = calculateVelocities(moons);
            expect(moons.ganymede.velocity).toEqual({x: -1, y: 1, z: 1});
            expect(moons.callisto.velocity).toEqual({x: 1, y: -1, z: -1});
        });

        it('should calculate velocities between all four', () => {
            let moons = {
                io: initMoon(input[0]),
                europa: initMoon(input[1]),
                ganymede: initMoon(input[2]),
                callisto: initMoon(input[3]),
            }
            moons = calculateVelocities(moons);
            expect(moons.io.velocity).toEqual({x: -1, y: -3, z: 3});
            expect(moons.europa.velocity).toEqual({x: 1, y: 3, z: -3});
            expect(moons.ganymede.velocity).toEqual({x: -3, y: 1, z: 1});
            expect(moons.callisto.velocity).toEqual({x: 3, y: -1, z: -1});
        });

        it('should move a moon', () => {
            let moons = {
                io: initMoon(input[0]),
            }
            moons.io.velocity = {x: -1, y: -1, z: 1};
            moons = moveMoons(moons);
            expect(moons.io.position).toEqual({x: -10, y: 9, z: 0});
        });

        it('should move calculate and move moons', () => {
            let moons = {
                io: initMoon(samples[0][0]),
                europa: initMoon(samples[0][1]),
                ganymede: initMoon(samples[0][2]),
                callisto: initMoon(samples[0][3]),
            }
            moons = tick(moons);
            expect(moons.io.position).toEqual({x: 2, y: -1, z: 1});
            expect(moons.europa.position).toEqual({x: 3, y: -7, z: -4});
            expect(moons.ganymede.position).toEqual({x: 1, y: -7, z: 5});
            expect(moons.callisto.position).toEqual({x: 2, y: 2, z: 0});
            expect(moons.io.velocity).toEqual({x: 3, y: -1, z: -1});
            expect(moons.europa.velocity).toEqual({x: 1, y: 3, z: 3});
            expect(moons.ganymede.velocity).toEqual({x: -3, y: 1, z: -3});
            expect(moons.callisto.velocity).toEqual({x: -1, y: -3, z: 1});
        });

        it('should move calculate and move moons multiple times', () => {
            let moons = {
                io: initMoon(samples[0][0]),
                europa: initMoon(samples[0][1]),
                ganymede: initMoon(samples[0][2]),
                callisto: initMoon(samples[0][3]),
            }
            moons = tick(moons, 10);
            expect(moons.io.position).toEqual({x: 2, y: 1, z: -3});
            expect(moons.europa.position).toEqual({x: 1, y: -8, z: 0});
            expect(moons.ganymede.position).toEqual({x: 3, y: -6, z: 1});
            expect(moons.callisto.position).toEqual({x: 2, y: 0, z: 4});
            expect(moons.io.velocity).toEqual({x: -3, y: -2, z: 1});
            expect(moons.europa.velocity).toEqual({x: -1, y: 1, z: 3});
            expect(moons.ganymede.velocity).toEqual({x: 3, y: 2, z: -3});
            expect(moons.callisto.velocity).toEqual({x: 1, y: -1, z: -1});
        });

        it('should know the energy of a moon', () => {
            let moon = {
                position: {x: 2, y: 1, z: -3},
                velocity: {x: -3, y: -2, z: 1},
            }
            expect(getEnergy(moon)).toBe(36);
        });

        it('should know the energy of multiple moons', () => {
            let moons = {
                moonA: {
                    position: {x: 2, y: 1, z: -3},
                    velocity: {x: -3, y: -2, z: 1},
                },
                moonB: {
                    position: {x: 2, y: 1, z: -3},
                    velocity: {x: -3, y: -2, z: 1},
                }
            }
            expect(getAllEnergy(moons)).toBe(72);
        });

        it('should solve', () => {
            let moons = {
                io: initMoon(input[0]),
                europa: initMoon(input[1]),
                ganymede: initMoon(input[2]),
                callisto: initMoon(input[3]),
            }
            moons = tick(moons, 1000);
            expect(getAllEnergy(moons)).toBe(8538);
        });
    });

    describe('part 2', () => {
        it('should hash the state of moons by key', () => {
            let moons = {
                io: initMoon(input[0]),
                europa: initMoon(input[1]),
                ganymede: initMoon(input[2]),
                callisto: initMoon(input[3]),
            }
            let state = getHash(moons, 'x');
            expect(state).toBe('iox-9x0europax-14x0ganymedex1x0callistox-19x0');
        });

        it('should know when the first sample repeats', () => {
            let moons = {
                io: initMoon(samples[0][0]),
                europa: initMoon(samples[0][1]),
                ganymede: initMoon(samples[0][2]),
                callisto: initMoon(samples[0][3]),
            }
            let count = getTicksBeforeRepeat(moons);
            expect(count).toBe(2772);
        });

        it('should know when the second sample repeats', () => {
            let moons = {
                io: initMoon(samples[1][0]),
                europa: initMoon(samples[1][1]),
                ganymede: initMoon(samples[1][2]),
                callisto: initMoon(samples[1][3]),
            }
            let count = getTicksBeforeRepeat(moons);
            expect(count).toBe(4686774924);
        });

        it('should solve', () => {
            let moons = {
                io: initMoon(input[0]),
                europa: initMoon(input[1]),
                ganymede: initMoon(input[2]),
                callisto: initMoon(input[3]),
            }
            let count = getTicksBeforeRepeat(moons);
            expect(count).toBe(506359021038056);
        });
    });
});
