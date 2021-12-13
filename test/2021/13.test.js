import {
  parseInput,
  drawMap,
  fold,
  getCode,
} from '2021/13';
import { mock, real } from '2021/13.data';

describe('while parsing data', () => {
  it('should interpret input', () => {
    let state = parseInput(mock);
    expect(state.dots.size).toBe(18);
    expect(state.folds.length).toBe(2);
    expect(state.maxX).toBe(11);
    expect(state.maxY).toBe(15);
  });
});

describe('with mock data', () => {
  let state;
  beforeEach(() => {
    state = parseInput(mock);
  });

  it('should have an output function', () => {
    const map = drawMap(state);
    expect(map.length).toBe(180);
  });

  it('should fold', () => {
    let next = fold(state);
    expect(next.dots.size).toBe(17);
    expect(next.folds.length).toBe(1);
  });

  it('should get the code', () => {
    let code = getCode(state);
    console.log(drawMap(code));
    expect(code.dots.size).toBe(16);
    expect(code.folds.length).toBe(0);
  });
});

describe('with real data', () => {
  let state;
  beforeEach(() => {
    state = parseInput(real);
  });

  it('should fold', () => {
    let next = fold(state);
    expect(next.dots.size).toBe(716);
    expect(next.folds.length).toBe(11);
  });

  it('should get the code', () => {
    let code = getCode(state);
    console.log(drawMap(code));
    expect(code.dots.size).toBe(97);
    expect(code.folds.length).toBe(0);
  });
});
