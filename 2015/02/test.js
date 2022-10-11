import {
  getPaperSize, getReorderSize,
  getRibbonLength, getReorderLength,
} from './src';
import { real } from './data';

describe('when wrapping boxes', () => {
  it('should know how much paper is needed', () => {
    expect(getPaperSize('2x3x4')).toBe(58);
    expect(getPaperSize('1x1x10')).toBe(43);
  });

  it('should know how much total paper is needed', () => {
    expect(getReorderSize(['2x3x4', '1x1x10'])).toBe(58 + 43);
  });

  it('should know how much total paper needs to be ordered', () => {
    expect(getReorderSize(real)).toBe(1606483);
  });

  it('should know how much ribbon is needed', () => {
    expect(getRibbonLength('2x3x4')).toBe(34);
    expect(getRibbonLength('1x1x10')).toBe(14);
  });

  it('should know how much total ribbon is needed', () => {
    expect(getReorderLength(['2x3x4', '1x1x10'])).toBe(34 + 14);
  });

  it('should know how much total paper needs to be ordered', () => {
    expect(getReorderLength(real)).toBe(3842356);
  });
});
