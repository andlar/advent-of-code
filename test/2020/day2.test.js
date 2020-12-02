import { validA, validB, solve } from '../../src/2020/day2';
import { data } from '../../src/2020/data/day2.data';
import { mock } from './data/day2.data';

describe('day 2a tests', () => {
    it('should validate passwords', () => {
        expect(validA(mock[0])).toBe(true);
        expect(validA(mock[1])).toBe(false);
        expect(validA(mock[2])).toBe(true);
    });

    it('should solve valid passwords', () => {
        expect(solve(mock, validA)).toBe(2);
    });

    it('should cound valid real passwords', () => {
        expect(solve(data, validA)).toBe(500);
    });
});

describe('day 2b tests', () => {
    it('should validate passwords', () => {
        expect(validB(mock[0])).toBe(true);
        expect(validB(mock[1])).toBe(false);
        expect(validB(mock[2])).toBe(false);
    });

    it('should count valid passwords', () => {
        expect(solve(mock, validB)).toBe(1);
    });

    it('should cound valid real passwords', () => {
        expect(solve(data, validB)).toBe(313);
    });
});
