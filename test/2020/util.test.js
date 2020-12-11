import { parseInput } from '../../src/2020/util';
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
});
