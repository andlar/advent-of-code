import { buildGrid, getNeighbors, iterate, settle, countPassengers } from '../../src/2020/day11';
import { input } from '../../src/2020/data/day11';
import { mock } from './data/day11';

describe('utility functions', () => {
    it('should get neighbors', () => {
        let grid = ['#.##.##.##',
                    '#######.##',
                    '#.#.#..#..',
                    '####.##.##',
                    '#.##.##.##',
                    '#.#####.##',
                    '..#.#.....',
                    '##########',
                    '#.######.#',
                    '#.#####.##'];
        expect(getNeighbors(grid, 0, 0)).toEqual(2); // x, then y
        expect(getNeighbors(grid, 1, 0)).toEqual(5);
        expect(getNeighbors(grid, 2, 0)).toEqual(4);
        expect(getNeighbors(grid, 9, 9)).toEqual(2);
    });

    it('should iterate on step 0', () => {
        let next = iterate(mock);
        expect(next.grid[0]).toBe('#.##.##.##');
        expect(next.grid[1]).toBe('#######.##');
        expect(next.grid[2]).toBe('#.#.#..#..');
        expect(next.grid[3]).toBe('####.##.##');
        expect(next.grid[4]).toBe('#.##.##.##');
        expect(next.grid[5]).toBe('#.#####.##');
        expect(next.grid[6]).toBe('..#.#.....');
        expect(next.grid[7]).toBe('##########');
        expect(next.grid[8]).toBe('#.######.#');
        expect(next.grid[9]).toBe('#.#####.##');
    });

    it('should iterate on step 1', () => {
        let next = iterate(mock);
        let second = iterate(next.grid);
        expect(second.grid[0]).toBe('#.LL.L#.##');
        expect(second.grid[1]).toBe('#LLLLLL.L#');
        expect(second.grid[2]).toBe('L.L.L..L..');
        expect(second.grid[3]).toBe('#LLL.LL.L#');
        expect(second.grid[4]).toBe('#.LL.LL.LL');
        expect(second.grid[5]).toBe('#.LLLL#.##');
        expect(second.grid[6]).toBe('..L.L.....');
        expect(second.grid[7]).toBe('#LLLLLLLL#');
        expect(second.grid[8]).toBe('#.LLLLLL.L');
        expect(second.grid[9]).toBe('#.#LLLL.##');
    });

    it('should know if seats changed', () => {
        let next = iterate(mock);
        let second = iterate(next.grid);
        expect(next.changed).toBe(true);
        expect(second.changed).toBe(true);
    });

    it('should settle down', () => {
        let final = settle(mock);
        expect(final.grid[0]).toBe('#.#L.L#.##');
        expect(final.grid[1]).toBe('#LLL#LL.L#');
        expect(final.grid[2]).toBe('L.#.L..#..');
        expect(final.grid[3]).toBe('#L##.##.L#');
        expect(final.grid[4]).toBe('#.#L.LL.LL');
        expect(final.grid[5]).toBe('#.#L#L#.##');
        expect(final.grid[6]).toBe('..L.L.....');
        expect(final.grid[7]).toBe('#L#L##L#L#');
        expect(final.grid[8]).toBe('#.LLLLLL.L');
        expect(final.grid[9]).toBe('#.#L#L#.##');
    });

    it('should know how many mock passengers there are', () => {
        let final = settle(mock);
        expect(countPassengers(final.grid)).toBe(37);
    });
});

describe('solutions', () => {
    it('should know how many real passengers there are', () => {
        let final = settle(input);
        expect(countPassengers(final.grid)).toBe(2299);
    });
});
