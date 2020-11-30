import { runProgram } from '../src/intcode';
import { initGame, paintGrid, getCountOfBlocks, getJoystickDirection, playGame } from '../src/day13';

describe('day 13 tests', () => {
    describe('part 1', () => {
        it('should initalize a game', () => {
            let game = initGame();
            expect(game.memory.length).toBe(2800)
            expect(game.input).toEqual([]);
            expect(game.output).toEqual([]);
        });

        it('should add a character to a grid', () => {
            let grid = {};
            let input = [
                4, 2, 0,
                1, 2, 1,
                2, 3, 2,
                3, 4, 3,
                -1, -1, 4,
                0, 0, 'oops',
            ];
            grid = paintGrid(grid, input);
            expect(grid).toEqual({
                '4:2': ' ',
                '1:2': '#',
                '2:3': '*',
                '3:4': '-',
                '-1:-1': 'o',
                '0:0': '?',
            });
        });

        it('should display the score', () => {
            let grid = {};
            let input = [
                -1, 0, 'score',
            ];
            grid = paintGrid(grid, input);
            expect(grid).toEqual({
                score: 'score',
            });
        });

        it('should solve', () => {
            let squaresPainted = getCountOfBlocks();
            expect(squaresPainted).toBe(296);
        });
    });

    describe('part 2', () => {
        it('should know which way to move the joystick', () => {
            let grid = {
                '-2:23': 'o',
                '-4:0': '-',
            }
            expect(getJoystickDirection(grid)).toBe(1);
            grid = {
                '-2:23': 'o',
                '4:0': '-',
            }
            expect(getJoystickDirection(grid)).toBe(-1);
            grid = {
                '4:23': 'o',
                '4:0': '-',
            }
            expect(getJoystickDirection(grid)).toBe(0);
        });

        it('should play a game', () => {
            let completeGame = playGame();
            expect(completeGame.score).toBe(13824);
        });
    });
});
