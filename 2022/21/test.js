import {
  parseInput,
  yell,
  yellALot,
  findPartialAnswer,
  unwind,
  findHuman,
} from './src';
import { mock, mock2, real } from './data';

describe('when setting up', () => {
  it('should parse the input', () => {
    const monkeys = parseInput(mock);
    expect(monkeys['root']).toEqual(['pppw', '+', 'sjmn']);
    expect(monkeys['dbpl']).toBe(5);
    expect(monkeys['humn']).toBe(5);
  });

  it('should set up for human input', () => {
    const monkeys = parseInput(mock, true);
    expect(monkeys['root']).toEqual(['pppw', '=', 'sjmn']);
    expect(monkeys['dbpl']).toBe(5);
    expect(monkeys['humn']).toEqual(['noop', '=', 0]);
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

  it('should yell until the root is halfway found', () => {
    let monkeys = parseInput(mock, true);
    monkeys = findPartialAnswer(monkeys);
    expect(monkeys['root']).toEqual(['pppw', '=', 150]);
  });
});

describe('when finding the human input', () => {
  it('should unwind division', () => {
    let monkeys = parseInput(mock, true);
    monkeys = findPartialAnswer(monkeys);
    monkeys = unwind(monkeys);
    expect(monkeys['pppw']).toBeUndefined();
    expect(monkeys['root']).toEqual(['cczh', '=', 150 * 4]);
  });

  it('should unwind addition', () => {
    let monkeys = parseInput(mock, true);
    monkeys = findPartialAnswer(monkeys);
    monkeys = unwind(monkeys);
    monkeys = unwind(monkeys);
    expect(monkeys['cczh']).toBeUndefined();
    expect(monkeys['root']).toEqual(['lgvd', '=', 600 - 4]);
  });

  it('should unwind multiplications', () => {
    let monkeys = parseInput(mock, true);
    monkeys = findPartialAnswer(monkeys);
    monkeys = unwind(monkeys);
    monkeys = unwind(monkeys);
    monkeys = unwind(monkeys);
    expect(monkeys['lgvd']).toBeUndefined();
    expect(monkeys['root']).toEqual(['ptdq', '=', 596 / 2]);
  });

  it('should unwind subtraction', () => {
    let monkeys = parseInput(mock, true);
    monkeys = findPartialAnswer(monkeys);
    monkeys = unwind(monkeys);
    monkeys = unwind(monkeys);
    monkeys = unwind(monkeys);
    monkeys = unwind(monkeys);
    expect(monkeys['ptdq']).toBeUndefined();
    expect(monkeys['root']).toEqual(['humn', '=', 298 + 3]);
  });

  it('should figure out what the human needs to call out', () => {
    const monkeys = findPartialAnswer(parseInput(mock, true));
    const human = findHuman(monkeys);
    expect(human).toBe(301);
  });

  it('should figure out what the human needs to call out on other data', () => {
    let monkeys = parseInput(mock2, true);
    monkeys = findPartialAnswer(monkeys);
    monkeys = unwind(monkeys);
    monkeys = unwind(monkeys);
    expect(monkeys['root']).toEqual(['humn', '=', 19]);
  });

  it('should figure out what the human needs to call out in real data', () => {
    const monkeys = findPartialAnswer(parseInput(real, true));
    const human = findHuman(monkeys);
    expect(human).toBe(3910938071092);
  });
});
