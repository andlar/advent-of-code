import { takeStep, arrayEquals, calculateSteps } from '../src/intcode';

describe('intcode tests', () => {
    it('should handle code 1', () => {
        expect(takeStep([1,9,10,3,2,3,11,0,99,30,40,50], 0)).toEqual([1,9,10,70,2,3,11,0,99,30,40,50]);
    });

    it('should handle code 2', () => {
        expect(takeStep([1,9,10,70,2,3,11,0,99,30,40,50], 4)).toEqual([3500,9,10,70,2,3,11,0,99,30,40,50]);
    });

    it('should handle code 99', () => {
        expect(takeStep([3500,9,10,70,2,3,11,0,99,30,40,50], 8)).toEqual({done: true, codes: [3500,9,10,70,2,3,11,0,99,30,40,50]});
    });

    it('should be able to compare arrays', () => {
        expect(arrayEquals([1, 2], [2, 1])).toBe(false);
        expect(arrayEquals([1, 2], [1, 2])).toBe(true);
    });

    it('should run through codes', () => {
        expect(calculateSteps([1,9,10,3,2,3,11,0,99,30,40,50]).codes).toEqual([3500,9,10,70,2,3,11,0,99,30,40,50]);
        expect(calculateSteps([1,0,0,0,99]).codes).toEqual([2,0,0,0,99]);
        expect(calculateSteps([2,3,0,3,99]).codes).toEqual([2,3,0,6,99]);
        expect(calculateSteps([2,4,4,5,99,0]).codes).toEqual([2,4,4,5,99,9801]);
        expect(calculateSteps([1,1,1,4,99,5,6,0,99]).codes).toEqual([30,1,1,4,2,5,6,0,99]);
    });

    it('should throw an error on bad opcode', () => {
        expect(() => {
            calculateSteps([3,9,10,3,2,3,11,0,99,30,40,50]);
        }).toThrowError('halt');
    });
});
