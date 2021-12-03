import { sumBits, getGamma, getPowerConsumption } from '2021/03';
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

});
