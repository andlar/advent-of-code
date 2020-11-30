import { initScaffolds, makeGrid, findIntersections, getAlignmentsSum } from '../src/day17';
import { drawGrid } from '../src/util';

describe('day 17', () => {
    describe('part 1', () => {
        it('should initalize the scaffolds', () => {
            let scaffolds = initScaffolds();
            expect(scaffolds.length).toBe(2151);
            expect(scaffolds[0]).toEqual(46);
        });

        it('should convert scaffolds to a grid', () => {
            let scaffolds = initScaffolds();
            let grid = makeGrid(scaffolds)
            expect(grid['0:0']).toBe('.');
            expect(grid['12:20']).toBe('^');
            console.log(drawGrid(grid, {verticalFlip: true}));
        });

        it('should find intersections', () => {
            let scaffolds = initScaffolds();
            let grid = makeGrid(scaffolds)
            let intersections = findIntersections(grid);
            console.log(intersections);
            intersections.forEach(i => grid[i] = 'O');
            console.log(drawGrid(grid, {verticalFlip: true}));
            expect(intersections.length).toBe(11)
        });

        it('should solve', () => {
            let scaffolds = initScaffolds();
            let grid = makeGrid(scaffolds)
            let intersections = findIntersections(grid);
            let alignments = getAlignmentsSum(intersections);
            expect(alignments).toBe(4800);
            //5538 is too high
        });
    });

    describe('part 2', () => {

    });
});
