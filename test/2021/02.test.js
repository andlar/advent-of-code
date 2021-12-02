import { badMove, followSimpleCourse, move, followCourse } from '2021/02';
import { mock, entries } from '2021/02.data';

describe('day 2 tests', () => {
  it('should move forward', () => {
    const start = { forward: 0, depth: 0 };
    const end = badMove(start, 'forward 3');
    expect(end).toEqual({ forward: 3, depth: 0 });
  });

  it('should move up', () => {
    const start = { forward: 0, depth: 0 };
    const end = badMove(start, 'up 3');
    expect(end).toEqual({ forward: 0, depth: -3 });
  });

  it('should move down', () => {
    const start = { forward: 0, depth: 0 };
    const end = badMove(start, 'down 3');
    expect(end).toEqual({ forward: 0, depth: 3 });
  });

  it('should follow a mock course', () => {
    const end = followSimpleCourse(mock);
    expect(end).toEqual({ forward: 15, depth: 10 });
    expect(end.forward * end.depth).toBe(150);
  });

  it('should follow a full course', () => {
    const end = followSimpleCourse(entries);
    expect(end).toEqual({ forward: 1940, depth: 861 });
    expect(end.forward * end.depth).toBe(1670340);
  });
});

describe('day 2 part 2 tests', () => {
  it('should move forward horizontally', () => {
    const start = { forward: 0, depth: 0, aim: 0 };
    const end = move(start, 'forward 3');
    expect(end).toEqual({ forward: 3, depth: 0, aim: 0 });
  });

  it('should change aim up', () => {
    const start = { forward: 0, depth: 0, aim: 0 };
    const end = move(start, 'up 3');
    expect(end).toEqual({ forward: 0, depth: 0, aim: -3 });
  });

  it('should change aim down', () => {
    const start = { forward: 0, depth: 0, aim: 0 };
    const end = move(start, 'down 3');
    expect(end).toEqual({ forward: 0, depth: 0, aim: 3 });
  });

  it('should change depth based on aim', () => {
    const start = { forward: 0, depth: 0, aim: 2 };
    const end = move(start, 'forward 3');
    expect(end).toEqual({ forward: 3, depth: 6, aim: 2 });
  });

  it('should follow a mock course', () => {
    const end = followCourse(mock);
    expect(end).toEqual({ forward: 15, depth: 60, aim: 10 });
    expect(end.forward * end.depth).toBe(900);
  });

  it('should follow a full course', () => {
    const end = followCourse(entries);
    expect(end).toEqual({ forward: 1940, depth: 1007368, aim: 861 });
    expect(end.forward * end.depth).toBe(1954293920);
  });
});
