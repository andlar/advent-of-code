import { runProgram } from '../src/intcode';
import { input } from './data/day9.data';

describe('day 9 tests', () => {
    describe('part 1', () => {
        it('should get the diagnostic code', () => {
            let state = {
                memory: [...input],
                input: [1],
                output: [],
            }
            expect(runProgram(state).output).toEqual([3460311188]);
        });
    });

    describe('part 2', () => {
        it('should get the distress signal', () => {
            let state = {
                memory: [...input],
                input: [2],
                output: [],
            }
            expect(runProgram(state).output).toEqual([42202]);
        });
    });
});
