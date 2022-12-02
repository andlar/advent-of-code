import {
  findTotalScore,
} from './src';
import { mock, real } from './data';

describe('when reading rules', () => {
  it('should find the total score', () => {
    const score = findTotalScore(mock);
    expect(score).toBe(15);
  });

  it('should find the total score of real data', () => {
    const score = findTotalScore(real);
    expect(score).toBe(12679);
  });

  it('should find the total score, when looking for a specific outcome', () => {
    const score = findTotalScore(mock, true);
    expect(score).toBe(12);
  });

  it('should find the total score of real data, when looking for a specific outcome', () => {
    const score = findTotalScore(real, true);
    expect(score).toBe(14470);
  });
});
