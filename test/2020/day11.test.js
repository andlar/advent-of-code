import { iterate } from '../../src/2020/day11';
import { input } from '../../src/2020/data/day11';
import { mock } from './data/day11';

describe('utility functions', () => {
    it('should iterate', () => {
        expect(iterate(mock)).toEqual(['#.##.##.##',
                                       '#######.##',
                                       '#.#.#..#..',
                                       '####.##.##',
                                       '#.##.##.##',
                                       '#.#####.##',
                                       '..#.#.....',
                                       '##########',
                                       '#.######.#',
                                       '#.#####.##']);
    });
});

describe('solutions', () => {

});
