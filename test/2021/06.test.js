import {
  parseData,
  tick,
  countFish,
} from '2021/06';
import { mock, real } from '2021/06.data';

describe('while parsing data', () => {
  it('should convert it to counts', () => {
    const state = parseData(mock);
    expect(state[0]).toBe(0);
    expect(state[1]).toBe(1);
    expect(state[2]).toBe(1);
    expect(state[3]).toBe(2);
    expect(state[4]).toBe(1);
    expect(state[5]).toBe(0);
    expect(state[6]).toBe(0);
    expect(state[7]).toBe(0);
    expect(state[8]).toBe(0);
  });
});

describe('with mock data', () => {
  let state;
  beforeEach(() => {
    state = parseData(mock);
  });

  it('should tick', () => {
    state = tick(state);
    expect(state[0]).toBe(1);
    expect(state[1]).toBe(1);
    expect(state[2]).toBe(2);
    expect(state[3]).toBe(1);
    expect(state[4]).toBe(0);
    expect(state[5]).toBe(0);
    expect(state[6]).toBe(0);
    expect(state[7]).toBe(0);
    expect(state[8]).toBe(0);
    state = tick(state);
    expect(state[0]).toBe(1);
    expect(state[1]).toBe(2);
    expect(state[2]).toBe(1);
    expect(state[3]).toBe(0);
    expect(state[4]).toBe(0);
    expect(state[5]).toBe(0);
    expect(state[6]).toBe(1);
    expect(state[7]).toBe(0);
    expect(state[8]).toBe(1);
  });

  it('should know how many fish there are', () => {
    expect(countFish(state)).toBe(5);
  });

  it('should know how many fish there are after 18 days', () => {
    for (let i = 0; i < 18; i++) {
      state = tick(state);
    }
    expect(countFish(state)).toBe(26);
  });

  it('should know how many fish there are after 80 days', () => {
    for (let i = 0; i < 80; i++) {
      state = tick(state);
    }
    expect(countFish(state)).toBe(5934);
  });

  it('should know how many fish there are after 256 days', () => {
    for (let i = 0; i < 256; i++) {
      state = tick(state);
    }
    expect(countFish(state)).toBe(26984457539);
  });
});

describe('with real data', () => {
  let state;
  beforeEach(() => {
    state = parseData(real);
  });

  it('should know how many fish there are after 80 days', () => {
    for (let i = 0; i < 80; i++) {
      state = tick(state);
    }
    expect(countFish(state)).toBe(353079);
  });

  it('should know how many fish there are after 256 days', () => {
    for (let i = 0; i < 256; i++) {
      state = tick(state);
    }
    expect(countFish(state)).toBe(1605400130036);
  });
});
