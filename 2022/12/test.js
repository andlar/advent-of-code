import {
  makeGrid,
  populateGrid,
  initializeAlg,
  step,
  search,
} from './src';
import { mock, real } from './data';

describe('when setting up', () => {
  it('should make a grid', () => {
    const [grid, s, e] = makeGrid([...mock]);
    expect(s).toEqual({x: 0, y: 0});
    expect(e).toEqual({x: 5, y: 2});
    expect(grid[0]).toEqual({x: 0, y: 0, val: 'a'});
  });

  it('should populate the grid with basic data', () => {
    const [grid, s, e] = makeGrid([...mock]);
    const out = populateGrid(grid, s, e);
    expect(out[0]).toEqual({x: 0, y: 0, val: 'a', f: 7, g: 0, h: 7, parent: undefined});
    expect(out[1]).toEqual({x: 1, y: 0, val: 'a', f: undefined, g: undefined, h: 6, parent: undefined});
    expect(out[21]).toEqual({x: 5, y: 2, val: 'z', f: undefined, g: undefined, h: 0, parent: undefined});
  });

  it('should initialize the algorithm', () => {
    const [grid, s, e] = makeGrid([...mock]);
    const out = populateGrid(grid, s, e);
    const [open, closed] = initializeAlg(out);
    expect(open).toEqual([{x: 0, y: 0, val: 'a', f: 7, g: 0, h: 7, parent: undefined}]);
    expect(closed).toEqual([]);
  });
});

describe('when searching for a path up', () => {
  it('should take the first step', () => {
    const [g, s, e] = makeGrid([...mock]);
    let grid = populateGrid(g, s, e);
    let [open, closed] = initializeAlg(grid);
    [grid, open, closed] = step(grid, open, closed, e);
    expect(open.length).toBe(2);
    expect(closed.length).toBe(1);
  });

  it('should take a few steps', () => {
    const [g, s, e] = makeGrid([...mock]);
    let grid = populateGrid(g, s, e);
    let [open, closed] = initializeAlg(grid);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    expect(open.length).toBe(3);
    expect(closed.length).toBe(3);
    [grid, open, closed] = step(grid, open, closed);
    expect(open.length).toBe(3);
    expect(closed.length).toBe(4);
    [grid, open, closed] = step(grid, open, closed);
    expect(open.length).toBe(3);
    expect(closed.length).toBe(5);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    expect(open.length).toBe(3);
    expect(closed.length).toBe(8);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    expect(open.length).toBe(3);
    expect(closed.length).toBe(11);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    expect(open.length).toBe(2);
    expect(closed.length).toBe(13);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    expect(open.length).toBe(1);
    expect(closed.length).toBe(15);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    expect(open.length).toBe(1);
    expect(closed.length).toBe(22);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    expect(open.length).toBe(1);
    expect(closed.length).toBe(29);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    expect(open.length).toBe(1);
    expect(closed.length).toBe(36);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    [grid, open, closed] = step(grid, open, closed);
    expect(open.length).toBe(1);
    expect(closed.length).toBe(39);
  });

  it('should search', () => {
    const [g, s, e] = makeGrid([...mock]);
    const grid = populateGrid(g, s, e);
    const [closed, final] = search(grid, e);
    expect(closed.length).toBe(40);
    expect(final.g).toBe(31);
  });

  it('should search the big hill', () => {
    const [g, s, e] = makeGrid([...real]);
    const grid = populateGrid(g, s, e);
    const [closed, final] = search(grid, e);
    expect(closed.length).toBe(5489);
    expect(final.g).toBe(456);
  });
});

describe('when searching for the best path', () => {
  it('should take the first step', () => {
    const [g, end, start] = makeGrid([...mock]);
    let grid = populateGrid(g, start, end, true);
    let [open, closed] = initializeAlg(grid);
    [grid, open, closed] = step(grid, open, closed, true);
    expect(open.length).toBe(1);
    expect(closed.length).toBe(1);
  });

  it('should search', () => {
    const [g, end, start] = makeGrid([...mock]);
    const grid = populateGrid(g, start, end, true);
    const [closed, final] = search(grid, end, true);
    expect(closed.length).toBe(35);
    expect(final.g).toBe(29);
  });

  it('should search the big hill', () => {
    const [g, end, start] = makeGrid([...real]);
    const grid = populateGrid(g, start, end, true);
    const [closed, final] = search(grid, end, true);
    expect(closed.length).toBe(3539);
    expect(final.g).toBe(454);
  });
});
