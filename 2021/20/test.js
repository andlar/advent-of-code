import {
  parseInput,
  enhance,
  print,
  lit,
} from './src';
import { mock, real } from './data';

describe('when injesting data', () => {
  it('should get the algorithm', () => {
    const { algorithm } = parseInput(mock);
    expect(algorithm.has(0)).toBe(false);
    expect(algorithm.has(2)).toBe(true);
    expect(algorithm.has(510)).toBe(false);
    expect(algorithm.has(511)).toBe(true);
    expect(algorithm.size).toBe(238);
  });

  it('should get the image', () => {
    const { state } = parseInput(mock);
    expect(state.image['0,0']).toBe(true);
    expect(state.image['1,1']).toBe(false);
    expect(state.image['3,0']).toBe(true);
    expect(state.image['0,2']).toBe(true);
    expect(state.image['2,2']).toBe(false);
    expect(state.image['-1,-1']).toBeUndefined();
    expect(state.max.x).toBe(4);
    expect(state.max.y).toBe(4);
    expect(state.min.x).toBe(0);
    expect(state.min.y).toBe(0);
    expect(state.unknown).toBe(false);
  });
});

describe('when enhancing a mock image', () => {
  it('should enhance an image', () => {
    const { algorithm, state } = parseInput(mock);
    const next = enhance(algorithm, state);
    expect(next.unknown).toBe(false);
    expect(lit(next)).toBe(24);
  });

  it('should enhance an image twice', () => {
    const { algorithm, state } = parseInput(mock);
    let next = enhance(algorithm, state);
    //console.log(print(next));
    next = enhance(algorithm, next);
    //console.log(print(next));
    expect(next.unknown).toBe(false);
    expect(lit(next)).toBe(35);
  });

  it('should enhance an image 50 times', () => {
    const { algorithm, state } = parseInput(mock);
    let next = {...state};
    for (let i = 0; i < 50; i++) {
      next = enhance(algorithm, next);
    }
    //console.log(print(next));
    expect(next.unknown).toBe(false);
    expect(lit(next)).toBe(3351);
  });
});

describe('when enhancing the real image', () => {
  it('should enhance an image twice', () => {
    const { algorithm, state } = parseInput(real);
    //console.log(print(state));
    expect(lit(state)).toBe(5036);
    let next = enhance(algorithm, state);
    //console.log(print(next));
    expect(next.unknown).toBe(true);
    expect(lit(next)).toBe(4784);
    next = enhance(algorithm, next);
    expect(next.unknown).toBe(false);
    expect(lit(next)).toBeLessThan(5392);
    expect(lit(next)).toBeLessThan(5196);
    expect(lit(next)).toBe(4917);
  });

  it('should enhance an image 50 times', () => {
    const { algorithm, state } = parseInput(real);
    let next = {...state};
    for (let i = 0; i < 50; i++) {
      next = enhance(algorithm, next);
    }
    //console.log(print(next));
    expect(next.unknown).toBe(false);
    expect(lit(next)).toBe(16389);
  });
});
