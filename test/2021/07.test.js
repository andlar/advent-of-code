import {
  findMedian,
  findFuelCost,
  findExpensiveFuelCost,
  findCheapestLocation,
} from '2021/07';
import { mock, real } from '2021/07.data';

describe('while parsing data', () => {
});

describe('with mock data', () => {
  let state;
  beforeEach(() => {
    state = mock;
  });

  it('should find the median', () => {
    const median = findMedian(state);
    expect(median).toBe(2);
  });

  it('should find fuel costs', () => {
    const cost = findFuelCost(state, findMedian(state));
    expect(cost).toBe(37)
  });

  it('should find fuel costs', () => {
    let cost = findExpensiveFuelCost(state, findMedian(state));
    expect(cost).toBe(206)
    cost = findExpensiveFuelCost(state, 5);
    expect(cost).toBe(168)
  });

  it('should find the cheapest location', () => {
    const location = findCheapestLocation(state);
    expect(location.location).toBe(5);
    expect(location.cost).toBe(168);
  });
});

describe('with real data', () => {
  let state;
  beforeEach(() => {
    state = real;
  });

  it('should find fuel costs', () => {
    const cost = findFuelCost(state, findMedian(state));
    expect(cost).toBe(344735)
  });

  it('should find the cheapest location', () => {
    const location = findCheapestLocation(state);
    expect(location.location).toBe(474);
    expect(location.cost).toBe(96798233);
  });
});
