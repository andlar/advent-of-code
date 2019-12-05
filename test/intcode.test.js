import { takeStep, arrayEquals, runProgram } from '../src/intcode';

let state;

describe('intcode tests', () => {
    beforeEach(() => {
        state = {
            memory: [],
            pointer: undefined,
            done: undefined,
            input: [],
            output: [],
        };
    });

    describe('codes', () => {
        it('should handle code 1', () => {
            state.memory = [1,9,10,3,2,3,11,0,99,30,40,50];
            state.pointer = 0;
            let nextState = takeStep(state);
            expect(nextState.memory).toEqual([1,9,10,70,2,3,11,0,99,30,40,50]);
            expect(nextState.pointer).toEqual(4);
            expect(nextState.done).toBeFalsy();
        });

        it('should handle code 2', () => {
            state.memory = [1,9,10,70,2,3,11,0,99,30,40,50];
            state.pointer = 4;
            let nextState = takeStep(state);
            expect(nextState.memory).toEqual([3500,9,10,70,2,3,11,0,99,30,40,50]);
            expect(nextState.pointer).toEqual(8);
            expect(nextState.done).toBeFalsy();
        });

        it('should handle code 3', () => {
            state.memory = [3,0];
            state.pointer = 0;
            state.input = [23];
            let nextState = takeStep(state);
            expect(nextState.pointer).toEqual(2);
            expect(nextState.input).toEqual([]);
            expect(nextState.memory).toEqual([23,0]);
        });

        it('should handle code 4', () => {
            state.memory = [4,0];
            state.pointer = 0;
            let nextState = takeStep(state);
            expect(nextState.pointer).toEqual(2);
            expect(nextState.output).toEqual([4]);
        });

        it('should handle code 99', () => {
            state.memory = [3500,9,10,70,2,3,11,0,99,30,40,50];
            state.pointer = 8;
            let nextState = takeStep(state);
            expect(nextState.memory).toEqual([3500,9,10,70,2,3,11,0,99,30,40,50]);
            expect(nextState.done).toBe(true);
        });

        it('should throw an error on bad opcode', () => {
            state.memory = [3500,9,10,70,2,3,11,0,99,30,40,50];
            state.pointer = 0;
            expect(() => {
                let nextState = takeStep(state);
            }).toThrowError('halt');
        });
    });

    it('should be able to compare arrays', () => {
        expect(arrayEquals([1, 2], [2, 1])).toBe(false);
        expect(arrayEquals([1, 2], [1, 2])).toBe(true);
    });

    describe('running programs', () => {
        it('should run through codes', () => {
            state.memory = [1,9,10,3,2,3,11,0,99,30,40,50];
            expect(runProgram(state).memory).toEqual([3500,9,10,70,2,3,11,0,99,30,40,50]);
        });

        it('should run through codes', () => {
            state.memory = [1,0,0,0,99];
            expect(runProgram(state).memory).toEqual([2,0,0,0,99]);
        });

        it('should run through codes', () => {
            state.memory = [2,3,0,3,99];
            expect(runProgram(state).memory).toEqual([2,3,0,6,99]);
        });

        it('should run through codes', () => {
            state.memory = [2,4,4,5,99,0];
            expect(runProgram(state).memory).toEqual([2,4,4,5,99,9801]);
        });

        it('should run through codes', () => {
            state.memory = [1,1,1,4,99,5,6,0,99];
            expect(runProgram(state).memory).toEqual([30,1,1,4,2,5,6,0,99]);
        });

        it('should read and write inputs', () => {
            state.memory = [3,0,4,0,99];
            state.input = [32];
            let endState = runProgram(state);
            expect(endState.memory).toEqual([32,0,4,0,99]);
            expect(endState.input).toEqual([]);
            expect(endState.output).toEqual([32]);
        });
    });
});
