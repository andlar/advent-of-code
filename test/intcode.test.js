import { takeStep, arrayEquals, runProgram } from '../src/intcode';

let state;

describe('intcode tests', () => {
    beforeEach(() => {
        state = {
            memory: [],
            pointer: 0,
            done: undefined,
            input: [],
            output: [],
        };
    });

    describe('codes', () => {
        describe('arithmetic', () => {
            it('should handle code 1', () => {
                state.memory = '01,9,10,3,2,3,11,0,99,30,40,50'.split(',').map(s => parseInt(s, 10));
                let nextState = takeStep(state);
                expect(nextState.memory).toEqual([1,9,10,70,2,3,11,0,99,30,40,50]);
                expect(nextState.pointer).toEqual(4);
                expect(nextState.done).toBeFalsy();
            });

            it('should handle code 2', () => {
                state.memory = '1,9,10,70,02,3,11,0,99,30,40,50'.split(',').map(s => parseInt(s, 10));
                state.pointer = 4;
                let nextState = takeStep(state);
                expect(nextState.memory).toEqual([3500,9,10,70,2,3,11,0,99,30,40,50]);
                expect(nextState.pointer).toEqual(8);
                expect(nextState.done).toBeFalsy();
            });
        });
        describe('io', () => {
            it('should handle code 3', () => {
                state.memory = '03,0'.split(',').map(s => parseInt(s, 10));
                state.input = [23];
                let nextState = takeStep(state);
                expect(nextState.pointer).toEqual(2);
                expect(nextState.input).toEqual([]);
                expect(nextState.memory).toEqual([23,0]);
            });

            it('should handle code 4', () => {
                state.memory = '04,0'.split(',').map(s => parseInt(s, 10));
                let nextState = takeStep(state);
                expect(nextState.pointer).toEqual(2);
                expect(nextState.output).toEqual([4]);
            });
        });

        describe('goto', () => {
            it('should handle code 5', () => {
                state.memory = '5,3,70,0'.split(',').map(s => parseInt(s, 10));
                let nextState = takeStep(state);
                expect(nextState.memory).toEqual([5,3,70,0]);
                expect(nextState.pointer).toEqual(3);

                state.memory = '105,0,70'.split(',').map(s => parseInt(s, 10));
                nextState = takeStep(state);
                expect(nextState.memory).toEqual([105,0,70]);
                expect(nextState.pointer).toEqual(3);

                state.memory = '5,1,0'.split(',').map(s => parseInt(s, 10));
                nextState = takeStep(state);
                expect(nextState.memory).toEqual([5,1,0]);
                expect(nextState.pointer).toEqual(5);

                state.memory = '1005,1,70'.split(',').map(s => parseInt(s, 10));
                nextState = takeStep(state);
                expect(nextState.memory).toEqual([1005,1,70]);
                expect(nextState.pointer).toEqual(70);
            });

            it('should handle code 6', () => {
                state.memory = '6,3,70,1'.split(',').map(s => parseInt(s, 10));
                let nextState = takeStep(state);
                expect(nextState.memory).toEqual([6,3,70,1]);
                expect(nextState.pointer).toEqual(3);

                state.memory = '106,1,70'.split(',').map(s => parseInt(s, 10));
                nextState = takeStep(state);
                expect(nextState.memory).toEqual([106,1,70]);
                expect(nextState.pointer).toEqual(3);

                state.memory = '6,2,0'.split(',').map(s => parseInt(s, 10));
                nextState = takeStep(state);
                expect(nextState.memory).toEqual([6,2,0]);
                expect(nextState.pointer).toEqual(6);

                state.memory = '106,0,0'.split(',').map(s => parseInt(s, 10));
                nextState = takeStep(state);
                expect(nextState.memory).toEqual([106,0,0]);
                expect(nextState.pointer).toEqual(106);
            });
        });

        describe('logic', () => {
        });
        it('should handle code 99', () => {
            state.memory = '3500,9,10,70,2,3,11,0,99,30,40,50'.split(',').map(s => parseInt(s, 10));
            state.pointer = 8;
            let nextState = takeStep(state);
            expect(nextState.memory).toEqual([3500,9,10,70,2,3,11,0,99,30,40,50]);
            expect(nextState.done).toBe(true);
        });

        it('should throw an error on bad opcode', () => {
            state.memory = '3500,9,10,70,2,3,11,0,99,30,40,50'.split(',').map(s => parseInt(s, 10));
            expect(() => {
                let nextState = takeStep(state);
            }).toThrowError('halt');
        });
    });

    describe('parameter modes', () => {
        it('should handle immediate mode in p1 for multiplication', () => {
            state.memory = '102,4,3,4,33'.split(',').map(s => parseInt(s, 10));
            let nextState = takeStep(state);
            expect(nextState.memory).toEqual([102,4,3,4,16]);
        });

        it('should handle immediate mode in p2 for multiplication', () => {
            state.memory = '1002,4,3,4,33'.split(',').map(s => parseInt(s, 10));
            let nextState = takeStep(state);
            expect(nextState.memory).toEqual([1002,4,3,4,99]);
        });
    });

    it('should be able to compare arrays', () => {
        expect(arrayEquals([1, 2], [2, 1])).toBe(false);
        expect(arrayEquals([1, 2], [1, 2])).toBe(true);
    });

    describe('running programs', () => {
        describe('with arithmetic', () => {
            it('should run through codes', () => {
                state.memory = '1,9,10,3,2,3,11,0,99,30,40,50'.split(',').map(s => parseInt(s, 10));
                expect(runProgram(state).memory).toEqual([3500,9,10,70,2,3,11,0,99,30,40,50]);
            });

            it('should run through codes', () => {
                state.memory = '1,0,0,0,99'.split(',').map(s => parseInt(s, 10));
                expect(runProgram(state).memory).toEqual([2,0,0,0,99]);
            });

            it('should run through codes', () => {
                state.memory = '2,3,0,3,99'.split(',').map(s => parseInt(s, 10));
                expect(runProgram(state).memory).toEqual([2,3,0,6,99]);
            });

            it('should run through codes', () => {
                state.memory = '2,4,4,5,99,0'.split(',').map(s => parseInt(s, 10));
                expect(runProgram(state).memory).toEqual([2,4,4,5,99,9801]);
            });

            it('should run through codes', () => {
                state.memory = '1,1,1,4,99,5,6,0,99'.split(',').map(s => parseInt(s, 10));
                expect(runProgram(state).memory).toEqual([30,1,1,4,2,5,6,0,99]);
            });
        });

        describe('io', () => {
            it('should read and write inputs', () => {
                state.memory = '3,0,4,0,99'.split(',').map(s => parseInt(s, 10));
                state.input = [32];
                let endState = runProgram(state);
                expect(endState.memory).toEqual([32,0,4,0,99]);
                expect(endState.input).toEqual([]);
                expect(endState.output).toEqual([32]);
            });
        });

        describe('logic', () => {
            it('should run codes that jump', () => {
                state.memory = '3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9'.split(',').map(s => parseInt(s, 10));
                state.input = [0];
                let endState = runProgram(state);
                expect(endState.output).toEqual([0]);
                state.memory = '3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9'.split(',').map(s => parseInt(s, 10));
                state.input = [34];
                state.output = [];
                endState = runProgram(state);
                expect(endState.output).toEqual([1]);
            });
        });
    });
});