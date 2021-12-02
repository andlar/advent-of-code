import { simpleMove, followSimpleCourse, move, followCourse } from '2021/02';
import { mock, entries } from '2021/02.data';

describe('day 2 tests', () => {
  it('should move forward', () => {
    const end = simpleMove('forward 3');
    expect(end.forward).toBe(3);
    expect(end.depth).toBe(0);
  });

  it('should move up', () => {
    const end = simpleMove('up 3');
    expect(end.forward).toBe(0);
    expect(end.depth).toBe(-3);
  });

  it('should move down', () => {
    const end = simpleMove('down 3');
    expect(end.forward).toBe(0);
    expect(end.depth).toBe(3);
  });

  it('should follow a mock course', () => {
    const end = followSimpleCourse(mock);
    expect(end.forward).toBe(15);
    expect(end.depth).toBe(10);
    expect(end.forward * end.depth).toBe(150);
  });

  it('should follow a full course', () => {
    const end = followSimpleCourse(entries);
    expect(end.forward).toBe(1940);
    expect(end.depth).toBe(861);
    expect(end.forward * end.depth).toBe(1670340);
  });
});

describe('day 2 part 2 tests', () => {
  it('should move forward horizontally', () => {
    const end = move('forward 3');
    expect(end).toEqual({ forward: 3, depth: 0, aim: 0 });
  });

  it('should change aim up', () => {
    const end = move('up 3');
    expect(end).toEqual({ forward: 0, depth: 0, aim: -3 });
  });

  it('should change aim down', () => {
    const end = move('down 3');
    expect(end).toEqual({ forward: 0, depth: 0, aim: 3 });
  });

  it('should change depth based on aim', () => {
    const start = { forward: 0, depth: 0, aim: 2 };
    const end = move('forward 3', start);
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
