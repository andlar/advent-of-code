import { play, getScore, recurse } from '../../src/2020/day22';
import { cards } from '../../src/2020/data/day22';

let mock;

describe('utility functions', () => {
    beforeEach(() => {
        mock = {
            a: [9,2,6,3,1],
            b: [5,8,4,7,10],
        };
    });

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

    it('should play recursively', () => {
        let result = recurse(mock);
        expect(result).toEqual({
            a: [],
            b: [7,5,6,2,4,1,10,8,9,3],
        });
    });

    it('should not run forever', () => {
        let repeat = {
            a: [43,19],
            b: [2,29,14],
        };
        repeat = recurse(repeat);
        expect(repeat).toEqual({
            a: [43,19],
            b: [2,29,14],
        });
    });
});

describe('solutions', () => {
    let input;
    beforeEach(() => {
        input = {
            a: [...cards.a],
            b: [...cards.b],
        }
    });

    it('should play the full game', () => {
        let result = play(input);
        let score = getScore(result);
        expect(score).toBe(31269);
    });

    it('should play the full game recursively', () => {
        let result = recurse(input);
        let score = getScore(result);
        expect(score).toBe(31151); //31269 is too high, 8679 is too low
    });
});
