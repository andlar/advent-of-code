import {
  move, findBasement,
} from './src';
import { real } from './data';

describe('when moving floors', () => {
  it('should go a few flights', () => {
    let directions = '(())';
    expect(move(directions)).toBe(0);
    directions = '()()';
    expect(move(directions)).toBe(0);
    directions = '(((';
    expect(move(directions)).toBe(3);
    directions = '))(';
    expect(move(directions)).toBe(-1);
  });

  it('should go a lot of flights', () => {
    expect(move(real)).toBe(232 );
  });
});

describe('when looking for the basement', () => {
  it('should find the position that gets there first', () => {
    expect(findBasement(')')).toBe(1);
    expect(findBasement('()())')).toBe(5);
  });

  it('should handle bad data', () => {
    expect(findBasement('(')).toBeUndefined();
  });

  it('should find the position that gets there first', () => {
    expect(findBasement(real)).toBe(1783);
  });
});
