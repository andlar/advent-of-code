import { hasAdjacent, containsPair, increases, findPossibles, findPossiblesWithPairs } from '../src/day4';


describe('day 4 tests', () => {
    let input;
    beforeEach(() => {
        input = [111111, 111123, 122345, 123789, 135679, 223450];
    });

    it('filters out codes without adjacent values', () => {
        expect(input.filter(c => hasAdjacent(c))).toEqual([111111, 111123, 122345, 223450]);
    });

    it('filters out codes that don\'t increase', () => {
        expect(input.filter(c => increases(c))).toEqual([111111, 111123, 122345, 123789, 135679]);
    });

    it('finds codes', () => {
        expect(findPossibles(111111, 111120).length).toBe(9);
        expect(findPossibles(123789, 123799).length).toBe(1);
    });

    it('solves', () => {
        expect(findPossibles(236491, 713787).length).toBe(1169);
    });
});

describe('day 4-b tests', () => {
    let input
    beforeEach(() => {
        input = [111111, 111123, 122345, 123789, 135679, 223450, 112233, 123444, 111122];
    });

    it('filters out codes without pairs', () => {
        expect([111123].filter(c => containsPair(c))).toEqual([]);
        expect(input.filter(c => containsPair(c))).toEqual([122345, 223450, 112233, 111122]);
    });

    it('solves', () => { // 987 is wrong
        expect(findPossiblesWithPairs(236491, 713787).length).toBe(757);
    });
});
