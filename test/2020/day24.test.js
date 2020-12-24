import { layTile, layTiles, getNeighbors, grow, drawTiles } from '../../src/2020/day24';
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

    it('should count neighbors', () => {
        let tiles = new Set();
        tiles = layTiles(tiles, mock);
        let result = getNeighbors(tiles, '0:0');
        expect(result).toBe(1);
    });

    it('should grow by a day', () => {
        let tiles = new Set();
        tiles = layTiles(tiles, mock);
        let next = grow(tiles);
        expect(next.size).toBe(15);
    });

    it('should grow by two days', () => {
        let tiles = new Set();
        tiles = layTiles(tiles, mock);
        let next = grow(tiles);
        next = grow(next);
        expect(next.size).toBe(12);
    });

    it('should grow by ten days', () => {
        let tiles = new Set();
        tiles = layTiles(tiles, mock);
        let next = grow(tiles);
        for (let i = 1; i < 10; i++) {
            next = grow(next);
        }
        expect(next.size).toBe(37);
    });

    it('should grow by one hundred days', () => {
        let tiles = new Set();
        tiles = layTiles(tiles, mock);
        let next = grow(tiles);
        for (let i = 1; i < 100; i++) {
            next = grow(next);
        }
        expect(next.size).toBe(2208);
    });
});

describe('solutions', () => {
    it('should count the black tiles', () => {
        let tiles = new Set();
        tiles = layTiles(tiles, directions);
        expect(tiles.size).toBe(388);
    });

    it('should grow the real tiles by one hundred days', () => {
        let tiles = new Set();
        tiles = layTiles(tiles, directions);
        let next = grow(tiles);
        for (let i = 1; i < 100; i++) {
            next = grow(next);
        }
        console.log(drawTiles(next));
        expect(next.size).toBe(4002);
    });
});
