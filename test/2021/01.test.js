import { countIncreases, convertToWindows, parseData } from '2021/01';
import { mock, entries } from '2021/01.data';

describe('day 1 tests', () => {
  it('should parse input as numbers', () => {
    expect(parseData(mock)).toEqual([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]);
  });

  it('should count increases in mock data', () => {
    const parsed = parseData(mock);
    expect(countIncreases(parsed)).toEqual(7);
  });

  it('should count increases in real data', () => {
    const parsed = parseData(entries);
    expect(countIncreases(parsed)).toBeGreaterThan(1531);
    expect(countIncreases(parsed)).toBe(1532);
  });
});

describe('day 1 part 2 tests', () => {
  it('should convert data to windows', () => {
    expect(convertToWindows(mock)).toEqual([607, 618, 618, 617, 647, 716, 769, 792, NaN, NaN]);
  });

  it('should count increase in mock windows', () => {
    expect(countIncreases(convertToWindows(mock))).toEqual(5);
  });

  it('should count increase in real windows', () => {
    expect(countIncreases(convertToWindows(entries))).toEqual(1571);
  });
});
