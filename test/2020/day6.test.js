import { filterOrs, filterAnds, getAll } from '../../src/2020/day6';
import { parseInput } from '../../src/2020/util';
import { customs } from '../../src/2020/data/day6';
import { mock } from './data/day6';

describe('utility functions', () => {
    it('should get or yesses', () => {
        expect(filterOrs(parseInput(mock)[0])).toBe(3);
        expect(filterOrs(parseInput(mock)[1])).toBe(3);
        expect(filterOrs(parseInput(mock)[2])).toBe(3);
        expect(filterOrs(parseInput(mock)[3])).toBe(1);
        expect(filterOrs(parseInput(mock)[4])).toBe(1);
    });

    it('should getAllOrYesses', () => {
        expect(getAll(mock, filterOrs)).toBe(11);
    });

    it('should get and yesses', () => {
        expect(filterAnds(parseInput(mock)[0])).toBe(3);
        expect(filterAnds(parseInput(mock)[1])).toBe(0);
        expect(filterAnds(parseInput(mock)[2])).toBe(1);
        expect(filterAnds(parseInput(mock)[3])).toBe(1);
        expect(filterAnds(parseInput(mock)[4])).toBe(1);
    });

    it('should getAllAndYesses', () => {
        expect(getAll(mock, filterAnds)).toBe(6);
    });
});

describe('solutions', () => {
    it('should solve part a', () => {
        expect(getAll(customs, filterOrs)).toBe(6911);
    });

    it('should solve part b', () => {
        expect(getAll(customs, filterAnds)).toBe(3473);
    });
});
