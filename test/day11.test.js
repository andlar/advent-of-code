import { runProgram } from '../src/intcode';
import { initRobot, initHull, paintHull } from '../src/day11';

describe('day 11 tests', () => {
    describe('part 1', () => {
        it('should initalize a robot', () => {
            let robot = initRobot();
            expect(robot.memory.length).toBe(646);
            expect(robot.input.length).toBe(0);
            expect(robot.output.length).toBe(0);
        });

        it('should initalize the hull', () => {
            let hull = initHull();
            expect(hull.hull).toEqual({});
            expect(hull.robotLocation).toBe('0:0');
            expect(hull.robotDirection).toBe('^');
        });

        it('should see what squares could be painted', () => {
            let possiblyPaintedSpaces = paintHull();
            expect(Object.keys(possiblyPaintedSpaces).length).toBe(2478);
        });
    });

    describe('part 2', () => {
        it('should initialize the hull with white', () => {
            let hull = initHull({startingWithWhite: true});
            expect(hull.hull).toEqual({'0:0':'#'});
            expect(hull.robotLocation).toBe('0:0');
            expect(hull.robotDirection).toBe('^');
        });

        it('should create magic', () => { // not HCZRVGAZ
            let grid = paintHull({startingWithWhite: true});
            expect(grid).toBe(`#############################################
#.#..#..##..####.###..#..#..##...##..####.. #
# #..#.#..#....#.#..#.#..#.#..#.#..#....#...#
# ####.#......#..#..#.#..#.#....#..#...#....#
#.#..#.#.....#...###..#..#.#.##.####..#.... #
#.#..#.#..#.#....#.#..#..#.#..#.#..#.#....  #
# #..#..##..####.#..#..##...###.#..#.####.  #
#############################################`);
        });
    });
});
