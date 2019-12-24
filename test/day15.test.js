import { runProgram } from '../src/intcode';
import { initGrid, walk, parseMovement, explore } from '../src/day15';
import { drawGrid } from '../src/util';

describe('day 15', () => {
    describe('part 1', () => {
        it('should initalize a grid', () => {
            let grid = initGrid();
            expect(grid).toEqual({'0:0':'o'});
        });

        describe('droids', () => {
            describe('when moving', () => {
                it('should go north and hit a wall', () => {
                    let steps = walk([1]);
                    expect(steps).toEqual(['#']);
                });

                it('should go south and hit a wall', () => {
                    let steps = walk([2]);
                    expect(steps).toEqual(['#']);
                });

                it('should go west and hit a wall', () => {
                    let steps = walk([3]);
                    expect(steps).toEqual(['#']);
                });

                it('should go east and find a space', () => {
                    let steps = walk([4]);
                    expect(steps).toEqual(['.']);
                });

                it('should take two steps', () => {
                    let steps = walk([4, 4]);
                    expect(steps).toEqual(['.', '.']);
                });

                it('should take three steps', () => {
                    let steps = walk([4, 4, 1]);
                    expect(steps).toEqual(['.', '.', '#']);
                });
            });

            describe('when interpreting movement', () => {
                let directions, steps;

                it('should build a map of results with simple steps', () => {
                    directions = [1];
                    steps = ['#'];
                    let output = parseMovement(directions, steps);
                    expect(output.grid).toEqual({
                        '0:0': 'o',
                        '0:1': '#',
                    });
                    expect(output.lastLocation).toBe('0:1');
                });

                it('should build a map of results with a few steps', () => {
                    directions = [4, 4, 1];
                    steps = ['.', '.', '#'];
                    let output = parseMovement(directions, steps);
                    expect(output.grid).toEqual({
                        '0:0': 'o',
                        '1:0': '.',
                        '2:0': '.',
                        '2:1': '#',
                    });
                    expect(output.lastLocation).toBe('2:1');
                });
            });
        });

        describe('when exploring', () => {
            it('should explore one step', () => {
                let grid = explore(0);
                expect(grid).toEqual({
                    '0:0': 'o',
                    '-1:0': '#',
                    '1:0': '.',
                    '0:1': '#',
                    '0:-1': '#',
                });
            });

            it('should explore three steps', () => {
                let grid = explore(2);
                expect(grid).toEqual({
                    '-1:0': '#',
                    '0:-1': '#',
                    '0:0': 'o',
                    '0:1': '#',
                    '1:0': '.',
                    '1:1': '#',
                    '1:-1': '#',
                    '2:-1': '.',
                    '2:0': '.',
                    '2:1': '#',
                    '3:0': '#',
                });
            });

            it('should explore more steps', () => {
                let grid = explore(420);
                console.log(drawGrid(grid));
                expect(Object.keys(grid).length).toBe(932);
            });
        });
    });

    describe('part 2', () => {

    });
});
