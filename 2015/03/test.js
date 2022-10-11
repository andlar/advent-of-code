import {
  move, travel,
} from './src';
import { real } from './data';

describe('when delivering presents', () => {
  let world;
  beforeEach(() => {
    world = {
      delivered: new Set(['0:0']),
      x: 0,
      y: 0,
      a: 0,
      b: 0,
    }
  });

  it('should move north', () => {
    const step = '^';
    const next = move(world, step);
    expect(next.delivered.has('0:0')).toBe(true);
    expect(next.delivered.has('0:1')).toBe(true);
    expect(next.x).toBe(0);
    expect(next.y).toBe(1);
  });

  it('should move east, south, and west', () => {
    let next = move(world, '>');
    next = move(next, 'v');
    next = move(next, '<');
    expect(next.delivered.has('0:0')).toBe(true);
    expect(next.delivered.has('1:0')).toBe(true);
    expect(next.delivered.has('1:-1')).toBe(true);
    expect(next.delivered.has('0:-1')).toBe(true);
    expect(next.x).toBe(0);
    expect(next.y).toBe(-1);
  });

  it('should travel', () => {
    const next = travel(world, '^>v<');
    expect(next.delivered.has('0:0')).toBe(true);
    expect(next.delivered.has('0:1')).toBe(true);
    expect(next.delivered.has('1:1')).toBe(true);
    expect(next.delivered.has('1:0')).toBe(true);
    expect(next.x).toBe(0);
    expect(next.y).toBe(0);
    expect(next.delivered.size).toBe(4);
  });

  it('should travel a long way', () => {
    const next = travel(world, real);
    expect(next.delivered.has('0:0')).toBe(true);
    expect(next.delivered.size).toBe(2572);
  });

  it('should move robo santa north', () => {
    const step = '^';
    const next = move(world, step, true);
    expect(next.delivered.has('0:0')).toBe(true);
    expect(next.delivered.has('0:1')).toBe(true);
    expect(next.a).toBe(0);
    expect(next.b).toBe(1);
  });

  it('should travel with robo santa', () => {
    const next = travel(world, '^>v<', true);
    expect(next.delivered.has('0:0')).toBe(true);
    expect(next.delivered.has('0:1')).toBe(true);
    expect(next.delivered.has('0:1')).toBe(true);
    expect(next.x).toBe(0);
    expect(next.y).toBe(0);
    expect(next.a).toBe(0);
    expect(next.b).toBe(0);
    expect(next.delivered.size).toBe(3);
  });

  it('should travel with robo santa in straight lines', () => {
    const next = travel(world, '^v^v^v^v^v', true);
    expect(next.x).toBe(0);
    expect(next.y).toBe(5);
    expect(next.a).toBe(0);
    expect(next.b).toBe(-5);
    expect(next.delivered.size).toBe(11);
  });

  it('should travel a long way with robo santa', () => {
    const next = travel(world, real, true);
    expect(next.delivered.size).toBe(2631);
  });
});
