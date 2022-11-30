import {
  parseInput,
  print,
  step,
  settle,
} from './src';
import { mock, real } from './data';

describe('when injesting data', () => {
  it('should find the cucumbers', () => {
    const state = parseInput(mock);
    //console.log(print(state));
    expect(state.east.has('0,0')).toBe(false);
    expect(state.east.has('5,0')).toBe(true);
    expect(state.south.has('0,0')).toBe(true);
    expect(state.south.has('2,2')).toBe(false);
    expect(state.east.size).toBe(23);
    expect(state.south.size).toBe(26);
  });

  it('should find the board size', () => {
    const state = parseInput(mock);
    expect(state.width).toBe(10);
    expect(state.height).toBe(9);
  });
});

xdescribe('when moving', () => {
  let state;
  it('should move with simple data', () => {
    state = parseInput(['...>>>>>...']);
    let next = step(state);
    expect(next.east.has('7,0')).toBe(false);
    expect(next.east.has('8,0')).toBe(true);
    next = step(next);
    expect(next.east.has('7,0')).toBe(true);
    expect(next.east.has('8,0')).toBe(false);
    expect(next.east.has('9,0')).toBe(true);
  });

  describe('with mock data', () => {
    beforeEach(() => {
      state = parseInput(mock);
    });

    it('should take a single step', () => {
      const next = step(state);
      expect(next.east.has('5,0')).toBe(false);
      expect(next.east.has('6,0')).toBe(true);
      expect(next.south.has('0,0')).toBe(false);
      expect(next.south.has('0,1')).toBe(true);
      expect(next.east.size).toBe(23);
      expect(next.south.size).toBe(26);
    });

    it('step until nothing moves', () => {
      const next = settle(state);
      console.log(print(next));
      expect(next.steps).toBe(58);
    });
  });

  describe('with real data', () => {
    beforeEach(() => {
      state = parseInput(real);
    });

    it('step until nothing moves', () => {
      const next = settle(state);
      console.log(print(next));
      expect(next.steps).toBe(58);
    });
  });
});
