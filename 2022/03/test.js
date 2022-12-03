import {
  findDuplicates,
  getValue,
  calculateValue,
  findBadges,
} from './src';
import { mock, real } from './data';

describe('when looking at things in the rucksack', () => {
  it('should find the duplicate item', () => {
    const dupes = findDuplicates(mock);
    expect(dupes[0]).toBe('p');
    expect(dupes[1]).toBe('L');
  });

  it('should know the value of letters', () => {
    expect(getValue('a')).toBe(1);
    expect(getValue('p')).toBe(16);
    expect(getValue('A')).toBe(27);
    expect(getValue('P')).toBe(42);
  });

  it('should calculate the value of the duplicates', () => {
    expect(calculateValue(mock)).toBe(157);
  });

  it('should calculate the value of the duplicates in all the bags', () => {
    expect(calculateValue(real)).toBe(8394);
  });

  it('should find the badges', () => {
    const badges = findBadges(mock);
    expect(badges[0]).toBe('r');
    expect(badges[1]).toBe('Z');
  });

  it('should calculate the badge value', () => {
    expect(calculateValue(mock, true)).toBe(70);
  });

  it('should calculate the badge value of all the elves', () => {
    expect(calculateValue(real, true)).toBe(2413);
  });
});
