import { getNeighbors, iterate, grow, growIn4d, countCubes, countCubesIn4d } from '../../src/2020/day17';
import { input } from '../../src/2020/data/day17';

let mock = [`.#.
..#
###`.split('\n')];

describe('utility functions', () => {
    it('should get neighbors when only one plane', () => {
        let grid = mock;
        expect(getNeighbors(grid, 0, 0, 0)).toEqual(1); // x, y, z
        expect(getNeighbors(grid, 1, 0, 0)).toEqual(1);
        expect(getNeighbors(grid, 2, 0, 0)).toEqual(2);
        expect(getNeighbors(grid, 1, 1, 0)).toEqual(5);
        expect(getNeighbors(grid, 2, 2, 0)).toEqual(2);
    });

    it('should get neighbors when three planes', () => {
        let grid = [
            ['#..', '..#', '.#.'],
            ['#.#', '.##', '.#.'],
            ['#..', '..#', '.#.'],
        ];
        expect(getNeighbors(grid, 0, 0, 0)).toEqual(2); // x, y, z
        expect(getNeighbors(grid, 1, 0, 1)).toEqual(8);
        expect(getNeighbors(grid, 2, 0, 2)).toEqual(4);
        expect(getNeighbors(grid, 1, 1, 1)).toEqual(10);
        expect(getNeighbors(grid, 2, 2, 0)).toEqual(5);
    });

    it('should iterate on step 0', () => {
        let next = iterate(mock);
        let target = [
            ['.....', '.....', '.#...', '...#.', '..#..'],
            ['.....', '.....', '.#.#.', '..##.', '..#..'],
            ['.....', '.....', '.#...', '...#.', '..#..'],
        ];
        expect(next.grid).toEqual(target);
    });

    it('should grow', () => {
        let next = grow(mock, 6);
        expect(countCubes(next)).toEqual(112);
    });

    it('should know how many cubes there are', () => {
        let grid = [['#..',
                     '..#',
                     '.#.'],
                    ['#.#',
                     '.##',
                     '.#.'],
                    ['#..',
                     '..#',
                     '.#.'],
                   ];
        expect(countCubes(grid)).toBe(11);
    });

    it('should grow in 4d', () => {
        let next = growIn4d([mock], 1);
        let flat = grow(mock, 1);
        console.log(next, flat);
        expect(countCubesIn4d(next)).toEqual(29);
        expect(countCubes(next)).toEqual(29);
    });

    xit('should grow in 4d six times', () => {
        let next = growIn4d(mock, 6);
        expect(countCubesIn4d(next)).toEqual(848);
    });
});

describe('solutions', () => {
    it('should know how many cubes there are after 6 turns', () => {
        let next = grow(input, 6);
        expect(countCubes(next)).toEqual(333);
    });

    xit('should know how many cubes exist in 4d space after 6 turns', () => {
        let next = growIn4d([input], 6);
        expect(countCubesIn4d(next)).toEqual(333); //687 is too low
    });
});
