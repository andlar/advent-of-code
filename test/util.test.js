import { gcd, lcm, drawGrid } from '../src/util';

describe('utility tests', () => {
    describe('math', () => {
        it('should find the greatest common denominator', () => {
            expect(gcd(3,0)).toBe(3);
            expect(gcd(0,-2)).toBe(2);
            expect(gcd(1071,462)).toBe(21);
            expect(gcd(462,1071)).toBe(21);
            expect(gcd(15,-12)).toBe(3)
            expect(gcd(13,17)).toBe(1);
            expect(gcd(3,-3)).toBe(3);
        });

        it('should find the least common multiple', () => {
            expect(lcm(21,6)).toBe(42);
        });
    });

    describe('drawing grids', () => {
        it('should draw a grid', () => {
            let grid = {
                '-1:-1': '#',
                '1:1': '#',
            }
            let output = drawGrid(grid);
            expect(drawGrid(grid)).toBe('#####\n#  ##\n#   #\n##  #\n#####');
            grid = {
                '-1:1': '#',
                '1:-1': '#',
            }
            expect(drawGrid(grid)).toBe('#####\n##  #\n#   #\n#  ##\n#####');
        });
    });
});
