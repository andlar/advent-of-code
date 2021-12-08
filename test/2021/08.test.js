import {
  parseLine,
  countEasyOutputs,
  analyzePatterns,
  readEntry,
} from '2021/08';
import { simple, mock, real } from '2021/08.data';

describe('while parsing data', () => {
  it('should break up lines', () => {
    let state = parseLine(mock[0]);
    expect(state.patterns['be']).toBeUndefined();
    expect(Object.keys(state.patterns)[0]).toBe('be');
    expect(state.digits[0]).toBe('abcdefg');
    expect(state.reverse['0']).toBeUndefined();
  });

  describe('while analyzing patterns', () => {
  let state;
    beforeEach(() => {
      state = parseLine(simple);
    });

    it('should determine what simple numbers are made by what patterns', () => {
      state = analyzePatterns(state);
      expect(state.patterns['ab']).toBe(1);
      expect(state.reverse['1']).toBe('ab');
      expect(state.patterns['abd']).toBe(7);
      expect(state.reverse['7']).toBe('abd');
      expect(state.patterns['abef']).toBe(4);
      expect(state.reverse['4']).toBe('abef');
      expect(state.patterns['abcdefg']).toBe(8);
      expect(state.reverse['8']).toBe('abcdefg');
    });

    it('should determine what complex numbers are made by what patterns', () => {
      state = analyzePatterns(state);
      expect(state.patterns['abcdf']).toBe(3);
      expect(state.reverse['3']).toBe('abcdf');
      expect(state.patterns['abcdef']).toBe(9);
      expect(state.reverse['9']).toBe('abcdef');
      expect(state.patterns['bcdef']).toBe(5);
      expect(state.reverse['5']).toBe('bcdef');
      expect(state.patterns['acdfg']).toBe(2);
      expect(state.reverse['2']).toBe('acdfg');
      expect(state.patterns['abcdeg']).toBe(0);
      expect(state.reverse['0']).toBe('abcdeg');
      expect(state.patterns['bcdefg']).toBe(6);
      expect(state.reverse['6']).toBe('bcdefg');
    });

    it('should read the entry', () => {
      state = analyzePatterns(state);
      state = readEntry(state);
      expect(state.entry).toBe(5353);
    });
  });
});

describe('with mock data', () => {
  let state;
  beforeEach(() => {
    state = mock.map((line) => parseLine(line));
  });

  it('should count easy digits', () => {
    expect(countEasyOutputs(state)).toBe(26);
  });

  it('should read the numbers', () => {
    state = state
      .map((s) => analyzePatterns(s))
      .map((s) => readEntry(s));
    expect(state[0].entry).toBe(8394);
  });

  it('should know the sum', () => {
    const sum = state
          .map((s) => analyzePatterns(s))
          .map((s) => readEntry(s).entry)
          .reduce((total, entry) => total += entry, 0);
    expect(sum).toBe(61229);
  });
});

describe('with real data', () => {
  let state;
  beforeEach(() => {
    state = real.map((line) => parseLine(line));
  });

  it('should count easy digits', () => {
    expect(countEasyOutputs(state)).toBe(409);
  });

  it('should know the sum', () => {
    const sum = state
          .map((s) => analyzePatterns(s))
          .map((s) => readEntry(s).entry)
          .reduce((total, entry) => total += entry, 0);
    expect(sum).toBe(1024649);
  });
});
