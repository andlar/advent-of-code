import {
  getValue,
  getMap,
  parseInput,
  step,
} from '2021/15';
import { mock, real } from '2021/15.data';

describe('while parsing data', () => {
  it('should interpret input', () => {
    let state = parseInput(mock);
    expect(state.size).toBe(10);
    expect(state.fringe.length).toBe(2);
    expect(state.values['0,0']).toBe(1);
    expect(state.map['0,0'].cost).toBe(0);
    expect(state.values['2,0']).toBe(6);
    expect(state.map['2,0']).toBeUndefined();
    expect(state.values['1,1']).toBe(3);
    expect(state.values['9,9']).toBe(1);
  });

  it('should interpret values larger than the map', () => {
    let state = parseInput(mock, 5);
    expect(getValue(state, 0, 0)).toBe(1);
    expect(getValue(state, 10, 0)).toBe(2);
    expect(getValue(state, 10, 10)).toBe(3);
    expect(getValue(state, 50, 50)).toBeUndefined();
    expect(getValue(state, 9, 3)).toBe(9);
    expect(getValue(state, 19, 3)).toBe(1);
    expect(getValue(state, 49, 49)).toBe(9);
    expect(getValue(state, 48, 49)).toBe(7);
  });
});

describe('with mock data', () => {
  let state;
  beforeEach(() => {
    state = parseInput(mock);
  });

  it('should take a step', () => {
    const next = step(state);
    expect(next.map['0,1'].cost).toBe(1);
    expect(next.map['0,1'].source).toBe('0,0');
    expect(next.fringe.length).toBe(3);
    //console.log(getMap(next));
  });

  it('should find the cost to get to the end', () => {
    let next = step(state);
    while (!next.map['9,9']) {
      next = step(next);
      //console.log(getMap(next));
    }
    console.log(getMap(next));
    expect(next.map['9,9'].cost).toBe(40);
  });
});

describe('with real data', () => {
  it('should find the cost to get to the end', () => {
    const state = parseInput(real);
    let next = step(state);
    while (!next.map['99,99']) {
    //for (let i = 0; i < 50; i++) {
      next = step(next);
      //console.log(getMap(next));
      //console.log(`${i}\n${getMap(next)}`);
    }
    //console.log(getMap(next));
    expect(next.map['99,99'].cost).toBe(748);
  });

  it('should find the cost to get to the end', () => {
    const state = parseInput(real, 5);
    let next = step(state);
    while (!next.map['499,499']) {
    //for (let i = 0; i < 50; i++) {
      next = step(next);
      //console.log(getMap(next));
      //console.log(`${i}\n${getMap(next)}`);
    }
    //console.log(getMap(next));
    //console.log(next.map);
    expect(next.map['499,499'].cost).toBe(3045);
  });
});

describe('with expanded mock data', () => {
  let state;
  beforeEach(() => {
    state = parseInput(mock,5 );
  });

  it('should take a step', () => {
    const next = step(state);
    expect(next.map['0,1'].cost).toBe(1);
    expect(next.map['0,1'].source).toBe('0,0');
    expect(next.fringe.length).toBe(3);
    //console.log(getMap(next));
  });

  it('should find the cost to get to the end', () => {
    let next = step(state);
    while (!next.map['49,49']) {
      next = step(next);
      //console.log(getMap(next));
    }
    //console.log(getMap(next));
    expect(next.map['49,49'].cost).toBe(315);
  });
});
