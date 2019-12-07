import { getThrusterSignal, findAllSignals } from '../src/day7';
import { input } from './day7.data';

describe('day 7 tests', () => {
    describe('part 1', () => {
        it('should get a thruster signal from 43210', () => {
            let memory = '3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0'.split(',').map(c => parseInt(c,10));
            let state = {
                memory: [...memory],
                input: [0],
                output: [],
            }
            let setting = [4,3,2,1,0];
            expect(getThrusterSignal(state, setting).output).toEqual([43210]);
        });

        it('should get a thruster signal from 54321', () => {
            let memory = '3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0'.split(',').map(c => parseInt(c,10));
            let state = {
                memory: [...memory],
                input: [0],
                output: [],
            }
            let setting = [0,1,2,3,4];
            expect(getThrusterSignal(state, setting).output).toEqual([54321]);
        });

        it('should get a thruster signal from 65210', () => {
            let memory = '3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0'.split(',').map(c => parseInt(c,10));
            let state = {
                memory: [...memory],
                input: [0],
                output: [],
            }
            let setting = [1,0,4,3,2];
            expect(getThrusterSignal(state, setting).output).toEqual([65210]);
        });

        it('should find all signals with the max of 43210', () => {
            let memory = '3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0'.split(',').map(c => parseInt(c,10));
            let allOutputs = findAllSignals(memory);
            expect(allOutputs['43210']).toEqual(43210);
            expect(allOutputs['12304']).toEqual(12304);
            expect(allOutputs['02431']).toEqual(2431);
        });

        it('should find all signals with the max of 43210', () => {
            let memory = '3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0'.split(',').map(c => parseInt(c,10));
            let allOutputs = findAllSignals(memory);
            expect(allOutputs['01234']).toEqual(54321);
        });

        it('should find all signals with the max of 43210', () => {
            let memory = '3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0'.split(',').map(c => parseInt(c,10));
            let allOutputs = findAllSignals(memory);
            expect(allOutputs['10432']).toEqual(65210);
        });

        it('should solve', () => {
            let allOutputs = findAllSignals(input);
            let maxVal = Object.keys(allOutputs).reduce((acc, cur) => {
                if (allOutputs[cur] > acc) {
                    acc = allOutputs[cur];
                }
                return acc;
            }, -1);
            expect(maxVal).toEqual(101490);
        });
    });

    describe('day 2-b tests', () => {
    });
});
