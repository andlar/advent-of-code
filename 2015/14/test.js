import {
  interpretRow,
  interpretInput,
  travel,
  findWinner,
} from './src';
import { mock, real } from './data';

describe('when parsing', () => {
  it('should interpret a row', () => {
    const [vel, dur, rest] = interpretRow(mock[0]);
    expect(vel).toBe(14);
    expect(dur).toBe(10);
    expect(rest).toBe(127);
  });

  it('should interpret input', () => {
    const reindeer = interpretInput(mock);
    expect(reindeer[1].vel).toBe(16);
    expect(reindeer[1].dur).toBe(11);
    expect(reindeer[1].total).toBe(173);
  });
});

describe('when travelling', () => {
  it('should know how far they go', () => {
    const reindeer = interpretInput(mock);
    expect(travel(reindeer[0], 1)).toBe(14);
    expect(travel(reindeer[1], 1)).toBe(16);
    expect(travel(reindeer[0], 10)).toBe(140);
    expect(travel(reindeer[1], 10)).toBe(160);
    expect(travel(reindeer[0], 11)).toBe(140);
    expect(travel(reindeer[1], 11)).toBe(176);
    expect(travel(reindeer[0], 12)).toBe(140);
    expect(travel(reindeer[1], 12)).toBe(176);
    expect(travel(reindeer[0], 138)).toBe(154);
    expect(travel(reindeer[1], 138)).toBe(176);
    expect(travel(reindeer[0], 1000)).toBe(1120);
    expect(travel(reindeer[1], 1000)).toBe(1056);
  });

  it('should know the winner', () => {
    const reindeer = interpretInput(mock);
    expect(findWinner(reindeer, 1000)).toBe(1120);
  });

  it('should know the winner of the full race', () => {
    const reindeer = interpretInput(real);
    // 3552 is too high
    expect(findWinner(reindeer, 2503)).toBe(2655);
  });
});
