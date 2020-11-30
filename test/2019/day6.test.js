import { input } from './data/day6.data';
import { buildMap, calcOrbit, checkSum, pathToCenter, findTransfers } from '../src/day6';

let testMap = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`.split('\n');

let map2 = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`.split('\n');

describe('day 6 tests', () => {
    it('should have input', () => {
        expect(input.length).toBe(1315);
        expect(input[0]).toBe('NKB)PZS');
    });

    it('should build a map with just one relationship', () => {
        let map = buildMap([testMap[0]]);
        expect(map['COM']).toEqual({object: 'COM', around: undefined});
        expect(map['B']).toEqual({object: 'B', around: 'COM'});
    });

    it('should build a map with two relationships', () => {
        let map = buildMap(testMap.slice(0, 2));
        expect(map['COM']).toEqual({object: 'COM', around: undefined});
        expect(map['B']).toEqual({object: 'B', around: 'COM'});
        expect(map['C']).toEqual({object: 'C', around: 'B'});
    });

    describe('calculating orbits', () => {
        let map;
        beforeEach(() => {
            map = buildMap(testMap);
        });

        it('should handle the COM', () => {
            map = calcOrbit(map, 'COM');
            expect(map['COM'].orbits).toBe(0);
        });

        it('should handle B', () => {
            map = calcOrbit(map, 'B');
            expect(map['B'].orbits).toBe(1);
        });

        it('should sum orbits', () => {
            let check = checkSum(map);
            expect(check).toBe(42);
        });
    });

    it('should solve', () => {
       let map = buildMap(input);
       let check = checkSum(map);
       expect(check).toBe(154386);
    });
});

describe('day 6-b tests', () => {
    let map;
    beforeEach(() => {
        map = buildMap(map2);
    });

    it('should find the path to the COM', () => {
        expect(pathToCenter(map, 'YOU')).toEqual(['K','J','E','D','C','B','COM']);
        expect(pathToCenter(map, 'SAN')).toEqual(['I','D','C','B','COM']);
    });

    it('should find transfer counts', () => {
        let youPath = ['K','J','E','D','C','B','COM'];
        let sanPath = ['I','D','C','B','COM'];
        expect(findTransfers(youPath, sanPath)).toBe(4);
    });

    it('should solve', () => {
        let map = buildMap(input);
        let youPath = pathToCenter(map, 'YOU');
        let sanPath = pathToCenter(map, 'SAN');
        expect(findTransfers(youPath, sanPath)).toBe(346);
    });
});
