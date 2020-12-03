import { isTree, countTrees, findAll } from '../../src/2020/day3';
import { region } from '../../src/2020/data/day3.data';
import { mock } from './data/day3.data';

describe('day 3a tests', () => {
    it('should if a point on the top line is a tree', () => {
        expect(isTree(mock, 0)).toBe(false);
        expect(isTree(mock, 2)).toBe(true);
        expect(isTree(mock, 13)).toBe(true);
    });

    it('should count trees', () => {
        expect(countTrees(mock, 1, 0, 3, 0)).toBe(7);
    });

    it('should count all trees', () => {
        expect(countTrees(region, 1, 0, 3, 0)).toBe(148);
    });
});

describe('day 3b tests', () => {
    it('should count other slopes', () => {
        expect(countTrees(mock, 1, 0, 1, 0)).toBe(2);
        expect(countTrees(mock, 1, 0, 3, 0)).toBe(7);
        expect(countTrees(mock, 1, 0, 5, 0)).toBe(3);
        expect(countTrees(mock, 1, 0, 7, 0)).toBe(4);
        expect(countTrees(mock, 2, 0, 1, 0)).toBe(2);
    });

    it('should sum the slopes', () => {
        expect(findAll(mock)).toBe(336);
    });

    it('should sum the real slopes', () => {
        expect(findAll(region)).toBe(727923200);
    });
});
