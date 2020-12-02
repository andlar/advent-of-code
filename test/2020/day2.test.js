import { parseLine, validA, validB, solve } from '../../src/2020/day2';
import { data } from '../../src/2020/data/day2.data';
import { mock } from './data/day2.data';

describe('day 2a tests', () => {
    it('should parse lines', () => {
        expect(parseLine(mock[0])).toEqual({
            min: 1,
            max: 3,
            ch: 'a',
            pw: 'abcde',
        });
    });

    it('should validate passwords', () => {
        expect(validA(parseLine(mock[0]))).toBe(true);
        expect(validA(parseLine(mock[1]))).toBe(false);
        expect(validA(parseLine(mock[2]))).toBe(true);
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
        expect(validB(parseLine(mock[0]))).toBe(true);
        expect(validB(parseLine(mock[1]))).toBe(false);
        expect(validB(parseLine(mock[2]))).toBe(false);
    });

    it('should count valid passwords', () => {
        expect(solve(mock, validB)).toBe(1);
    });

    it('should cound valid real passwords', () => {
        expect(solve(data, validB)).toBe(313);
    });
});
