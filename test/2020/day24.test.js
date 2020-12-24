import { flipTile, flipTiles, countBlack } from '../../src/2020/day24';
import { directions } from '../../src/2020/data/day24';
import { mock } from './data/day24';

describe('utility functions', () => {
    it('should flip a tile', () => {
        let tiles = new Map();
        let direction = 'esew';
        tiles = flipTile(tiles, direction);
        expect(tiles.get('1:-1')).toBe('b');
        expect(tiles.size).toBe(1);
    });

    it('should flip the origin', () => {
        let tiles = new Map();
        let direction = 'nwwswee';
        tiles = flipTile(tiles, direction);
        expect(tiles.get('0:0')).toBe('b');
        expect(tiles.size).toBe(1);
    });

    it('should flip a tile to white', () => {
        let tiles = new Map();
        let direction = 'esew';
        tiles = flipTile(tiles, direction);
        tiles = flipTile(tiles, direction);
        expect(tiles.get('1:-1')).toBe('w');
        expect(tiles.size).toBe(1);
    });

    it('should flip a lot of tiles', () => {
        let tiles = new Map();
        tiles = flipTiles(tiles, mock);
        expect(tiles.size).toBe(15);
    });

    it('should count black tiles', () => {
        let tiles = new Map();
        tiles = flipTiles(tiles, mock);
        let count = countBlack(tiles);
        expect(count).toBe(10);
    });
});

describe('solutions', () => {
    it('should find the flipped tiles', () => {
        let tiles = new Map();
        tiles = flipTiles(tiles, directions);
        let count = countBlack(tiles);
        expect(count).toBe(388);
    });

    xit('should play the bigger game', () => {
        let cups = makeMap(real, 1000000);
        let answer = getSecondAnswer(play(cups, 10000000, 1000000));
        expect(answer).toBe(149245887792);
    });
});
