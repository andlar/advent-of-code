import {
  takeTurn,
  play,
} from './src';

describe('when playing a mock deterministic game', () => {
  let state;
  beforeEach(() => {
    state = {
      position: {
        p1: 4,
        p2: 8,
      },
      score: {
        p1: 0,
        p2: 0,
      },
      die: 100,
      rollCount: 0,
    };
  });

  it('should take a turn', () => {
    const next = takeTurn(state, 'p1');
    expect(next.position.p1).toBe(0);
    expect(next.score.p1).toBe(10);
    expect(next.die).toBe(3);
  });

  it('should take two turns', () => {
    let next = takeTurn(state, 'p1');
    next = takeTurn(next, 'p2');
    expect(next.position.p2).toBe(3);
    expect(next.score.p2).toBe(3);
    expect(next.die).toBe(6);
  });

  it('should play until someone hits 1000', () => {
    let next = play(state);
    expect(next.score.p1).toBe(1000);
    expect(next.score.p2).toBe(745);
    expect(next.rollCount).toBe(993);
    expect(next.score.p1 * next.score.p2 * next.rollCount / 1000).toBe(739785);
  });
});

describe('when playing a real deterministic game', () => {
  let state;
  beforeEach(() => {
    state = {
      position: {
        p1: 3,
        p2: 7,
      },
      score: {
        p1: 0,
        p2: 0,
      },
      die: 100,
      rollCount: 0,
    };
  });

  it('should take a turn', () => {
    const next = takeTurn(state, 'p1');
    expect(next.position.p1).toBe(9);
    expect(next.score.p1).toBe(9);
    expect(next.die).toBe(3);
  });

  it('should take two turns', () => {
    let next = takeTurn(state, 'p1');
    next = takeTurn(next, 'p2');
    expect(next.position.p2).toBe(2);
    expect(next.score.p2).toBe(2);
    expect(next.die).toBe(6);
  });

  it('should play until someone hits 1000', () => {
    let next = play(state);
    expect(next.score.p1).toBe(917);
    expect(next.score.p2).toBe(1003);
    expect(next.rollCount).toBe(1098);
    expect(next.score.p1 * next.score.p2 * next.rollCount / 1003).toBe(1006866);
  });
});
