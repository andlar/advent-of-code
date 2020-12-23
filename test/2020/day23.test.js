import { makeMap, step, play, getAnswer, getSecondAnswer } from '../../src/2020/day23';

let mock = '389125467';
let real = '459672813';

describe('utility functions', () => {
    let cups;
    it('should make a map', () => {
        let cups = makeMap(mock);
        expect(cups.get(3)).toBe(8);
        expect(cups.get(8)).toBe(9);
        expect(cups.get(9)).toBe(1);
        expect(cups.get(1)).toBe(2);
        expect(cups.get(2)).toBe(5);
        expect(cups.get(5)).toBe(4);
        expect(cups.get(4)).toBe(6);
        expect(cups.get(6)).toBe(7);
        expect(cups.get(7)).toBe(3);
    });

    describe('given a map', () => {
        beforeEach(() => {
            cups = makeMap(mock);
        });

        it('should take a step', () => {
            let result = step(cups, 3, 9);
            expect(cups.get(1)).toBe(5);
            expect(cups.get(2)).toBe(8);
            expect(cups.get(3)).toBe(2);
            expect(cups.get(4)).toBe(6);
            expect(cups.get(5)).toBe(4);
            expect(cups.get(6)).toBe(7);
            expect(cups.get(7)).toBe(3);
            expect(cups.get(8)).toBe(9);
            expect(cups.get(9)).toBe(1);
        });

        it('should take a wrapping step', () => {
            let tst = makeMap('136792584');
            let result = step(tst, 1, 9);
            expect(result.get(1)).toBe(9);
            expect(result.get(2)).toBe(5);
            expect(result.get(3)).toBe(6);
            expect(result.get(4)).toBe(1);
            expect(result.get(5)).toBe(8);
            expect(result.get(6)).toBe(7);
            expect(result.get(7)).toBe(2);
            expect(result.get(8)).toBe(4);
            expect(result.get(9)).toBe(3);
        });

        it('should skip removed items', () => {
            let tst = makeMap('328915467');
            let result = step(tst, 2, 9);
            expect(result.get(1)).toBe(3);
            expect(result.get(2)).toBe(5);
            expect(result.get(3)).toBe(2);
            expect(result.get(4)).toBe(6);
            expect(result.get(5)).toBe(4);
            expect(result.get(6)).toBe(7);
            expect(result.get(7)).toBe(8);
            expect(result.get(8)).toBe(9);
            expect(result.get(9)).toBe(1);
        });

        it('should play a game of ten steps', () => {
            let result = play(cups, 10, 3, 9);
            expect(result.get(1)).toBe(9);
            expect(result.get(2)).toBe(6);
            expect(result.get(3)).toBe(7);
            expect(result.get(4)).toBe(1);
            expect(result.get(5)).toBe(8);
            expect(result.get(6)).toBe(5);
            expect(result.get(7)).toBe(4);
            expect(result.get(8)).toBe(3);
            expect(result.get(9)).toBe(2);
        });

        it('should get an answer', () => {
            let result = play(cups, 10, 3, 9);
            let answer = getAnswer(result);
            expect(answer).toBe('92658374');
        });

        it('should get an answer after 100 turns', () => {
            let result = play(cups, 100, 3, 9);
            let answer = getAnswer(result);
            expect(answer).toBe('67384529');
        });
    });

    xit('should build a bigger circle', () => {
        cups = makeMap(mock, 20);
        expect(cups.get(3)).toBe(8);
        expect(cups.get(8)).toBe(9);
        expect(cups.get(7)).toBe(10);
        expect(cups.get(20)).toBe(3);
    });

    xit('should build a much bigger circle', () => {
        cups = makeMap(mock, 1000000);
        expect(cups.length).toBe(1000000);
        expect(cups[cups.length - 1]).toBe(1000000);
    });

    xit('should get the second answer', () => {
        let answer = getSecondAnswer([8,3,7,4,1,9,2,6,5]);
        expect(answer).toBe(18);
    });

    xit('should play a much bigger game', () => {
        cups = makeMap(mock, 1000000);
        let result = play(cups, 10000000);
        let answer = getSecondAnswer(result);
        expect(answer).toBe(149245887792);
    });
});

describe('solutions', () => {
    it('should play game for 100 steps', () => {
        let cups = makeMap(real);
        let result = play(cups, 100, 3, 9);
        let answer = getAnswer(result);
        console.log({result, answer});
        expect(answer).toBe('68245739');
    });

    xit('should play the bigger game', () => {
        let cups = makeMap(real, 1000000);
        let answer = getSecondAnswer(play(cups, 10000000, 1000000));
        expect(answer).toBe(149245887792);
    });
});
