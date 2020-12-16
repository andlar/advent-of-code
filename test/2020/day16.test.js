import { interpretNotes, findInvalid, updateNearby, initLocations, eliminateLocations, cleanFixed, settle } from '../../src/2020/day16';
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

let mock2 = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`.split('\n\n');

describe('utility functions', () => {
    it('should interpret the notes', () => {
        let data = interpretNotes(mock);
        expect(data.ranges.get('class')).toEqual([[1,3],[5,7]]);
        expect(data.your).toEqual([7,1,14]);
        expect(data.nearby[0]).toEqual([7,3,47]);
        expect(data.nearby.length).toBe(4);
    });

    it('should find invalid numbers', () => {
        let invalid = findInvalid(mock);
        expect(invalid).toBe(71);
    });

    it('should remove invalid tickets', () => {
        let data = updateNearby(mock);
        expect(data.nearby.length).toBe(1);
    });

    it('should generate possible locations', () => {
        let locations = initLocations(mock);
        expect(locations.get(0)).toEqual(['class', 'row', 'seat']);
        expect(locations.get(1)).toEqual(['class', 'row', 'seat']);
        expect(locations.get(2)).toEqual(['class', 'row', 'seat']);
    });

    it('should eliminate possible locations', () => {
        let locations = initLocations(mock2);
        let data = updateNearby(mock2);
        let nextLocations = eliminateLocations(locations, data);
        expect(nextLocations.get(0)).toEqual(['row']);
        expect(nextLocations.get(1)).toEqual(['class', 'row']);
        expect(nextLocations.get(2)).toEqual(['class', 'row', 'seat']);
    });

    it('should eliminate locations that are fixed', () => {
        let locations = initLocations(mock2);
        let data = updateNearby(mock2);
        locations = eliminateLocations(locations, data);
        let nextLocations = cleanFixed(locations);
        expect(nextLocations.get(0)).toEqual(['row']);
        expect(nextLocations.get(1)).toEqual(['class']);
        expect(nextLocations.get(2)).toEqual(['class', 'seat']);
        nextLocations = cleanFixed(nextLocations);
        expect(nextLocations.get(0)).toEqual(['row']);
        expect(nextLocations.get(1)).toEqual(['class']);
        expect(nextLocations.get(2)).toEqual(['seat']);
    });

    it('should repeat until all values are fixed', () => {
        let locations = settle(mock2);
        expect(locations.get(0)).toEqual(['row']);
        expect(locations.get(1)).toEqual(['class']);
        expect(locations.get(2)).toEqual(['seat']);
    });

    it('should settle on real data', () => {
        let locations = settle(notes);
        expect(locations.get(0)).toEqual(['class']);
        expect(locations.get(1)).toEqual(['departure track']);
        expect(locations.get(19)).toEqual(['duration']);
    });
});

describe('solutions', () => {
    it('should solve part 1', () => {
        let invalid = findInvalid(notes, 25);
        expect(invalid).toBe(29759);
    });

    it('should solve part 2', () => {
        let locations = settle(notes);
        expect(locations.get(1)).toEqual(['departure track']);
        expect(locations.get(2)).toEqual(['departure location']);
        expect(locations.get(6)).toEqual(['departure time']);
        expect(locations.get(14)).toEqual(['departure station']);
        expect(locations.get(16)).toEqual(['departure platform']);
        expect(locations.get(17)).toEqual(['departure date']);
        expect(149 * 139 * 89 * 71 * 103 * 97).toBe(1307550234719);
    });
});
