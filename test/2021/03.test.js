import {
  countBits,
  getPowerConsumption,
  filterForOxygen,
  filterForCo2,
  findLifeSupportRating,
} from '2021/03';
import { mock, entries } from '2021/03.data';

describe('day 3 tests', () => {
  it('should sum the bits by position', () => {
    expect(countBits(mock)).toEqual([7, 5, 8, 7, 5]);
  });

  it('should get rates of summed data', () => {
    expect(getPowerConsumption(mock).gamma).toBe(22);
    expect(getPowerConsumption(mock).epsilon).toBe(9);
  });

  it('should get power consumption of mock data', () => {
    expect(getPowerConsumption(mock).power).toBe(198);
  });

  it('should get power consumption of real data', () => {
    expect(getPowerConsumption(entries).power).toBe(4139586);
  });
});

describe('day 3 part 2 tests', () => {
  it('should filter for oxygen', () => {
    const step1 = filterForOxygen(mock, 0);
    expect(step1).toEqual([
      [1, 1, 1, 1, 0],
      [1, 0, 1, 1, 0],
      [1, 0, 1, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 1, 1, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 1],
    ]);
    const step2 = filterForOxygen(step1, 1);
    expect(step2).toEqual([
      [1, 0, 1, 1, 0],
      [1, 0, 1, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0],
    ]);
    const step3 = filterForOxygen(step2, 2);
    expect(step3).toEqual([
      [1, 0, 1, 1, 0],
      [1, 0, 1, 1, 1],
      [1, 0, 1, 0, 1],
    ]);
    const step4 = filterForOxygen(step3, 3);
    expect(step4).toEqual([
      [1, 0, 1, 1, 0],
      [1, 0, 1, 1, 1],
    ]);
    const step5 = filterForOxygen(step4, 4);
    expect(step5).toEqual([
      [1, 0, 1, 1, 1],
    ]);
  });

  it('should filter for co2', () => {
    const step1 = filterForCo2(mock, 0);
    expect(step1).toEqual([
      [0, 0, 1, 0, 0],
      [0, 1, 1, 1, 1],
      [0, 0, 1, 1, 1],
      [0, 0, 0, 1, 0],
      [0, 1, 0, 1, 0]
    ]);
    const step2 = filterForCo2(step1, 1);
    expect(step2).toEqual([
      [0, 1, 1, 1, 1],
      [0, 1, 0, 1, 0]
    ]);
    const step3 = filterForCo2(step2, 2);
    expect(step3).toEqual([
      [0, 1, 0, 1, 0]
    ]);
  });

  it('should find oxygen in mock data', () => {
    const lsr = findLifeSupportRating(mock);
    expect(lsr.oxygen).toBe(23);
  });

  it('should find CO2 in mock data', () => {
    const lsr = findLifeSupportRating(mock);
    expect(lsr.co2).toBe(10);
  });

  it('should find the life support rating', () => {
    const lsr = findLifeSupportRating(entries);
    expect(lsr.lsr).toBe(1800151);
  });
});
