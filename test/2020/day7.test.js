import { parseRules, canContain, howManyCanContain, countBags } from '../../src/2020/day7';
import { input } from '../../src/2020/data/day7';
import { mock, mock2 } from './data/day7';

describe('utility functions', () => {
    it('can parse a rule', () => {
        let parsed = parseRules(mock);
        expect(parsed['light red']).toEqual(['bright white', 'muted yellow', 'muted yellow']);
        expect(parsed['faded blue']).toEqual([]);
    });

    it('can contain a bag', () => {
        let rules = parseRules(mock);
        expect(canContain('bright white', 'shiny gold', rules)).toBe(true);
        expect(canContain('light red', 'shiny gold', rules)).toBe(true);
        expect(canContain('dotted black', 'shiny gold', rules)).toBe(false);
    });

    it('knows how many bags it counts as', () => {
        let rules = parseRules(mock);
        expect(countBags('dotted black', rules)).toBe(0);
        expect(countBags('vibrant plum', rules)).toBe(11);
        expect(countBags('shiny gold', rules)).toBe(32);
    });

    it('knows how many bags it counts as on other data', () => {
        let rules = parseRules(mock2);
        expect(countBags('shiny gold', rules)).toBe(126);
    });
});

describe('solutions', () => {
    it('can count how many bags can contain a "shiny gold" one', () => {
        let rules = parseRules(mock);
        expect(howManyCanContain('shiny gold', rules)).toBe(4);
    });

    it('can count how many real bags can contain a "shiny gold" one', () => {
        let rules = parseRules(input);
        expect(howManyCanContain('shiny gold', rules)).toBe(169); // 170 is too high; need to remove global cache
    });

    it('can count how many bags are in a "shiny gold" one', () => {
        let rules = parseRules(input);
        expect(countBags('shiny gold', rules)).toBe(82372); // too high
    });
});
