import {
  lookAndSay,
  playRounds,
} from './src';

const real = '1113122113';

describe('when playing a round', () => {
  it('should read a sequence: 1', () => {
    expect(lookAndSay('1')).toBe('11');
  });

  it('should read a sequence: 11', () => {
    expect(lookAndSay('11')).toBe('21');
  });

  it('should read a sequence: 21', () => {
    expect(lookAndSay('21')).toBe('1211');
  });

  it('should read a sequence: 1211', () => {
    expect(lookAndSay('1211')).toBe('111221');
  });

  it('should read a sequence: 111221', () => {
    expect(lookAndSay('111221')).toBe('312211');
  });
});

describe('when playing many rounds', () => {
  it('should play five rounds', () => {
    expect(playRounds('1', 5)).toBe('312211');
  });

  it('should play forty rounds', () => {
    expect(playRounds('1', 40).length).toBe(82350);
  });

  xit('should play many rounds of the big game', () => {
    const atForty = playRounds(real, 40);
    const atFifty = playRounds(atForty, 10);
    expect(atForty.length).toBe(360154);
    expect(atFifty.length).toBe(360154);
  });
});
