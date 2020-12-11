import { evaluateAdapters } from '../../src/2020/day10';
import { input } from '../../src/2020/data/day10';
import { mock, mock2 } from './data/day10';

describe('utility functions', () => {
    it('should evaluate the adapters', () => {
        expect(evaluateAdapters(mock)).toEqual({1: 7, 3: 5, total: 35});
        expect(evaluateAdapters(mock2)).toEqual({1: 22, 3: 10, total: 220});
    });
});

describe('solutions', () => {
    it('finds the first solution', () => {
        expect(evaluateAdapters(input)).toEqual({1: 66, 3: 32, total: 2112});
    });

    xit('finds the second solution', () => {
        expect(findShorterChains(input).length).toBe(3022415986688);
        // found via Excel
    });
});
