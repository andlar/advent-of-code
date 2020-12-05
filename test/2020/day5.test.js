import { getSeatId, ticketCheck, findSeat } from '../../src/2020/day5';
import { tickets } from '../../src/2020/data/day5';

describe('day 5a tests', () => {
    it('should get seat ids', () => {
        expect(getSeatId('FBFBBFFRLR')).toBe(357);
        expect(getSeatId('BFFFBBFRRR')).toBe(567);
        expect(getSeatId('FFFBBBFRRR')).toBe(119);
        expect(getSeatId('BBFFBBFRLL')).toBe(820);
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
