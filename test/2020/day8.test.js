import { executeLine, findLoop, terminates } from '../../src/2020/day8';
import { input } from '../../src/2020/data/day8';
import { mock, mock2 } from './data/day8';

describe('utility functions', () => {
    it('takes a nop step', () => {
        expect(executeLine(mock, 0, 0)).toEqual({acc: 0, ptr: 1})
    });

    it('takes an acc step', () => {
        expect(executeLine(mock, 0, 1)).toEqual({acc: 1, ptr: 2})
        expect(executeLine(mock, 0, 5)).toEqual({acc: -99, ptr: 6})
    });

    it('takes a jmp step', () => {
        expect(executeLine(mock, 0, 2)).toEqual({acc: 0, ptr: 6})
       expect(executeLine(mock, 0, 4)).toEqual({acc: 0, ptr: 1})
    });

    it('finds infinite loops', () => {
        expect(findLoop(mock).acc).toBe(5);
    });

    it('finds infinite loops on a second set of data', () => {
        expect(findLoop(mock2).acc).toBe(8);
    });

    it('terminates when the pointer is outside the program', () => {
        expect(executeLine(mock, 'fakeacc', 12)).toEqual({acc: 'fakeacc', ptr: 12, terminated: true});
        expect(executeLine(mock, 'fakeacc', -3)).toEqual({acc: 'fakeacc', ptr: -3, terminated: true});
    });

    it('does not terminate on mock data', () => {
        expect(terminates(mock).terminated).toBeFalsy();
    });

    it('does terminate on updated mock data', () => {
        expect(terminates(mock2).terminated).toBeTruthy();
    });
});

describe('solutions', () => {
    it('solves part 1', () => {
        expect(findLoop(input).acc).toBe(1939); // first run! woot!
    });

    it('solves part 2', () => {
        let result;
        input.forEach((line, idx, program) => {
            let testP = program.map(l => l);
            if (line.indexOf('acc') > -1) { return; }
            if (line.indexOf('nop') > -1) {
                line = line.replace('nop', 'jmp');
            } else {
                line = line.replace('jmp', 'nop');
            }
            testP[idx] = line;
            if (terminates(testP).terminated) {
                result = terminates(testP).acc;
            }
        });
        expect(result).toBe(2212); // boom! first try again... A disaster of code, but the answer is right :)
    });
});
