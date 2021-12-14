import {
  parseInput,
  step,
  count,
  getScore,
} from '2021/14';
import { mock, real } from '2021/14.data';

describe('while parsing data', () => {
  it('should interpret input', () => {
    let state = parseInput(mock);
    expect(state.counts['NN']).toBe(1);
    expect(state.counts['NC']).toBe(1);
    expect(state.counts['CB']).toBe(1);
    expect(state.rules['CH']).toEqual(['CB', 'BH']);
    expect(state.rules['CN']).toEqual(['CC', 'CN']);
    expect(state.last).toBe('B');
  });
});

describe('with mock data', () => {
  let state;
  beforeEach(() => {
    state = parseInput(mock);
  });

  it('should step once', () => {
    const next = step(state);
    expect(next.counts['NN']).toBeUndefined()
    expect(next.counts['NC']).toBe(1);
    expect(next.counts['CN']).toBe(1);
    expect(next.counts['NB']).toBe(1);
    expect(next.counts['BC']).toBe(1);
    expect(next.counts['CH']).toBe(1);
    expect(next.counts['HB']).toBe(1);
  });

  describe('with ten steps', () => {
    beforeEach(() => {
      for (let i = 0; i < 10; i++) {
        state = step(state);
      }
    });

    it('should count occurrences', () => {
      const counts = count(state);
      expect(counts['B']).toBe(1749);
      expect(counts['C']).toBe(298);
      expect(counts['H']).toBe(161);
      expect(counts['N']).toBe(865);
    });

    it('should find the score', () => {
      const counts = count(state);
      const score = getScore(counts);
      expect(score).toBe(1588);
    });
  });
});

describe('with real data', () => {
  let state;
  beforeEach(() => {
    state = parseInput(real);
  });

  it('should find the score for ten steps', () => {
    for (let i = 0; i < 10; i++) {
      state = step(state);
    }
    const counts = count(state);
    const score = getScore(counts);
    expect(score).toBe(2194);
  });

  it('should find the score for forty steps', () => {
    for (let i = 0; i < 40; i++) {
      state = step(state);
    }
    const counts = count(state);
    const score = getScore(counts);
    expect(score).toBe(2360298895777);
  });
});
