import {
  getMap,
  parseInput,
  findSource,
  step,
  multiplyMap,
} from '2021/15';
import { mock, real } from '2021/15.data';

describe('while parsing data', () => {
  it('should interpret input', () => {
    let state = parseInput(mock);
    expect(state.xs).toBe(10);
    expect(state.fringe.length).toBe(2);
    expect(state.values.length).toBe(100);
    expect(state.values[0].value).toBe(1);
    expect(state.values[0].x).toBe(0);
    expect(state.values[0].y).toBe(0);
    expect(state.values[0].cost).toBe(0);
    expect(state.values[11].value).toBe(3);
    expect(state.values[11].x).toBe(1);
    expect(state.values[11].y).toBe(1);
    expect(state.values[11].cost).toBeUndefined();
    expect(state.values[99].x).toBe(9);
    expect(state.values[99].y).toBe(9);
    expect(state.values[99].cost).toBeUndefined();
  });
});

describe('with mock data', () => {
  let state;
  beforeEach(() => {
    state = parseInput(mock);
  });

  it('should find the previous step', () => {
    const target = {x: 1, y: 0};
    const previous = findSource(state, target);
    expect(previous.x).toBe(0);
    expect(previous.y).toBe(0);
  });

  it('should take a step', () => {
    const next = step(state);
    expect(next.values[1].cost).toBe(1);
    expect(next.values[1].guess).toBeUndefined();
    expect(next.fringe.length).toBe(3);
  });

  it('should find the cost to get to the end', () => {
    let next = step(state);
    while (!next.values[next.values.length - 1].cost) {
      next = step(next);
      //console.log(getMap(next));
    }
    //console.log(getMap(next));
    expect(next.values[next.values.length - 1].cost).toBe(40);
  });

  it('should multiply the map', () => {
    let next = multiplyMap(state);
    console.log(getMap(next));
    expect(next.values.length).toBe(2500);
    expect(next.xs).toBe(50);
  });
});

xdescribe('with real data', () => {
  let state;
  beforeEach(() => {
    state = parseInput(real);
  });

  it('should find the cost to get to the end', () => {
    let next = step(state);
    while (!next.values[next.values.length - 1].cost) {
      next = step(next);
    }
    console.log(getMap(next));
    expect(next.values[next.values.length - 1].cost).toBe(748);
  });
});
