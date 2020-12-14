import { updateMask, writeToMemory, writeFloating, runProgram, findOutput } from '../../src/2020/day14';
import { program } from '../../src/2020/data/day14';

let mock = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`.split('\n');

let mock2 = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`.split('\n');

describe('utility functions', () => {
    let state;
    beforeEach(() => {
        state = {
            mask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            memory: {},
        };
    });

    it('should update the mask', () => {
        let next = updateMask(state, mock[0]);
        expect(next.mask).toBe('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X');
    });

    it('should write 10 to memory with a blank mask', () => {
        let next = writeToMemory(state, 'mem[3] = 10');
        expect(next.memory[3]).toBe(10);
    });

    describe('writing to memory with a mock mask', () => {
        beforeEach(() => {
            state = updateMask(state, mock[0]);
        });

        it('should write 11', () => {
            let next = writeToMemory(state, mock[1]);
            expect(next.memory[8]).toBe(73);
        });

        it('should write 101', () => {
            let next = writeToMemory(state, mock[2]);
            expect(next.memory[7]).toBe(101);
        });

        it('should write 0', () => {
            let next = writeToMemory(state, mock[3]);
            expect(next.memory[8]).toBe(64);
        });
    });

    describe('writing to memory with a floating mask', () => {
        it('should write to four places', () => {
            state = updateMask(state, mock2[0]);
            let next = writeFloating(state, mock2[1]);
            expect(next.memory[26]).toBe(100);
            expect(next.memory[27]).toBe(100);
            expect(next.memory[58]).toBe(100);
            expect(next.memory[59]).toBe(100);
        });

        it('should write to eight places', () => {
            state = updateMask(state, mock2[2]);
            let next = writeFloating(state, mock2[3]);
            expect(next.memory[16]).toBe(1);
            expect(next.memory[17]).toBe(1);
            expect(next.memory[18]).toBe(1);
            expect(next.memory[19]).toBe(1);
            expect(next.memory[24]).toBe(1);
            expect(next.memory[25]).toBe(1);
            expect(next.memory[26]).toBe(1);
            expect(next.memory[27]).toBe(1);
        });
    });

    it('should run a program', () => {
        let end = runProgram(mock);
        expect(end.memory[7]).toBe(101);
        expect(end.memory[8]).toBe(64);
    });

    it('should find the output', () => {
        let end = runProgram(mock);
        expect(findOutput(end)).toBe(165);
    });

    it('should find the output in float mode', () => {
        let end = runProgram(mock2, writeFloating);
        expect(findOutput(end)).toBe(208);
    });
});

describe('solutions', () => {
    it('should solve day 1', () => {
        let end = runProgram(program);
        expect(findOutput(end)).toBe(8332632930672);
    });

    it('should solve day 2', () => {
        let end = runProgram(program, writeFloating);
        expect(findOutput(end)).toBe(4753238784664);
    });
});
