import {
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
  let state;
  beforeEach(() => {
    state = parseInput(real);
  });

  it('should find the cost to get to the end', () => {
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
});
