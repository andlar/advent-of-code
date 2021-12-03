import {
  sumBits,
  getGamma,
  getPowerConsumption,
  filterForOxygen,
  filterForCo2,
  findOxygen,
  findCo2,
} from '2021/03';
import { mock, entries } from '2021/03.data';

describe('day 3 tests', () => {
  it('should sum the bits by position', () => {
    expect(sumBits(mock)).toEqual([7, 5, 8, 7, 5]);
  });

  it('should get rates of summed data', () => {
    expect(getGamma(mock)).toBe('10110');
  });

  it('should get power consumption of mock data', () => {
    expect(getPowerConsumption(mock)).toBe(198);
  });

  it('should get power consumption of real data', () => {
    expect(getPowerConsumption(entries)).toBe(4139586);
  });
});

describe('day 3 part 2 tests', () => {
  it('should filter for oxygen', () => {
    const step1 = filterForOxygen(mock, 0, true);
    expect(step1).toEqual([
      [1, 1, 1, 1, 0],
      [1, 0, 1, 1, 0],
      [1, 0, 1, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 1, 1, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 1],
    ]);
    const step2 = filterForOxygen(step1, 1, true);
    expect(step2).toEqual([
      [1, 0, 1, 1, 0],
      [1, 0, 1, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0],
    ]);
    const step3 = filterForOxygen(step2, 2, true);
    expect(step3).toEqual([
      [1, 0, 1, 1, 0],
      [1, 0, 1, 1, 1],
      [1, 0, 1, 0, 1],
    ]);
    const step4 = filterForOxygen(step3, 3, true);
    expect(step4).toEqual([
      [1, 0, 1, 1, 0],
      [1, 0, 1, 1, 1],
    ]);
    const step5 = filterForOxygen(step4, 4, true);
    expect(step5).toEqual([
      [1, 0, 1, 1, 1],
    ]);
  });

  it('should filter for co2', () => {
    const step1 = filterForCo2(mock, 0, false);
    expect(step1).toEqual([
      [0, 0, 1, 0, 0],
      [0, 1, 1, 1, 1],
      [0, 0, 1, 1, 1],
      [0, 0, 0, 1, 0],
      [0, 1, 0, 1, 0]
    ]);
    const step2 = filterForCo2(step1, 1, false);
    expect(step2).toEqual([
      [0, 1, 1, 1, 1],
      [0, 1, 0, 1, 0]
    ]);
    const step3 = filterForCo2(step2, 2, false);
    expect(step3).toEqual([
      [0, 1, 0, 1, 0]
    ]);
  });

  it('should find oxygen in mock data', () => {
    expect(findOxygen(mock)).toBe(23);
  });

  it('should find CO2 in mock data', () => {
    expect(findCo2(mock)).toBe(10);
  });

  it('should find the life support rating', () => {
    const oxygen = findOxygen(entries);
    const co2 = findCo2(entries);
    const data = {
      oxygen,
      co2,
      lsr: oxygen * co2,
    };
    expect(data).toEqual({oxygen: 2539, co2: 709, lsr: 1800151});
  });
});
