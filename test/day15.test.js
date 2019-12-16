import { runProgram } from '../src/intcode';
import { initWorld, spawnDroids, takeStep, explore } from '../src/day15';
import { drawGrid } from '../src/util';

describe('day 15', () => {
    describe('part 1', () => {
        it('should initalize a world', () => {
            let world = initWorld();
            expect(world.grid).toEqual({'0:0':'o'});
            expect(world.droids[0].location).toBe('0:0');
            expect(world.droids[0].history).toEqual([]);
            expect(world.droids[0].droid.memory.length).toBe(1045);
            expect(world.droids[0].droid.input).toEqual([]);
            expect(world.droids[0].droid.output).toEqual([]);
        });

        describe('wrt droids', () => {
            let world;
            beforeEach(() => world = initWorld());

            describe('when spawning', () => {
                it('should spawn droids', () => {
                    let droids = spawnDroids(world.droids[0]);
                    expect(droids.length).toBe(4);
                    for (let i = 0; i < 4; i++) {
                        expect(droids[i].droid.memory.length).toBe(1045);
                        expect(droids[i].droid.input.length).toBe(1);
                    };
                });

                it('should spawn droids with history', () => {
                    world.droids[0].history = [1,2,3,4];
                    let droids = spawnDroids(world.droids[0]);
                    expect(droids.length).toBe(4);
                    for (let i = 0; i < 4; i++) {
                        expect(droids[i].droid.memory.length).toBe(1045);
                        expect(droids[i].droid.input.length).toBe(5);
                        expect(droids[i].history.length).toBe(5);
                    };
                });
            });

            describe('when moving', () => {
                it('should go north and hit a wall', () => {
                    world.droids[0].droid.input.push(1);
                    world = takeStep(world, world.droids[0]);
                    expect(world.grid).toEqual({
                        '0:0': 'o',
                        '0:1': '#',
                    })
                    expect(world.droids.length).toBe(0);
                });

                it('should go east and hit a wall', () => {
                    world.droids[0].droid.input.push(2);
                    world = takeStep(world, world.droids[0]);
                    expect(world.grid).toEqual({
                        '0:0': 'o',
                        '1:0': '#',
                    })
                    expect(world.droids.length).toBe(0);
                });

                it('should go south and hit a wall', () => {
                    world.droids[0].droid.input.push(3);
                    world = takeStep(world, world.droids[0]);
                    expect(world.grid).toEqual({
                        '0:0': 'o',
                        '0:-1': '#',
                    })
                    expect(world.droids.length).toBe(0);
                });

                it('should go west and find a space', () => {
                    world.droids[0].droid.input.push(4);
                    world = takeStep(world, world.droids[0]);
                    expect(world.grid).toEqual({
                        '0:0': 'o',
                        '-1:0': '.',
                    })
                    expect(world.droids.length).toBe(1);
                    expect(world.droids[0].location).toBe('-1:0');
                });

                it('should stop if it finds an explored space', () => {
                    world.droids[0].droid.input.push(4);
                    world.grid['-1:0'] = '.';
                    world = takeStep(world, world.droids[0]);
                    expect(world.droids.length).toBe(0);
                });

                it('should go a few steps', () => {
                    world.droids[0].droid.input = [4, 3, 4, 3, 4]
                    world = takeStep(world, world.droids[0]);
                    world = takeStep(world, world.droids[0]);
                    world = takeStep(world, world.droids[0]);
                    world = takeStep(world, world.droids[0]);
                    console.log(drawGrid(world.grid));
                    expect(world.grid).toEqual({
                        '0:0': 'o',
                        '-1:0': '.',
                    })
                    expect(world.droids.length).toBe(1);
                    expect(world.droids[0].location).toBe('-1:0');
                });

            });

            describe('when exploring', () => {
                it('should take steps', () => {
                    let nextWorld = explore(world);
                    expect(world.grid).toEqual({
                        '0:0': 'o',
                        '-1:0': '.',
                        '1:0': '#',
                        '0:1': '#',
                        '0:-1': '#',
                    });
                    nextWorld = explore(nextWorld);
                    expect(world.grid).toEqual({
                        '0:0': 'o',
                        '-1:0': '.',
                        '1:0': '#',
                        '0:1': '#',
                        '0:-1': '#',
                        '-1:-1': '.',
                        '-1:1': '#',
                        '-2:0': '#',
                    });
                });
            });

            xit('should find the oxygen', () => {
                let nextWorld = explore(world);
                for (let i = 0; i < 5; i++) {
                    nextWorld = explore(nextWorld);
                }
                console.log(drawGrid(nextWorld.grid), nextWorld.droids.length);
                //nextWorld.droids.forEach(d => console.log(d.history, d.droid.output, d.droid.input));
            });
        });
    });

    describe('part 2', () => {

    });
});
