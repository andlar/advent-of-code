import { interpretNotes, findInvalid } from '../../src/2020/day16';
import { notes } from '../../src/2020/data/day16';

let mock = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`.split('\n\n');

describe('utility functions', () => {
    it('should interpret the notes', () => {
        let data = interpretNotes(mock);
        expect(data.ranges.get('class')).toEqual([[1,3],[5,7]]);
        expect(data.your).toEqual([7,1,14]);
        expect(data.nearby[0]).toEqual([7,3,47]);
    });

    it('should find invalid numbers', () => {
        let invalid = findInvalid(mock);
        expect(invalid).toBe(71);
    });
});

describe('solutions', () => {
    it('should solve part 1', () => {
        let invalid = findInvalid(notes, 25);
        expect(invalid).toBe(29759);
    });

    it('should solve part 2', () => {
    });
});
