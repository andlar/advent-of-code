import { play, getScore } from '../../src/2020/day22';
import { cards } from '../../src/2020/data/day22';

let mock = {
    a: [9,2,6,3,1],
    b: [5,8,4,7,10],
};

describe('utility functions', () => {
    it('should play the game', () => {
        let result = play(mock);
        expect(result).toEqual({
            a: [],
            b: [3,2,10,6,8,5,9,4,7,1],
        });
    });

    it('should get the score', () => {
        let result = play(mock);
        let score = getScore(result);
        expect(score).toBe(306);
    });
});

describe('solutions', () => {
    it('should play the full game', () => {
        let result = play(cards);
        let score = getScore(result);
        expect(score).toBe(31269);
    });

    xit('should answer the 2nd homework questions', () => {
        let result = homework.reduce((sum, expression) => sum + solve(expression, doDifferentlyBadMath), 0);
        expect(result).toEqual(70518821989947);
    });
});
