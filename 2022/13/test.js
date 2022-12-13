import {
  parse,
  makeList,
  isInOrder,
  findIndices,
  getSum,
  sortList,
  findDecoderKey,
} from './src';

import { mock, real } from './data';

describe('when parsing', () => {
  it('should read rows', () => {
    const pairs = parse(mock);
    expect(pairs.length).toBe(8);
  });

  it('should make a big list', () => {
    const list = makeList(mock);
    expect(list.length).toBe(16);
  });
});

describe('when comparing', () => {
  it('should compare integers', () => {
    expect(isInOrder(3, 5)).toBe(true);
    expect(isInOrder(5, 5)).toBe(undefined);
    expect(isInOrder(7, 5)).toBe(false);
  });

  it('should compare lists', () => {
    expect(isInOrder([3], [5])).toBe(true);
    expect(isInOrder([5, 5], [5, 7])).toBe(true);
    expect(isInOrder([5], [5, 5])).toBe(true);
    expect(isInOrder([5], [5])).toBe(undefined);
    expect(isInOrder([5, 5], [5, 5])).toBe(undefined);
    expect(isInOrder([5, 5], [5, 3])).toBe(false);
    expect(isInOrder([5, 5, 5], [5, 5])).toBe(false);
    expect(isInOrder([7], [5])).toBe(false);
  });

  it('should compare mixed things', () => {
    expect(isInOrder([3], 5)).toBe(true);
    expect(isInOrder(5, [5, 5])).toBe(true);
    expect(isInOrder(5, [5])).toBe(undefined);
    expect(isInOrder([5, 5], [5, 5])).toBe(undefined);
    expect(isInOrder([5, 5], [5, 3])).toBe(false);
    expect(isInOrder([5, 5, 5], 5)).toBe(false);
    expect(isInOrder([7], 5)).toBe(false);
  });

  it('should find the indices of the right ordered pairs', () => {
    const pairs = parse(mock);
    const indices = findIndices(pairs);
    expect(indices).toEqual([1, 2, 4, 6]);
  });

  it('should get the sum of the indices', () => {
    const pairs = parse(mock);
    const indices = findIndices(pairs);
    const sum = getSum(indices);
    expect(sum).toBe(13);
  });

  it('should get the sum of the indices on real data', () => {
    const pairs = parse(real);
    const indices = findIndices(pairs);
    const sum = getSum(indices);
    expect(sum).toBe(5003);
  });
});

describe('when sorting', () => {
  it('should sort the list', () => {
    const list = makeList(mock);
    const sorted = sortList(list);
    expect(sorted[0]).toEqual([]);
    expect(sorted[15]).toEqual([9]);
  });

  it('should find the decoder key in any list', () => {
    const list = [1, 2, [[2]], 3, 4, [[6]]];
    const key = findDecoderKey(list);
    expect(key).toBe(3 * 6);
  });

  it('should find the decoder key in the sorted mock list', () => {
    const list = [[[2]], [[6]]].concat(makeList(mock));
    const sorted = sortList(list);
    const key = findDecoderKey(sorted);
    expect(key).toBe(140);
  });

  it('should find the decoder key in the sorted real list', () => {
    const list = [[[2]], [[6]]].concat(makeList(real));
    const sorted = sortList(list);
    const key = findDecoderKey(sorted);
    expect(key).toBe(20280);
  });
});
