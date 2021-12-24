import {
  explode,
  split,
  reduce,
  add,
  addAll,
  getMagnitude,
  findLargest,
} from './src';
import { mock, real } from './data';

describe('when reducing', () => {
  it('should explode a number to the right', () => {
    const input = '[[[[[9,8],1],2],3],4]';
    const reduced = explode(input);
    expect(reduced).toBe('[[[[0,9],2],3],4]');
  });

  it('should explode a number to the left', () => {
    const input = '[7,[6,[5,[4,[3,2]]]]]';
    const reduced = explode(input);
    expect(reduced).toBe('[7,[6,[5,[7,0]]]]');
  });

  it('should explode a number on both sides', () => {
    const input = '[[6,[5,[4,[3,2]]]],1]';
    const reduced = explode(input);
    expect(reduced).toBe('[[6,[5,[7,0]]],3]');
  });

  it('should only explode a number once', () => {
    const input = '[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]';
    const reduced = explode(input);
    expect(reduced).toBe('[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]');
  });

  it('should explode numbers that are bigger than 9', () => {
    const input = '[[6,[5,[15,[12,13]]]],16]';
    const reduced = explode(input);
    expect(reduced).toBe('[[6,[5,[27,0]]],29]');
  });

  it('should split even numbers', () => {
    const input = '[10,1]';
    const reduced = split(input);
    expect(reduced).toBe('[[5,5],1]');
  });

  it('should split odd numbers', () => {
    const input = '[13,1]';
    const reduced = split(input);
    expect(reduced).toBe('[[6,7],1]');
  });

  it('should reduce to a final number', () => {
    const input = '[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]';
    const reduced = reduce(input);
    expect(reduced).toBe('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]');
  });
});

describe('when doing math', () => {
  it('should add', () => {
    const n1 = '[[[[4,3],4],4],[7,[[8,4],9]]]';
    const n2 = '[1,1]';
    const added = add(n1, n2);
    expect(added).toBe('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]');
  });

  it('should add a few numbers together', () => {
    const numbers = `[1,1]
[2,2]
[3,3]
[4,4]`.split('\n');
    const added = addAll(numbers);
    expect(added).toBe('[[[[1,1],[2,2]],[3,3]],[4,4]]');
  });

  it('should add a bunch of numbers together', () => {
    const added = addAll(mock);
    expect(added).toBe('[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]');
  });
});

describe('when finding an answer', () => {
  it('should calculate magnitude of a simple pair', () => {
    const number = '[3,9]';
    const magnitude = getMagnitude(number);
    expect(magnitude).toBe(27);
  });

  it('should calculate magnitude of a two level number', () => {
    const number = '[[9,1],[1,9]]';
    const magnitude = getMagnitude(number);
    expect(magnitude).toBe(129);
  });

  it('should calculate magnitude of a complicated number', () => {
    const number = '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]';
    const magnitude = getMagnitude(number);
    expect(magnitude).toBe(3488);
  });
});

describe('when finding the largest magnitude', () => {
  it('should answer a simple question', () => {
    const numbers = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`
          .split('\n');
    const largest = findLargest(numbers);
    expect(largest).toBe(3993);
  });
});

describe('with real data', () => {
  it('should do the homework', () => {
    const added = addAll(real);
    const magnitude = getMagnitude(added);
    expect(magnitude).toBe(4391);
  });

  it('should do the extra homework', () => {
    const largest = findLargest(real);
    expect(largest).toBe(4626);
  });
});
