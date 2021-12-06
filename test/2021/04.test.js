import {
  parseInput,
  callANumber,
  isWinning,
  play,
  score,
  playToLose,
} from '2021/04';
import { mock, entries } from '2021/04.data';

describe('day 4 mock data', () => {
  let state;
  beforeEach(() => {
    state = parseInput(mock);
  });

  describe('data entry', () => {
    it('should find calling numbers', () => {
      expect(state.numbers.length).toBe(27);
      expect(state.numbers[0]).toBe(7);
      expect(state.numbers[state.numbers.length - 1]).toBe(1);
    });

    it('should describe bingo boards', () => {
      expect(state.boards.length).toBe(3);
      expect(state.boards[0][0]).toBe(22);
      expect(state.boards[0][49]).toBe(19);
    });
  });

  it('should play a round of bingo', () => {
    state = callANumber(state);
    expect(state.lastCalled).toBe(7);
    expect(state.numbers.length).toBe(26);
    expect(state.boards[0][14]).toBe('.');
  });

  it('should play a few rounds of bingo', () => {
    expect(state.boards[0][9]).toBe(24);
    expect(state.boards[1][18]).toBe(24);
    expect(state.boards[2][3]).toBe(24);
    state = callANumber(state);
    state = callANumber(state);
    state = callANumber(state);
    state = callANumber(state);
    state = callANumber(state);
    state = callANumber(state);
    state = callANumber(state);
    state = callANumber(state);
    state = callANumber(state);
    state = callANumber(state);
    state = callANumber(state);
    state = callANumber(state);
    expect(state.lastCalled).toBe(24);
    expect(state.numbers.length).toBe(15);
    expect(state.boards[0][9]).toBe('.');
    expect(state.boards[1][18]).toBe('.');
    expect(state.boards[2][3]).toBe('.');
  });

  it('should know when a board wins', () => {
    expect(isWinning([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBeFalsy();
    expect(isWinning([1, 2, 3, 4, 5, '.', '.', '.', '.', '.' ])).toBeTruthy();
  });

  it('should play until a winner is found', () => {
    const final = play(state);
    expect(final.lastCalled).toBe(24);
    expect(final.scoringBoard).toBe(2);
  });

  it('should know the score of the winning mock board', () => {
    const final = score(play(state));
    expect(final.score).toBe(4512);
  });

  it('should play to lose', () => {
    const final = playToLose(state);
    expect(final.lastCalled).toBe(13);
    expect(final.scoringBoard).toBe(0);
    expect(final.boards.length).toBe(1);
    expect(score(final).score).toBe(1924);
  });
});

describe('day 4 real data', () => {
  let state;
  beforeEach(() => {
    state = parseInput(entries);
  });

  it('should know the score of the winning board', () => {
    const final = score(play(state));
    expect(final.score).toBeLessThan(92421);
    expect(final.score).toBe(69579);
  });

  it('should play to lose', () => {
    const final = score(playToLose(state));
    expect(final.score).toBe(14877);
  });
});
