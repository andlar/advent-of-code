import {
  parseInput,
  yell,
  yellALot,
} from './src';
import { mock, real } from './data';

describe('when setting up', () => {
  it('should parse the input', () => {
    const monkeys = parseInput(mock);
    expect(monkeys['root']).toEqual(['pppw', '+', 'sjmn']);
    expect(monkeys['dbpl']).toBe(5);
  });
});

describe('while monkeys are yelling', () => {
  it('should fill in numbers where possible', () => {
    let monkeys = parseInput(mock);
    monkeys = yell(monkeys);
    expect(monkeys['root']).toEqual(['pppw', '+', 'sjmn']);
    expect(monkeys['cczh']).toEqual([4, '+', 'lgvd']);
    expect(monkeys['dvpt']).toBeUndefined();
  });

  it('should do math where possible', () => {
    let monkeys = parseInput(mock);
    monkeys = yell(monkeys);
    expect(monkeys['root']).toEqual(['pppw', '+', 'sjmn']);
    expect(monkeys['drzm']).toBe(30);
  });

  it('should yell until the root is found', () => {
    let monkeys = parseInput(mock);
    monkeys = yellALot(monkeys);
    expect(monkeys['root']).toBe(152);
  });

  it('should yell until the root is found in real data', () => {
    let monkeys = parseInput(real);
    monkeys = yellALot(monkeys);
    expect(monkeys['root']).toBe(93813115694560);
  });
});
