import { drawGrid, gcd, lcm, parseInput } from '../src/util';
import { mockInput } from './data/util';

describe('utility tests', () => {
    describe('parsing input', () => {
        it('should parse batch files', () => {
            expect(parseInput(mockInput)[0]).toBe('ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm');
            expect(parseInput(mockInput)[1]).toBe('iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884 hcl:#cfa07d byr:1929');
            expect(parseInput(mockInput)[2]).toBe('hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm');
            expect(parseInput(mockInput)[3]).toBe('hcl:#cfa07d eyr:2025 pid:166559648 iyr:2011 ecl:brn hgt:59in');
        });
    });

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

        it('should be able to flip it vertically', () => {
            let grid = {
                '-1:-1': '#',
                '1:1': '#',
            }
            let options = {
                verticalFlip: true,
            }
            expect(drawGrid(grid, options)).toBe('#####\n##  #\n#   #\n#  ##\n#####');
            grid = {
                '-1:1': '#',
                '1:-1': '#',
            }
            expect(drawGrid(grid, options)).toBe('#####\n#  ##\n#   #\n##  #\n#####');
        });
    });
});
