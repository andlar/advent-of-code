import {
  toNumber,
  toPassword,
  formatPassword,
  isValid,
  findNext,
} from './src';

describe('I/O', () => {
  it('should convert a password into a number', () => {
    expect(toNumber('aa')).toBe(0);
    expect(toNumber('az')).toBe(25);
    expect(toNumber('ba')).toBe(26);
    expect(toNumber('baa')).toBe(676);
  });

  it('should convert values into a password', () => {
    expect(toPassword(1)).toBe('b');
    expect(toPassword(25)).toBe('z');
    expect(toPassword(26)).toBe('ba');
    expect(toPassword(676)).toBe('baa');
  });

  it('should prefix passwords', () => {
    expect(formatPassword('z')).toBe('aaaaaaaz');
  });
});

describe('when evaluating passwords', () => {
  it('should not have confusing letters', () => {
    expect(isValid('abccddi')).toBe(false);
    expect(isValid('abccddl')).toBe(false);
    expect(isValid('abccddo')).toBe(false);
    expect(isValid('abccddn')).toBe(true);
  });

  it('should have doubled letters', () => {
    expect(isValid('abcabc')).toBe(false);
    expect(isValid('abcaabbcc')).toBe(true);
    expect(isValid('abccc')).toBe(false);
  });

  it('should have runs of letters', () => {
    expect(isValid('aabbcc')).toBe(false);
  });
});

describe('when finding a password', () => {
  it('should find the next one from abcdefgh', () => {
    expect(findNext('abcdefgh')).toBe('abcdffaa');
  });

  it('should find the next one from ghijklmn', () => {
    expect(findNext('ghijklmn')).toBe('ghjaabcc');
  });

  it('should find the next one from hepxcrrq', () => {
    expect(findNext('hepxcrrq')).toBe('hepxxyzz');
  });

  it('should find the next one from hepxxyzz', () => {
    expect(findNext('hepxxyzz')).toBe('heqaabcc');
  });
});
