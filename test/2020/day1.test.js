import { findEntries, findTriple, getAnswer } from '../../src/2020/day1';
import { entries } from '../../src/2020/data/day1.data';

let vals = [1721,979,366,299,675,1456];

describe('day 1 tests', () => {
    it('should find entries in fake data', () => {
        expect(findEntries(vals)).toEqual([1721, 299]);
    });

    it('should find the result in fake data', () => {
        expect(getAnswer(findEntries(vals))).toBe(514579);
    });

    it('should find entries in real data', () => {
        expect(findEntries(entries)).toEqual([1301, 719]);
    });

    it('should get the result in real data', () => {
        expect(getAnswer(findEntries(entries))).toBe(935419);
    });
});

describe('day 1-b tests', () => {
    it('should find triples', () => {
        expect(findTriple(vals)).toEqual([979, 366, 675]);
    });

    it('should find the result in fake data', () => {
        expect(getAnswer(findTriple(vals))).toBe(241861950);
    });

    it('should find triples in real data', () => {
        expect(findTriple(entries)).toEqual([889, 1079, 52]);
    });

    it('should find the result in fake data', () => {
        expect(getAnswer(findTriple(entries))).toBe(49880012);
    });
});
