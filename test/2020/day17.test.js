import { initSpace, getNeighbors, iterate, grow } from '../../src/2020/day17';
import { input } from '../../src/2020/data/day17';

let mock = `.#.
..#
###`.split('\n');

describe('utility functions', () => {
    it('should init 3-D space', () => {
        let space = initSpace(mock);
        expect(space.has('0:0:0')).toBe(false);
        expect(space.has('1:0:0')).toBe(true);
        expect(space.has('2:1:0')).toBe(true);
        expect(space.has('2:2:0')).toBe(true);
    });

    it('should init 4-D space', () => {
        let part2 = true;
        let space = initSpace(mock, part2);
        expect(space.has('0:0:0:0')).toBe(false);
        expect(space.has('1:0:0:0')).toBe(true);
        expect(space.has('2:1:0:0')).toBe(true);
        expect(space.has('2:2:0:0')).toBe(true);
    });

    describe('given 3-D space', () => {
        let space;
        beforeEach(() => {
            space = initSpace(mock);
        });

        it('should get neighbors', () => {
            expect(getNeighbors(space, '0:0:0')).toEqual(1); // x, y, z
            expect(getNeighbors(space, '1:0:0')).toEqual(1);
            expect(getNeighbors(space, '2:0:0')).toEqual(2);
            expect(getNeighbors(space, '1:1:0')).toEqual(5);
            expect(getNeighbors(space, '2:2:0')).toEqual(2);
        });

        it('should iterate once', () => {
            space = iterate(space);
            expect(space.size).toBe(11);
        });

        it('should grow', () => {
            space = grow(space, 6);
            expect(space.size).toBe(112);
        });
    });

    describe('given 4-D space', () => {
        let space, part2;
        beforeEach(() => {
            part2 = true
            space = initSpace(mock, part2);
        });

        it('should get neighbors', () => {
            expect(getNeighbors(space, '0:0:0:0', part2)).toEqual(1); // x, y, z
            expect(getNeighbors(space, '1:0:0:0', part2)).toEqual(1);
            expect(getNeighbors(space, '2:0:0:0', part2)).toEqual(2);
            expect(getNeighbors(space, '1:1:0:0', part2)).toEqual(5);
            expect(getNeighbors(space, '2:2:0:0', part2)).toEqual(2);
        });

        it('should iterate once', () => {
            space = iterate(space, part2);
            expect(space.size).toBe(29);
        });

        it('should grow', () => {
            space = grow(space, 6, part2);
            expect(space.size).toBe(848);
        });
    });
});

describe('solutions', () => {
    it('should know how many cubes there are after 6 turns', () => {
        let space = initSpace(input);
        space = grow(space, 6);
        expect(space.size).toBe(333);
    });

    it('should know how many cubes there are after 6 turns', () => {
        let part2 = true;
        let space = initSpace(input, part2);
        space = grow(space, 6, part2);
        expect(space.size).toBe(2676);
    });
});
