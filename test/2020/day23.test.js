import { step, play, getAnswer, buildCircle, getSecondAnswer } from '../../src/2020/day23';

let mock = '389125467';
let real = '459672813';
let cups;

describe('utility functions', () => {
    beforeEach(() => {
        cups = mock.split('').map(c => parseInt(c, 10));
    });

    it('should take a step', () => {
        let result = step(cups);
        expect(result).toEqual([2,8,9,1,5,4,6,7,3]);
    });

    it('should take a wrapping step', () => {
        let tst = [1,3,6,7,9,2,5,8,4];
        let result = step(tst);
        expect(result).toEqual([9,3,6,7,2,5,8,4,1]);
    });

    it('should play a game of ten steps', () => {
        let result = play(cups, 10);
        expect(result).toEqual([8,3,7,4,1,9,2,6,5]);
    });

    it('should get an answer', () => {
        let answer = getAnswer([8,3,7,4,1,9,2,6,5]);
        expect(answer).toBe('92658374');
    });

    it('should build a bigger circle', () => {
        cups = buildCircle(cups, 20);
        expect(cups).toEqual([3,8,9,1,2,5,4,6,7,10,11,12,13,14,15,16,17,18,19,20])
    });

    it('should build a much bigger circle', () => {
        cups = buildCircle(cups, 1000000);
        expect(cups.length).toBe(1000000);
        expect(cups[cups.length - 1]).toBe(1000000);
    });

    it('should get the second answer', () => {
        let answer = getSecondAnswer([8,3,7,4,1,9,2,6,5]);
        expect(answer).toBe(18);
    });

    xit('should play a much bigger game', () => {
        cups = buildCircle(cups, 1000000);
        let result = play(cups, 10000000);
        let answer = getSecondAnswer(result);
        expect(answer).toBe(149245887792);
    });
});

describe('solutions', () => {
    beforeEach(() => {
        cups = real.split('').map(c => parseInt(c, 10));
    });

    it('should play game for 100 steps', () => {
        let answer = getAnswer(play(cups, 100));
        expect(answer).toBe('68245739');
    });

    xit('should play the bigger game', () => {
        cups = buildCircle(cups, 1000000);
        let answer = getSecondAnswer(play(cups, 10000000, 1000000));
        expect(answer).toBe(149245887792);
    });
});
