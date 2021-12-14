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
    expect(state.template).toBe('NNCB');
    expect(state.rules['CH']).toBe('B');
    expect(state.rules['CN']).toBe('C');
  });
});

describe('with mock data', () => {
  let state;
  beforeEach(() => {
    state = parseInput(mock);
  });

  it('should step once', () => {
    const next = step(state);
    expect(next.template).toBe('NCNBCHB');
  });

  it('should step four times', () => {
    let next = step(state);
    next = step(next);
    next = step(next);
    next = step(next);
    expect(next.template).toBe('NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB');
  });

  describe('with ten steps', () => {
    beforeEach(() => {
      state = step(state);
      state = step(state);
      state = step(state);
      state = step(state);
      state = step(state);
      state = step(state);
      state = step(state);
      state = step(state);
      state = step(state);
      state = step(state);
    });

    it('should have the right length', () => {
      expect(state.template.length).toBe(3073);
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

  xit('should find the score for forty steps', () => {
    for (let i = 0; i < 40; i++) {
      state = step(state);
    }
    const counts = count(state);
    const score = getScore(counts);
    expect(score).toBe(2194);
  });
});
