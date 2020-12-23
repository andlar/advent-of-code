import { step, play, getAnswer } from '../../src/2020/day23';

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
});

describe('solutions', () => {
    beforeEach(() => {
        cups = real.split('').map(c => parseInt(c, 10));
    });

    it('should play game for 100 steps', () => {
        let answer = getAnswer(play(cups, 100));
        expect(answer).toBe('68245739');
    });

    xit('should play the full game recursively', () => {
        let result = recurse(input);
        let score = getScore(result);
        expect(score).toBe(31151); //31269 is too high, 8679 is too low
    });
});
