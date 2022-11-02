import {
  canCompute,
  compute,
  insertValues,
  buildMapping,
  iterate,
  findValue,
} from './src';
import { mock, real } from './data';

describe('when reading instructions', () => {
  it('should know if it can be computed', () => {
    expect(canCompute('123 -> x')).toBe(true);
    expect(canCompute('y -> x')).toBe(false);
    expect(canCompute('NOT 7 -> x')).toBe(true);
    expect(canCompute('NOT x -> x')).toBe(false);
    expect(canCompute('1 AND 3 -> x')).toBe(true);
    expect(canCompute('x AND y -> x')).toBe(false);
    expect(canCompute('45 OR 8 -> x')).toBe(true);
    expect(canCompute('x OR y -> x')).toBe(false);
    expect(canCompute('2 LSHIFT 2 -> x')).toBe(true);
    expect(canCompute('x LSHIFT 2 -> x')).toBe(false);
    expect(canCompute('5 RSHIFT 2 -> x')).toBe(true);
    expect(canCompute('y RSHIFT 2 -> x')).toBe(false);
  });

  it('should compute ones it can', () => {
    expect(compute('123 -> x')).toBe(123);
    expect(compute('NOT 123 -> x')).toBe(65412);
    expect(compute('123 AND 456 -> x')).toBe(72);
    expect(compute('123 OR 456 -> x')).toBe(507);
    expect(compute('123 LSHIFT 2 -> x')).toBe(492);
    expect(compute('456 RSHIFT 2 -> x')).toBe(114);
  });

  it('should insert values', () => {
    const mapping = { x: 123 };
    expect(insertValues(mapping, 'y -> x')).toBe('y -> x');
    expect(insertValues(mapping, 'NOT x -> x')).toBe('NOT 123 -> x');
    expect(insertValues(mapping, 'x AND y -> x')).toBe('123 AND y -> x');
    expect(insertValues(mapping, 'x OR y -> x')).toBe('123 OR y -> x');
    expect(insertValues(mapping, 'x LSHIFT 2 -> x')).toBe('123 LSHIFT 2 -> x');
    expect(insertValues(mapping, 'y RSHIFT 2 -> x')).toBe('y RSHIFT 2 -> x');
  });

  it('should build a mapping', () => {
    const mapping = buildMapping(['123 -> x', '456 -> y']);
    expect(mapping.x).toBe(123);
    expect(mapping.y).toBe(456);
  });

  it('should iterate through instructions', () => {
    const [mapping, next] = iterate([...mock]);
    expect(next.length).toBe(6);
    expect(mapping.xa).toBe(123);
  });

  it('should find a value', () => {
    const output = findValue(mock, 'ia');
    expect(output).toBe(65079);
  });

  it('should find the real value', () => {
    const output = findValue(real, 'a');
    expect(output).toBe(956);
  });

  it('should do something with wire b', () => {
    const breal = real.filter((val) => (val !== '14146 -> b')).concat('956 -> b');
    const output = findValue(breal, 'a');
    expect(output).toBe(40149);
  });
});
