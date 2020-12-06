import { validPassport, validPassports, tokenize, isValidField, isValidPassport, countValidPassports } from '../../src/2020/day4';
import { passports } from '../../src/2020/data/day4';
import { parseInput } from '../../src/util';
import { mock } from './data/day4';

describe('day 4a tests', () => {
    it('should know what valid passports are', () => {
        expect(validPassport(parseInput(mock)[0])).toBe(true);
        expect(validPassport(parseInput(mock)[1])).toBe(false);
        expect(validPassport(parseInput(mock)[2])).toBe(true);
        expect(validPassport(parseInput(mock)[3])).toBe(false);
    });

    it('should count the total valid passports', () => {
        expect(validPassports(parseInput(mock))).toBe(2);
    });

    it('should count the total valid real passports', () => {
        expect(validPassports(parseInput(passports))).toBe(219);
    });
});

describe('day 4b tests', () => {
    it('should tokenize passports', () => {
        expect(tokenize(parseInput(mock)[0])).toEqual(['ecl:gry', 'pid:860033327', 'eyr:2020', 'hcl:#fffffd', 'byr:1937', 'iyr:2017', 'cid:147', 'hgt:183cm']);
    });

    describe('passport qualities', () => {
        it('should check ecl', () => {
            expect(isValidField('ecl:amb')).toBe(true);
            expect(isValidField('ecl:blu')).toBe(true);
            expect(isValidField('ecl:grn')).toBe(true);
            expect(isValidField('ecl:gry')).toBe(true);
            expect(isValidField('ecl:hzl')).toBe(true);
            expect(isValidField('ecl:oth')).toBe(true);
            expect(isValidField('ecl:xxx')).toBe(false);
        });

        it('should check byr', () => {
            expect(isValidField('byr:2002')).toBe(true);
            expect(isValidField('byr:2003')).toBe(false);
        });

        it('should check iyr', () => {
            expect(isValidField('iyr:2012')).toBe(true);
            expect(isValidField('iyr:2003')).toBe(false);
        });

        it('should check eyr', () => {
            expect(isValidField('eyr:2025')).toBe(true);
            expect(isValidField('eyr:2003')).toBe(false);
        });

        it('should check hgt', () => {
            expect(isValidField('hgt:60in')).toBe(true);
            expect(isValidField('hgt:190cm')).toBe(true);
            expect(isValidField('hgt:190in')).toBe(false);
            expect(isValidField('hgt:190')).toBe(false);
        });

        it('should check hcl', () => {
            expect(isValidField('hcl:#123abc')).toBe(true);
            expect(isValidField('hcl:#123abz')).toBe(false);
            expect(isValidField('hcl:123abc')).toBe(false);
        });

        it('should check pid', () => {
            expect(isValidField('pid:000000001')).toBe(true);
            expect(isValidField('pid:0123456789')).toBe(false);
        });

        it('should report passports as invalid if they have an unidentifed field', () => {
            expect(isValidField('xxx:sasdfa')).toBe(false);
        });
    });

    it('should validate passports', () => {
        expect(isValidPassport('eyr:1972 cid:100 hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926')).toBe(false);
        expect(isValidPassport('iyr:2019 hcl:#602927 eyr:1967 hgt:170cm ecl:grn pid:012533040 byr:1946')).toBe(false);
        expect(isValidPassport('hcl:dab227 iyr:2012 ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277')).toBe(false);
        expect(isValidPassport('hgt:59cm ecl:zzz eyr:2038 hcl:74454a iyr:2023 pid:3556412378 byr:2007')).toBe(false);

        expect(isValidPassport('pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980 hcl:#623a2f')).toBe(true);
        expect(isValidPassport('eyr:2029 ecl:blu cid:129 byr:1989 iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm')).toBe(true);
        expect(isValidPassport('hcl:#888785 hgt:164cm byr:2001 iyr:2015 cid:88 pid:545766238 ecl:hzl eyr:2022')).toBe(true);
        expect(isValidPassport('iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719')).toBe(true);
    });

    it('should count the total valid passports', () => {
        expect(countValidPassports(parseInput(mock))).toBe(2);
    });

    it('should count the total valid real passports', () => {
        expect(countValidPassports(parseInput(passports))).toBe(127); //110 is too low
    });
});
