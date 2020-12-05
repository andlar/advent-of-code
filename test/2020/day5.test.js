import { getSeat, ticketCheck, findSeat } from '../../src/2020/day5';
import { tickets } from '../../src/2020/data/day5';

describe('day 5a tests', () => {
    it('parse tickets to get a seat', () => {
        expect(getSeat('FBFBBFFRLR')).toEqual({row: 44, col: 5, id: 357});
        expect(getSeat('BFFFBBFRRR')).toEqual({row: 70, col: 7, id: 567});
        expect(getSeat('FFFBBBFRRR')).toEqual({row: 14, col: 7, id: 119});
        expect(getSeat('BBFFBBFRLL')).toEqual({row: 102, col: 4, id: 820});
    });

    it('should find the highest id', () => {
        expect(ticketCheck(['FBFBBFFRLR', 'BFFFBBFRRR','FFFBBBFRRR', 'BBFFBBFRLL'])).toBe(820);
    });

    it('should find the highest id of real data', () => {
        expect(ticketCheck(tickets)).toBe(926);
    });
});

describe('day 4b tests', () => {
    it('should find my seat', () => {
        expect(findSeat(tickets)).toBe(657);
    });
});
