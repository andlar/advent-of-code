import {
  interpretRow,
  interpretInput,
  buildScoreboard,
  travel,
  findWinner,
  findLeader,
  determinePoints,
  findPointsWinner,
} from './src';
import { mock, real } from './data';

describe('when parsing', () => {
  it('should interpret a row', () => {
    const [vel, dur, rest, name] = interpretRow(mock[0]);
    expect(vel).toBe(14);
    expect(dur).toBe(10);
    expect(rest).toBe(127);
    expect(name).toBe('Comet');
  });

  it('should interpret input', () => {
    const reindeer = interpretInput(mock);
    expect(reindeer[1].vel).toBe(16);
    expect(reindeer[1].dur).toBe(11);
    expect(reindeer[1].total).toBe(173);
    expect(reindeer[1].name).toBe('Dancer');
  });

  it('should build a scoreboard', () => {
    const reindeer = interpretInput(mock);
    const board = buildScoreboard(reindeer);
    expect(board.Comet).toBe(0);
    expect(board.Dancer).toBe(0);
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
});

describe('when scoring by distance', () => {
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

describe('when scoring by time in the lead', () => {
  it('should know the leader at instants', () => {
    const reindeer = interpretInput(mock);
    const board = buildScoreboard(reindeer);
    let out = findLeader(reindeer, board, 1);
    expect(out.Comet).toBe(0);
    expect(out.Dancer).toBe(1);
    out = findLeader(reindeer, board, 100);
    expect(out.Comet).toBe(0);
    expect(out.Dancer).toBe(1);
    out = findLeader(reindeer, board, 140);
    expect(out.Comet).toBe(1);
    expect(out.Dancer).toBe(0);
  });

  it('should know the number of points the leaders have', () => {
    const reindeer = interpretInput(mock);
    const board = buildScoreboard(reindeer);
    let out = determinePoints(reindeer, board, 1);
    expect(out.Comet).toBe(0);
    expect(out.Dancer).toBe(1);
    out = determinePoints(reindeer, board, 140);
    expect(out.Comet).toBe(1);
    expect(out.Dancer).toBe(139);
    out = determinePoints(reindeer, board, 1000);
    expect(out.Comet).toBe(312);
    expect(out.Dancer).toBe(689);
  });

  it('should know the winner', () => {
    const reindeer = interpretInput(mock);
    const board = buildScoreboard(reindeer);
    let out = findPointsWinner(reindeer, board, 1000);
    expect(out.name).toBe('Dancer');
    expect(out.score).toBe(689);
  });

  it('should know the winner of the full race', () => {
    const reindeer = interpretInput(real);
    const board = buildScoreboard(reindeer);
    let out = findPointsWinner(reindeer, board, 2503);
    expect(out.name).toBe('Vixen');
    expect(out.score).toBe(1059);
  });
});
