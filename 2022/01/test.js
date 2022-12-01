import {
  findMaxElf,
  findTopThree,
} from './src';
import { mock, real } from './data';

describe('when parsing', () => {
  it('should find the max elf load', () => {
    const maxElf = findMaxElf(mock);
    expect(maxElf).toBe(24000);
  });

  it('should find the max elf load of real data', () => {
    const maxElf = findMaxElf(real);
    expect(maxElf).toBe(65912);
  });

  it('should find the top three elf load', () => {
    const maxElf = findTopThree(mock);
    expect(maxElf).toBe(45000);
  });

  it('should find the top three elf load of real data', () => {
    const maxElf = findTopThree(real);
    expect(maxElf).toBe(195625);
  });
});
