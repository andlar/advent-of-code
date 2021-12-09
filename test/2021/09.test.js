import {
  parseMap,
  findLowpoints,
  findRiskLevel,
} from '2021/09';
import { mock, real } from '2021/09.data';

describe('while parsing data', () => {
  it('should interpret input', () => {
    let state = parseMap(mock);
    expect(state.locations[0]).toBe(2);
    expect(state.locations[9]).toBe(0);
    expect(state.locations[40]).toBe(9);
    expect(state.locations[49]).toBe(8);
    expect(state.mod).toBe(10);
  });
});

describe('with mock data', () => {
  let state;
  beforeEach(() => {
    state = parseMap(mock);
  });

  it('should find lowpoints', () => {
    expect(findLowpoints(state)).toEqual([1, 0, 5, 5]);
  });

  it('should find the risk level', () => {
    expect(findRiskLevel([1, 0, 5, 5])).toBe(15);
  });
});

describe('with real data', () => {
  let state;
  beforeEach(() => {
    state = parseMap(real);
  });

  it('should find the risk level', () => {
    expect(findRiskLevel(findLowpoints(state))).toBeGreaterThan(616);
    expect(findRiskLevel(findLowpoints(state))).toBe(631);
  });
});
