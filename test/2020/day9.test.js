import { makesASum, isASum, firstInvalid, findSums } from '../../src/2020/day9';
import { input } from '../../src/2020/data/day9';
import { mock } from './data/day9';

describe('utility functions', () => {
    it('knows if an array can make a sum', () => {
        expect(makesASum([35,20,15,25,47], 40)).toBe(true);
        expect(makesASum([35,20,15,25,47], 1)).toBe(false);
    });

    it('checks a value', () => {
        expect(isASum(mock, 1)).toBe(true);
        expect(isASum(mock, 5)).toBe(true);
        expect(isASum(mock, 14)).toBe(false);
    });

    it('finds the first invalid line', () => {
        expect(firstInvalid(mock)).toBe(127);
    });

    it('finds a contiguous sum', () => {
        let out = findSums(mock, 127);
        expect(out).toEqual({min: 15, max: 47, total: 62});
    });
});

describe('solutions', () => {
    it('finds the first solution', () => {
        expect(firstInvalid(input, 25)).toBe(133015568); // not the value: "30" (including the quotes)
    });

    it('finds the second solution', () => {
        let out = findSums(input, 133015568);
        expect(out.total).toBe(16107959);
    });
});
