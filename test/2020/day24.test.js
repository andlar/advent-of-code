import { layTile, layTiles, grow } from '../../src/2020/day24';
import { directions } from '../../src/2020/data/day24';
import { mock } from './data/day24';

describe('utility functions', () => {
    it('should lay a tile', () => {
        let tiles = new Set();
        let direction = 'esew';
        tiles = layTile(tiles, direction);
        expect(tiles.has('1:-1')).toBe(true);
        expect(tiles.size).toBe(1);
    });

    it('should lay a tile on the origin', () => {
        let tiles = new Set();
        let direction = 'nwwswee';
        tiles = layTile(tiles, direction);
        expect(tiles.has('0:0')).toBe(true);
        expect(tiles.size).toBe(1);
    });

    it('should remove a tile marked as white', () => {
        let tiles = new Set();
        let direction = 'esew';
        tiles = layTile(tiles, direction);
        tiles = layTile(tiles, direction);
        expect(tiles.has('1:-1')).toBe(false);
        expect(tiles.size).toBe(0);
    });

    it('should lay a lot of tiles', () => {
        let tiles = new Set();
        tiles = layTiles(tiles, mock);
        expect(tiles.size).toBe(10);
    });

    it('should grow by a day', () => {
        let tiles = new Set();
        tiles = layTiles(tiles, mock);
        tiles = grow(tiles);
        expect(tiles.size).toBe(12);
    });
});

describe('solutions', () => {
    it('should count the black tiles', () => {
        let tiles = new Set();
        tiles = layTiles(tiles, directions);
        expect(tiles.size).toBe(388);
    });

    xit('should play the bigger game', () => {
        let cups = makeMap(real, 1000000);
        let answer = getSecondAnswer(play(cups, 10000000, 1000000));
        expect(answer).toBe(149245887792);
    });
});
