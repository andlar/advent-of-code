import {
  getMap,
  getMappedMap,
  parseInput,
  parseInputAsMap,
  findSource,
  step,
  stepMap,
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

  it('should interpret input', () => {
    let state = parseInputAsMap(mock);
    expect(state.size).toBe(10);
    expect(state.fringe.length).toBe(2);
    expect(state.values['0,0'].value).toBe(1);
    expect(state.values['0,0'].cost).toBe(0);
    expect(state.values['2,0'].value).toBe(6);
    expect(state.values['2,0'].cost).toBeUndefined();
    expect(state.values['1,1'].value).toBe(3);
    expect(state.values['1,1'].cost).toBeUndefined();
    expect(state.values['9,9'].value).toBe(1);
    expect(state.values['9,9'].cost).toBeUndefined();
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
});

describe('with mock data in map form', () => {
  let state;
  beforeEach(() => {
    state = parseInputAsMap(mock);
  });

  it('should take a step', () => {
    const next = stepMap(state);
    expect(next.values['0,1'].cost).toBe(1);
    expect(next.values['0,1'].source).toBe('0,0');
    expect(next.fringe.length).toBe(3);
  });

  it('should find the cost to get to the end', () => {
    let next = stepMap(state);
    while (!next.values['9,9'].cost) {
      next = stepMap(next);
      //console.log(getMappedMap(next));
    }
    //console.log(getMappedMap(next));
    expect(next.values['9,9'].cost).toBe(40);
  });
});

describe('with real data', () => {
  let state;
  beforeEach(() => {
    state = parseInput(real);
  });

  it('should find the cost to get to the end', () => {
    let next = step(state);
    while (!next.values[next.values.length - 1].cost) {
      next = step(next);
    }
    //console.log(getMap(next));
    expect(next.values[next.values.length - 1].cost).toBe(748);
  });
});

describe('with real data in map form', () => {
  let state;
  beforeEach(() => {
    state = parseInputAsMap(real);
  });

  it('should find the cost to get to the end', () => {
    let next = stepMap(state);
    while (!next.values['99,99'].cost) {
    //for (let i = 0; i < 50; i++) {
      next = stepMap(next);
      //console.log(getMappedMap(next));
      //console.log(`${i}\n${getMappedMap(next)}`);
    }
    //console.log(getMappedMap(next));
    expect(next.values['99,99'].cost).toBe(748);
  });
});
