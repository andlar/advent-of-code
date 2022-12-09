import {
  move,
  followInstruction,
  followAllInstructions,
} from './src';
import { mock, mock2, real } from './data';

let world, head, tail;

beforeEach(() => {
  world = new Set(['0:0']);
  head = '0:0';
  tail = ['0:0'];
});

describe('when moving', () => {
  it('should move the head', () => {
    [world, head, tail] = move(new Set(), '0:0', ['0:0'], 'U');
    expect(head).toBe('0:1');
    [world, head, tail] = move(new Set(), '0:0', ['0:0'], 'R');
    expect(head).toBe('1:0');
    [world, head, tail] = move(new Set(), '0:0', ['0:0'], 'D');
    expect(head).toBe('0:-1');
    [world, head, tail] = move(new Set(), '0:0', ['0:0'], 'L');
    expect(head).toBe('-1:0');
  });

  it('should move the tail up', () => {
    [world, head, tail] = move(world, head, tail, 'U');
    expect(head).toBe('0:1');
    expect(tail[0]).toBe('0:0');
    [world, head, tail] = move(world, head, tail, 'U');
    expect(head).toBe('0:2');
    expect(tail[0]).toBe('0:1');
  });

  it('should move the tail down', () => {
    [world, head, tail] = move(world, head, tail, 'D');
    expect(head).toBe('0:-1');
    expect(tail[0]).toBe('0:0');
    [world, head, tail] = move(world, head, tail, 'D');
    expect(head).toBe('0:-2');
    expect(tail[0]).toBe('0:-1');
  });

  it('should move the tail right', () => {
    [world, head, tail] = move(world, head, tail, 'R');
    expect(head).toBe('1:0');
    expect(tail[0]).toBe('0:0');
    [world, head, tail] = move(world, head, tail, 'R');
    expect(head).toBe('2:0');
    expect(tail[0]).toBe('1:0');
  });

  it('should move the tail left', () => {
    [world, head, tail] = move(world, head, tail, 'L');
    expect(head).toBe('-1:0');
    expect(tail[0]).toBe('0:0');
    [world, head, tail] = move(world, head, tail, 'L');
    expect(head).toBe('-2:0');
    expect(tail[0]).toBe('-1:0');
  });

  it('should move the tail up-right', () => {
    [world, head, tail] = move(world, head, tail, 'U');
    expect(head).toBe('0:1');
    expect(tail[0]).toBe('0:0');
    [world, head, tail] = move(world, head, tail, 'R');
    expect(head).toBe('1:1');
    expect(tail[0]).toBe('0:0');
    [world, head, tail] = move(world, head, tail, 'U');
    expect(head).toBe('1:2');
    expect(tail[0]).toBe('1:1');
  });

  it('should move the tail left-down', () => {
    [world, head, tail] = move(world, head, tail, 'L');
    expect(head).toBe('-1:0');
    expect(tail[0]).toBe('0:0');
    [world, head, tail] = move(world, head, tail, 'D');
    expect(head).toBe('-1:-1');
    expect(tail[0]).toBe('0:0');
    [world, head, tail] = move(world, head, tail, 'L');
    expect(head).toBe('-2:-1');
    expect(tail[0]).toBe('-1:-1');
  });

  it('should track where the tail goes', () => {
    [world, head, tail] = move(world, head, tail, 'L');
    [world, head, tail] = move(world, head, tail, 'L');
    [world, head, tail] = move(world, head, tail, 'D');
    [world, head, tail] = move(world, head, tail, 'D');
    expect(world.has('0:0')).toBe(true);
    expect(world.has('-1:0')).toBe(true);
    expect(world.has('-2:-1')).toBe(true);
    expect(world.size).toBe(3);
  });
});

describe('when following instructions', () => {
  it('should move many steps', () => {
    [world, head, tail] = followInstruction(world, head, tail, mock[0]);
    expect(head).toBe('4:0');
    expect(tail[0]).toBe('3:0');
    expect(world.has('0:0')).toBe(true);
    expect(world.has('1:0')).toBe(true);
    expect(world.has('2:0')).toBe(true);
    expect(world.has('3:0')).toBe(true);
    expect(world.size).toBe(4);
  });

  it('should follow all the instructions', () => {
    [world, head, tail] = followAllInstructions(mock);
    expect(head).toBe('2:2');
    expect(tail[0]).toBe('1:2');
    expect(world.size).toBe(13);
  });

  it('should follow all the real instructions', () => {
    [world, head, tail] = followAllInstructions(real);
    expect(head).toBe('-180:254');
    expect(tail[0]).toBe('-180:255');
    expect(world.size).toBe(6486);
  });
});

describe('when the tail is longer', () => {
  beforeEach(() => {
    tail = ['0:0', '0:0', '0:0', '0:0', '0:0', '0:0', '0:0', '0:0', '0:0'];
  });

  it('should move the whole tail', () => {
    [world, head, tail] = move(world, head, tail, 'R');
    [world, head, tail] = move(world, head, tail, 'R');
    expect(tail).toEqual(['1:0', '0:0', '0:0', '0:0', '0:0', '0:0', '0:0', '0:0', '0:0']);
    expect(world.has('0:0')).toBe(true);
    expect(world.has('1:0')).toBe(false);
    expect(world.size).toBe(1);
  });

  it('should follow all the instructions', () => {
    [world, head, tail] = followAllInstructions(mock, 9);
    expect(head).toBe('2:2');
    expect(tail).toEqual(['1:2', '2:2', '3:2', '2:2', '1:1', '0:0', '0:0', '0:0', '0:0']);
    expect(world.size).toBe(1);
  });

  it('should follow all the instructions in a slightly larger group', () => {
    [world, head, tail] = followAllInstructions(mock2, 9);
    expect(head).toBe('-11:15');
    expect(tail).toEqual(['-11:14', '-11:13', '-11:12', '-11:11', '-11:10', '-11:9', '-11:8', '-11:7', '-11:6']);
    expect(world.size).toBe(36);
  });

  it('should follow all the instructions in a much larger group', () => {
    [world, head, tail] = followAllInstructions(real, 9);
    expect(head).toBe('-180:254');
    expect(world.size).toBe(2678);
  });
});
