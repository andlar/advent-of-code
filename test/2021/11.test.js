import {
  parseInput,
  getDisplay,
  incrementAll,
  flashOnce,
  flashAll,
  reset,
  step,
  stepUntilSynchronized,
} from '2021/11';
import { mock, real } from '2021/11.data';

describe('while parsing data', () => {
  it('should interpret input', () => {
    let state = parseInput(mock);
    expect(state.locations[0]).toEqual({value: 5, flashed: false});
    expect(state.locations[9]).toEqual({value: 3, flashed: false});
    expect(state.locations[90]).toEqual({value: 5, flashed: false});
    expect(state.locations[99]).toEqual({value: 6, flashed: false});
    expect(state.mod).toBe(10);
    expect(state.flashes).toBe(0);
  });
});

describe('with mock data', () => {
  let state;
  beforeEach(() => {
    state = parseInput(mock);
  });

  it('should increment all octopuses', () => {
    state = incrementAll(state);
    expect(state.locations[0]).toEqual({value: 6, flashed: false});
    expect(state.locations[2]).toEqual({value: 9, flashed: false});
    expect(state.locations[9]).toEqual({value: 4, flashed: false});
    expect(state.locations[90]).toEqual({value: 6, flashed: false});
    expect(state.locations[99]).toEqual({value: 7, flashed: false});
  });

  it('should flash all octopuses once in all directions', () => {
    state = parseInput(['000', '090', '000']);
    state = incrementAll(state);
    state = flashOnce(state);
    expect(state.locations[0]).toEqual({value: 2, flashed: false});
    expect(state.locations[1]).toEqual({value: 2, flashed: false});
    expect(state.locations[2]).toEqual({value: 2, flashed: false});
    expect(state.locations[3]).toEqual({value: 2, flashed: false});
    expect(state.locations[4]).toEqual({value: 10, flashed: true});
    expect(state.locations[5]).toEqual({value: 2, flashed: false});
    expect(state.locations[6]).toEqual({value: 2, flashed: false});
    expect(state.locations[7]).toEqual({value: 2, flashed: false});
    expect(state.locations[8]).toEqual({value: 2, flashed: false});
  });

  it('should flash all octopuses once from the nw', () => {
    state = parseInput(['900', '000', '000']);
    state = incrementAll(state);
    state = flashOnce(state);
    expect(state.locations[0]).toEqual({value: 10, flashed: true});
    expect(state.locations[1]).toEqual({value: 2, flashed: false});
    expect(state.locations[2]).toEqual({value: 1, flashed: false});
    expect(state.locations[3]).toEqual({value: 2, flashed: false});
    expect(state.locations[4]).toEqual({value: 2, flashed: false});
    expect(state.locations[5]).toEqual({value: 1, flashed: false});
    expect(state.locations[6]).toEqual({value: 1, flashed: false});
    expect(state.locations[7]).toEqual({value: 1, flashed: false});
    expect(state.locations[8]).toEqual({value: 1, flashed: false});
  });

  it('should flash all octopuses once from the ne', () => {
    state = parseInput(['009', '000', '000']);
    state = incrementAll(state);
    state = flashOnce(state);
    expect(state.locations[0]).toEqual({value: 1, flashed: false});
    expect(state.locations[1]).toEqual({value: 2, flashed: false});
    expect(state.locations[2]).toEqual({value: 10, flashed: true});
    expect(state.locations[3]).toEqual({value: 1, flashed: false});
    expect(state.locations[4]).toEqual({value: 2, flashed: false});
    expect(state.locations[5]).toEqual({value: 2, flashed: false});
    expect(state.locations[6]).toEqual({value: 1, flashed: false});
    expect(state.locations[7]).toEqual({value: 1, flashed: false});
    expect(state.locations[8]).toEqual({value: 1, flashed: false});
  });

  it('should flash all octopuses once from the se', () => {
    state = parseInput(['000', '000', '009']);
    state = incrementAll(state);
    state = flashOnce(state);
    expect(state.locations[0]).toEqual({value: 1, flashed: false});
    expect(state.locations[1]).toEqual({value: 1, flashed: false});
    expect(state.locations[2]).toEqual({value: 1, flashed: false});
    expect(state.locations[3]).toEqual({value: 1, flashed: false});
    expect(state.locations[4]).toEqual({value: 2, flashed: false});
    expect(state.locations[5]).toEqual({value: 2, flashed: false});
    expect(state.locations[6]).toEqual({value: 1, flashed: false});
    expect(state.locations[7]).toEqual({value: 2, flashed: false});
    expect(state.locations[8]).toEqual({value: 10, flashed: true});
  });

  it('should flash all octopuses once from the sw', () => {
    state = parseInput(['000', '000', '900']);
    state = incrementAll(state);
    state = flashOnce(state);
    expect(state.locations[0]).toEqual({value: 1, flashed: false});
    expect(state.locations[1]).toEqual({value: 1, flashed: false});
    expect(state.locations[2]).toEqual({value: 1, flashed: false});
    expect(state.locations[3]).toEqual({value: 2, flashed: false});
    expect(state.locations[4]).toEqual({value: 2, flashed: false});
    expect(state.locations[5]).toEqual({value: 1, flashed: false});
    expect(state.locations[6]).toEqual({value: 10, flashed: true});
    expect(state.locations[7]).toEqual({value: 2, flashed: false});
    expect(state.locations[8]).toEqual({value: 1, flashed: false});
  });

  it('should flash all octopuses once', () => {
    state = incrementAll(state);
    state = incrementAll(state);
    state = flashOnce(state);
    expect(state.locations[0]).toEqual({value: 8, flashed: false});
    expect(state.locations[1]).toEqual({value: 8, flashed: false});
    expect(state.locations[2]).toEqual({value: 11, flashed: true});
    expect(state.locations[9]).toEqual({value: 5, flashed: false});
    expect(state.locations[90]).toEqual({value: 8, flashed: false});
    expect(state.locations[99]).toEqual({value: 8, flashed: false});
    expect(state.flashes).toBe(17);
  });

  it('should flash until nothing is left to flash', () => {
    state = incrementAll(state);
    state = incrementAll(state);
    state = flashAll(state);
    expect(state.locations[0]).toEqual({value: 8, flashed: false});
    expect(state.locations[1]).toEqual({value: 8, flashed: false});
    expect(state.locations[2]).toEqual({value: 11, flashed: true});
    expect(state.locations[9]).toEqual({value: 5, flashed: false});
    expect(state.locations[90]).toEqual({value: 8, flashed: false});
    expect(state.locations[99]).toEqual({value: 8, flashed: false});
    expect(state.flashes).toBe(35);
  });

  it('should reset after flashing', () => {
    state = incrementAll(state);
    state = incrementAll(state);
    state = flashAll(state);
    state = reset(state);
    expect(state.locations[0]).toEqual({value: 8, flashed: false});
    expect(state.locations[1]).toEqual({value: 8, flashed: false});
    expect(state.locations[2]).toEqual({value: 0, flashed: false});
    expect(state.locations[9]).toEqual({value: 5, flashed: false});
    expect(state.locations[90]).toEqual({value: 8, flashed: false});
    expect(state.locations[99]).toEqual({value: 8, flashed: false});
    expect(state.flashes).toBe(35);
  });

  it('should take two full steps', () => {
    state = step(state);
    state = step(state);
    expect(state.locations[0]).toEqual({value: 8, flashed: false});
    expect(state.locations[1]).toEqual({value: 8, flashed: false});
    expect(state.locations[2]).toEqual({value: 0, flashed: false});
    expect(state.locations[9]).toEqual({value: 5, flashed: false});
    expect(state.locations[90]).toEqual({value: 8, flashed: false});
    expect(state.locations[99]).toEqual({value: 8, flashed: false});
    expect(state.flashes).toBe(35);
  });

  it('should take ten full steps', () => {
    for (let i = 0; i < 10; i++) {
      state = step(state);
    }
    expect(state.flashes).toBe(204);
  });

  it('should take one hundred full steps', () => {
    for (let i = 0; i < 100; i++) {
      state = step(state);
    }
    console.log(getDisplay(state));
    expect(state.flashes).toBe(1656);
  });

  it('should go until synchronization', () => {
    state = stepUntilSynchronized(state);
    expect(state.steps).toBe(195);
  });
});

describe('with real data', () => {
  let state;
  beforeEach(() => {
    state = parseInput(real);
  });

  it('should take one hundred full steps', () => {
    for (let i = 0; i < 100; i++) {
      state = step(state);
    }
    console.log(getDisplay(state));
    expect(state.flashes).toBe(1655);
  });

  it('should go until synchronization', () => {
    state = stepUntilSynchronized(state);
    expect(state.steps).toBe(337);
  });
});
