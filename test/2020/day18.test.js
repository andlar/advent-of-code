import { doBadMath, doDifferentlyBadMath, extract, solve } from '../../src/2020/day18';
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

    it('should evaluate an expression with different precendence levels', () => {
        let expression = '1 + 2 * 3 + 4 * 5 + 6';
        let result = doDifferentlyBadMath(expression);
        expect(result).toBe(231);
    });

    it('should resolve multiple sub-expressions with different precedence', () => {
        let expression = '1 + (2 * 3) + (4 * (5 + 6))';
        let result = solve(expression, doDifferentlyBadMath);
        expect(result).toBe(51);
        result = solve('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))', doDifferentlyBadMath);
        expect(result).toBe(669060);
    });
});

describe('solutions', () => {
    it('should answer the homework questions', () => {
        let result = homework.reduce((sum, expression) => sum + solve(expression), 0);
        expect(result).toEqual(5019432542701);
    });

    it('should answer the 2nd homework questions', () => {
        let result = homework.reduce((sum, expression) => sum + solve(expression, doDifferentlyBadMath), 0);
        expect(result).toEqual(70518821989947);
    });
});
