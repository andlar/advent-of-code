import {
  tokenize,
  sum,
  dropRed,
} from './src';
import { real } from './data';

describe('when tokenizing', () => {
  it('should return just the numbers', () => {
    expect(tokenize('[1,2,3]')).toEqual([1, 2, 3]);
    expect(tokenize('{"a":2,"b":4}')).toEqual([2, 4]);
    expect(tokenize('[[[3]]]')).toEqual([3]);
    expect(tokenize('{"a":{"b":4},"c":-1}')).toEqual([4, -1]);
    expect(tokenize('{"a":[-1,1]}')).toEqual([-1, 1]);
    expect(tokenize('[-1,{"a":1}]')).toEqual([-1, 1]);
    expect(tokenize('[]')).toEqual([]);
    expect(tokenize('{}')).toEqual([]);
  });

  it('should find the sum', () => {
    expect(sum('[1,2,3]')).toBe(6);
    expect(sum('{"a":2,"b":4}')).toBe(6);
    expect(sum('[[[3]]]')).toBe(3);
    expect(sum('{"a":{"b":4},"c":-1}')).toBe(3);
    expect(sum('{"a":[-1,1]}')).toBe(0);
    expect(sum('[-1,{"a":1}]')).toBe(0);
    expect(sum('[]')).toBe(0);
    expect(sum('{}')).toBe(0);
  });

  it('should find the full sum', () => {
    expect(sum(real)).toBe(191164);
  });
});

describe('when ignoring "red"', () => {
  it('should drop "red" array elements', () => {
    expect(dropRed('[1,"red",5]')).toBe('[1,5]');
    expect(dropRed('["red",5]')).toBe('[,5]');
    expect(dropRed('[1,"red"]')).toBe('[1]');
    expect(dropRed('["red"]')).toBe('[]');
  });

  it('should drop "red" object values', () => {
    expect(dropRed('[1,{"c":"red","b":2},3]')).toBe('[1,,3]');
    expect(dropRed('[1,{"c":"red","b":{"c":2},"d":3},3]')).toBe('[1,,3]');
    expect(dropRed('{"d":"red","e":[1,2,3,4],"f":5}')).toBe('');
  });

  it('should find the redacted sum', () => {
    expect(sum(dropRed(real))).toBe(46556); // 46556 is too low
  });
});
