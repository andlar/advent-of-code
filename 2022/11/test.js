import {
  makeMonkey,
  getDivisor,
  takeTurn,
  takeRound,
  play,
  getMonkeyBusiness,
} from './src';
import { mock, real } from './data';

describe('when parsing monkeys', () => {
  it('should make a monkey that adds', () => {
    const monkey = makeMonkey(mock[0]);
    expect(monkey.items).toEqual([79, 98]);
    expect(monkey.operate(3)).toBe(3 * 19);
    expect(monkey.throw(46)).toBe(2);
    expect(monkey.throw(47)).toBe(3);
  });

  it('should make a monkey that multiplies', () => {
    const monkey = makeMonkey(mock[2]);
    expect(monkey.items).toEqual([79, 60, 97]);
    expect(monkey.operate(3)).toBe(9);
    expect(monkey.throw(26)).toBe(1);
    expect(monkey.throw(27)).toBe(3);
  });

  it('should figure out the divisor', () => {
    const monkeys = mock.map((m) => makeMonkey(m));
    expect(getDivisor(monkeys)).toBe(23 * 19 * 13 * 17);
  });
});

describe('when playing', () => {
  let monkeys;

  beforeEach(() => {
    monkeys = mock.map((m) => makeMonkey(m));
  });

  it('should let the first monkey take a turn', () => {
    const next = takeTurn(monkeys, 0);
    expect(next[0].items).toEqual([]);
    expect(next[1].items).toEqual([54, 65, 75, 74]);
    expect(next[2].items).toEqual([79, 60, 97]);
    expect(next[3].items).toEqual([74, 500, 620]);
  });

  it('should have the second monkey take a turn', () => {
    let next = takeTurn(monkeys, 0);
    next = takeTurn(next, 1);
    expect(next[0].items).toEqual([20, 23, 27, 26]);
    expect(next[1].items).toEqual([]);
    expect(next[2].items).toEqual([79, 60, 97]);
    expect(next[3].items).toEqual([74, 500, 620]);
  });

  it('should play a round', () => {
    const next = takeRound(monkeys);
    expect(next[0].items).toEqual([20, 23, 27, 26]);
    expect(next[1].items).toEqual([2080, 25, 167, 207, 401, 1046]);
    expect(next[2].items).toEqual([]);
    expect(next[3].items).toEqual([]);
  });

  it('should play twenty rounds', () => {
    const next = play(monkeys, 20);
    expect(next[0].items).toEqual([10, 12, 14, 26, 34]);
    expect(next[1].items).toEqual([245, 93, 53, 199, 115]);
    expect(next[2].items).toEqual([]);
    expect(next[3].items).toEqual([]);
  });

  it('should know how many items a monkey inspected', () => {
    const next = play(monkeys, 20);
    expect(next[0].inspected).toBe(101);
    expect(next[1].inspected).toBe(95);
    expect(next[2].inspected).toBe(7);
    expect(next[3].inspected).toBe(105);
  });

  it('should figure out monkey business', () => {
    const next = play(monkeys, 20);
    expect(getMonkeyBusiness(next)).toBe(10605);
  });

  it('should figure out monkey business with lots of monkeys', () => {
    monkeys = real.map((m) => makeMonkey(m));
    const next = play(monkeys, 20);
    expect(getMonkeyBusiness(next)).toBe(90294);
  });

  it('should know how many items a monkey inspected when super worried', () => {
    const next = play(monkeys, 20, false);
    expect(next[0].inspected).toBe(99);
    expect(next[1].inspected).toBe(97);
    expect(next[2].inspected).toBe(8);
    expect(next[3].inspected).toBe(103);
  });

  it('should know how many items a monkey inspected when super worried for a long time', () => {
    const next = play(monkeys, 10000, false);
    expect(next[0].inspected).toBe(52166);
    expect(next[1].inspected).toBe(47830);
    expect(next[2].inspected).toBe(1938);
    expect(next[3].inspected).toBe(52013);
  });

  it('should figure out monkey business with lots of monkeys when super worried', () => {
    monkeys = real.map((m) => makeMonkey(m));
    const next = play(monkeys, 10000, false);
    expect(getMonkeyBusiness(next)).toBe(18170818354);
  });
});
