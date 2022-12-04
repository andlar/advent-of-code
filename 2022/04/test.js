import {
  parseElves,
  contains,
  countUnnecessary,
  overlaps,
} from './src';
import { mock, real } from './data';

describe('when reading input', () => {
  it('should create elves', () => {
    const elves = parseElves(mock[0]);
    expect(elves.startA).toBe(2);
    expect(elves.endA).toBe(4);
    expect(elves.startB).toBe(6);
    expect(elves.endB).toBe(8);
  });
});

describe('when looking at elves', () => {
  it('should know if one assignment contains another', () => {
    const elves = mock.map(parseElves).map(contains);
    expect(elves).toEqual([false, false, false, true, true, false]);
  });

  it('should know how many assignments are unnecessary', () => {
    const total = countUnnecessary(mock);
    expect(total).toBe(2);
  });

  it('should know how many real assignments are unnecessary', () => {
    const total = countUnnecessary(real);
    expect(total).toBe(605);
  });

  it('should know if one assignment overlaps another', () => {
    const elves = mock.map(parseElves).map(overlaps);
    expect(elves).toEqual([false, false, true, true, true, true]);
  });

  it('should know how many assignments are unnecessary when overlaps matter', () => {
    const total = countUnnecessary(mock, overlaps);
    expect(total).toBe(4);
  });

  it('should know how many real assignments are unnecessary when overlaps matter', () => {
    const total = countUnnecessary(real, overlaps);
    expect(total).toBe(914);
  });
});
