import {
  parseMap,
  findLowpoints,
  findRiskLevel,
  mapBasins,
  getMap,
  calculateBasins,
} from '2021/09';
import { mock, real } from '2021/09.data';

describe('while parsing data', () => {
  it('should interpret input', () => {
    let state = parseMap(mock);
    expect(state.locations[0]).toEqual({value: 2, drainsTo: undefined});
    expect(state.locations[9]).toEqual({value: 0, drainsTo: undefined});
    expect(state.locations[40]).toEqual({value: 9, drainsTo: undefined});
    expect(state.locations[49]).toEqual({value: 8, drainsTo: undefined});
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

  it('should map basins', () => {
    state = mapBasins(state);
    expect(state).toEqual([
      { value: 1, drainsTo: 1, basinSize: 3 },
      { value: 0, drainsTo: 9, basinSize: 9 },
      { value: 5, drainsTo: 22, basinSize: 14 },
      { value: 5, drainsTo: 46, basinSize: 9 }
    ]);
  });

  it('should calculate basin size', () => {
    state = calculateBasins(mapBasins(state));
    expect(state).toBe(1134);
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

  it('should calculate basin size', () => {
    state = calculateBasins(mapBasins(state));
    expect(state).toBe(821560);
  });
});
