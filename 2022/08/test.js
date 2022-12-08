import {
  parseForest,
  isVisible,
  countVisible,
  getScore,
  getBestScore,
} from './src';
import { mock, real } from './data';

describe('when parsing input', () => {
  it('should build a forest', () => {
    const trees = parseForest(mock);
    expect(trees['0:0']).toBe(3);
    expect(trees['0:4']).toBe(3);
    expect(trees['2:2']).toBe(3);
    expect(trees['4:0']).toBe(3);
    expect(trees['4:4']).toBe(0);
  });
});

describe('when looking at the trees in the forest', () => {
  it('should know if a tree is visible when it is on the edge', () => {
    const forest = parseForest(mock);
    expect(isVisible('1:0', forest)).toBe(true);
    expect(isVisible('0:1', forest)).toBe(true);
    expect(isVisible('4:2', forest)).toBe(true);
    expect(isVisible('2:4', forest)).toBe(true);
    expect(isVisible('3:1', forest)).toBe(false);
  });

  it('should know if a tree is visible when it is in the interior', () => {
    const forest = parseForest(mock);
    expect(isVisible('3:2', forest)).toBe(true);
    expect(isVisible('1:3', forest)).toBe(false);
    expect(isVisible('2:3', forest)).toBe(true);
    expect(isVisible('3:1', forest)).toBe(false);
  });

  it('should know how many trees are visible', () => {
    const forest = parseForest(mock);
    const visible = countVisible(forest);
    expect(visible).toBe(21);
  });

  it('should know how many trees are visible in the big forest', () => {
    const forest = parseForest(real);
    const visible = countVisible(forest, 98);
    expect(visible).toBe(1647);
  });

  it('should know edge trees are not good for a treehouse', () => {
    const forest = parseForest(mock);
    expect(getScore('1:0', forest)).toBe(0);
    expect(getScore('0:1', forest)).toBe(0);
    expect(getScore('4:2', forest)).toBe(0);
    expect(getScore('2:4', forest)).toBe(0);
  });

  it('should know the score of central trees', () => {
    const forest = parseForest(mock);
    expect(getScore('2:1', forest)).toBe(4);
    expect(getScore('2:3', forest)).toBe(8);
  });

  it('should find the best score', () => {
    const forest = parseForest(mock);
    expect(getBestScore(forest)).toBe(8);
  });

  it('should find the best score in the big forest', () => {
    const forest = parseForest(real);
    expect(getBestScore(forest, 98)).toBe(392080);
  });
});
