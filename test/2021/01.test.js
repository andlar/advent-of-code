import { countIncreases } from '2021/01';
import { mock, entries } from '2021/01.data';

describe('day 1 tests', () => {
  it('should count increases in mock data', () => {
    expect(countIncreases(mock)).toEqual(7);
  });

  it('should count increases in real data', () => {
    expect(countIncreases(entries)).toBeGreaterThan(1531);
    expect(countIncreases(entries)).toBe(1532);
  });
});

describe('day 1 part 2 tests', () => {
  it('should count offset increases in mock data', () => {
    expect(countIncreases(mock, 3)).toEqual(5);
  });

  it('should count offset increases in real data', () => {
    expect(countIncreases(entries, 3)).toEqual(1571);
  });
});
