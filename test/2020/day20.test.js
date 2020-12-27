import { parseTile, mapEdges, findCorners } from '../../src/2020/day20';
import { tiles as realTiles } from '../../src/2020/data/day20';
import { mock } from './data/day20';

describe('utility functions', () => {
    it('should parse a tile', () => {
        let tile = parseTile(mock[0]);
        expect(tile.t).toBe('Tile 2311:');
        expect(tile.n).toBe('..##.#..#.');
        expect(tile.nr).toBe('.#..#.##..');
        expect(tile.e).toBe('...#.##..#');
        expect(tile.er).toBe('#..##.#...');
        expect(tile.s).toBe('###..###..');
        expect(tile.sr).toBe('..###..###');
        expect(tile.w).toBe('.#..#####.');
        expect(tile.wr).toBe('.#####..#.');
    });

    describe('with parsed tiles', () => {
        let tiles;
        beforeEach(() => {
            tiles = mock.map(t => parseTile(t));
        });

        it('should have all the tiles', () => {
            expect(tiles.length).toBe(9);
            expect(tiles[8].t).toBe('Tile 3079:');
        });

        it('should map edges', () => {
            let edges = mapEdges(tiles);
            expect(edges.get('..##.#..#.')).toBe('Tile 2311:n;Tile 1427:sr');
            expect(edges.get('.#..#.##..')).toBe('Tile 2311:nr;Tile 1427:s');
            expect(edges.get('...#.##..#')).toBe('Tile 2311:e;Tile 3079:w');
            expect(edges.get('#..##.#...')).toBe('Tile 2311:er;Tile 3079:wr');
            expect(edges.get('###..###..')).toBe('Tile 2311:s');
            expect(edges.get('..###..###')).toBe('Tile 2311:sr');
            expect(edges.get('.#..#####.')).toBe('Tile 2311:w;Tile 1951:er');
            expect(edges.get('.#####..#.')).toBe('Tile 2311:wr;Tile 1951:e');
        });

        describe('with mapped edges', () => {
            let edges;
            beforeEach(() => {
                edges = mapEdges(tiles);
            });

            it('should find corners', () => {
                let corners = findCorners(edges);
                expect(corners[0]).toBe(1951);
                expect(corners.length).toBe(4);
            });

            it('should solve mock data', () => {
                let corners = findCorners(edges);
                let solution = corners.reduce((total, tile) => total *= tile, 1);
                expect(solution).toBe(20899048083289);
            });
        });
    });
});

describe('solutions', () => {
    it('should find the corners of the puzzle', () => {
        let tiles = realTiles.map(t => parseTile(t));
        let edges = mapEdges(tiles);
        let corners = findCorners(edges);
        let solution = corners.reduce((total, tile) => total *= tile, 1);
        expect(solution).toBe(7901522557967);
    });
});
