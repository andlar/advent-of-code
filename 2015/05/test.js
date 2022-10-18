import {
  hasVowels, hasDouble, hasBadPair, isNice, checkList, hasPairs, hasRepeats, isNaughty,
} from './src';
import { real } from './data';

describe('when finding nice words the old way', () => {
  it('should know if words have vowels', () => {
    expect(hasVowels('ugknbfddgicrmopn')).toBe(true);
    expect(hasVowels('dvszwmarrgswjxmb')).toBe(false);
  });

  it('should know if words have doubles', () => {
    expect(hasDouble('ugknbfddgicrmopn')).toBe(true);
    expect(hasDouble('jchzalrnumimnmhp')).toBe(false);
  });

  it('should know if words have bad pairs', () => {
    expect(hasBadPair('ugknbfddgicrmopn')).toBe(false);
    expect(hasBadPair('haegwjzuvuyypxyu')).toBe(true);
  });

  it('should know if words are nice', () => {
    expect(isNice('ugknbfddgicrmopn')).toBe(true);
    expect(isNice('dvszwmarrgswjxmb')).toBe(false);
    expect(isNice('jchzalrnumimnmhp')).toBe(false);
    expect(isNice('haegwjzuvuyypxyu')).toBe(false);
  });

  it('should know how many words on the list are nice', () => {
    expect(checkList([
      'ugknbfddgicrmopn',
      'dvszwmarrgswjxmb',
      'jchzalrnumimnmhp',
      'haegwjzuvuyypxyu'])).toBe(1);
  });

  it('should know how many words are nice', () => {
    expect(checkList(real)).toBe(236);
  });
});

describe('when finding nice words the new way', () => {
  it('should know if words have pairs', () => {
    expect(hasPairs('qjhvhtzxzqqjkmpb')).toBe(true);
    expect(hasPairs('ieodomkazucvgmuy')).toBe(false);
    expect(hasPairs('aaa')).toBe(false);
  });

  it('should know if words have repeats', () => {
    expect(hasRepeats('qjhvhtzxzqqjkmpb')).toBe(true);
    expect(hasRepeats('uurcxstgmygtbstg')).toBe(false);
  });

  it('should know if words are naughty', () => {
    expect(isNaughty('qjhvhtzxzqqjkmpb')).toBe(false);
    expect(isNaughty('ieodomkazucvgmuy')).toBe(true);
    expect(isNaughty('uurcxstgmygtbstg')).toBe(true);
  });

  it('should know how many words on the list are nice', () => {
    expect(checkList([
      'qjhvhtzxzqqjkmpb',
      'ieodomkazucvgmuy',
      'uurcxstgmygtbstg'], isNaughty)).toBe(2);
  });

  it('should know how many words are nice', () => {
    expect(real.length - checkList(real, isNaughty)).toBe(51);
  });
});
