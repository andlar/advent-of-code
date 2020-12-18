import { doBadMath, extract, solve } from '../../src/2020/day18';
import { homework } from '../../src/2020/data/day18';

describe('utility functions', () => {
    it('should evaluate an expression', () => {
        let expression = '1 + 2 * 3 + 4 * 5 + 6';
        let result = doBadMath(expression);
        expect(result).toBe(71);
    });

    it('should evaluate an expression in parens', () => {
        let expression = '(1 + 2 * 3 + 4 * 5 + 6)';
        let result = doBadMath(expression);
        expect(result).toBe(71);
    });

    it('should extract sub-expressions', () => {
        let expression = '2 * 3 + (4 * 5)';
        let result = extract(expression);
        expect(result).toBe('2 * 3 + 20');
    });

    it('should resolve multiple sub-expressions', () => {
        let expression = '1 + (2 * 3) + (4 * (5 + 6))';
        let result = solve(expression);
        expect(result).toBe(51);
    });
});

describe('solutions', () => {
    it('should answer the homework questions', () => {
        let result = homework.reduce((sum, expression) => sum + solve(expression), 0);
        expect(result).toEqual(5019432542701);
    });

    xit('should know how many cubes exist in 4d space after 6 turns', () => {
        let next = growIn4d([input], 6);
        expect(countCubesIn4d(next)).toEqual(333); //687 is too low
    });
});
