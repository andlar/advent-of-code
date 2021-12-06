import {
  parseLine,
  parseOrthoLine,
  parseDiagLine,
  findOrthoLines,
  findNonOrthoLines,
  mapOrthoLines,
  mapAllLines,
  countIntersections,
} from '2021/05';
import { mock, real } from '2021/05.data';

describe('data parsing', () => {
  it('should convert input to useful data', () => {
    let item = parseLine(mock[0]);
    expect(item).toEqual({
      x1: 0,
      y1: 9,
      x2: 5,
      y2: 9,
    });
  });
});

describe('with mock data', () => {
  let data;
  beforeEach(() => {
    data = mock.map((line) => parseLine(line));
  });

  it('should parse a horizontal increasing line', () => {
    let state = parseOrthoLine(data[0]);
    expect(state).toEqual({
      '0,9': 1,
      '1,9': 1,
      '2,9': 1,
      '3,9': 1,
      '4,9': 1,
      '5,9': 1,
    });
  });

  it('should parse a horizontal decreasing line', () => {
    let state = parseOrthoLine(data[2]);
    expect(state).toEqual({
      '3,4': 1,
      '4,4': 1,
      '5,4': 1,
      '6,4': 1,
      '7,4': 1,
      '8,4': 1,
      '9,4': 1,
    });
  });

  it('should parse a vertical increasing line', () => {
    let state = parseOrthoLine(data[4]);
    expect(state).toEqual({
      '7,0': 1,
      '7,1': 1,
      '7,2': 1,
      '7,3': 1,
      '7,4': 1,
    });
  });

  it('should parse a vertical decreasing line', () => {
    let state = parseOrthoLine(data[3]);
    expect(state).toEqual({
      '2,1': 1,
      '2,2': 1,
    });
  });

  it('should increment a horizontal increasing line', () => {
    let state = parseOrthoLine(data[0]);
    state = parseOrthoLine(data[0], state);
    expect(state).toEqual({
      '0,9': 2,
      '1,9': 2,
      '2,9': 2,
      '3,9': 2,
      '4,9': 2,
      '5,9': 2,
    });
  });

  it('should increment a horizontal decreasing line', () => {
    let state = parseOrthoLine(data[2]);
    state = parseOrthoLine(data[2], state);
    expect(state).toEqual({
      '3,4': 2,
      '4,4': 2,
      '5,4': 2,
      '6,4': 2,
      '7,4': 2,
      '8,4': 2,
      '9,4': 2,
    });
  });

  it('should increment a vertical increasing line', () => {
    let state = parseOrthoLine(data[4]);
    state = parseOrthoLine(data[4], state);
    expect(state).toEqual({
      '7,0': 2,
      '7,1': 2,
      '7,2': 2,
      '7,3': 2,
      '7,4': 2,
    });
  });

  it('should increment a vertical decreasing line', () => {
    let state = parseOrthoLine(data[3]);
    state = parseOrthoLine(data[3], state);
    expect(state).toEqual({
      '2,1': 2,
      '2,2': 2,
    });
  });

  it('should find orthogonal lines', () => {
    const lines = findOrthoLines(data);
    expect(lines.length).toBe(6);
  });

  it('should map ortho lines', () => {
    const state = mapOrthoLines(findOrthoLines(data));
    expect(Object.values(state).length).toBe(21);
    expect(state['0,9']).toBe(2)
    expect(state['1,9']).toBe(2)
    expect(state['2,9']).toBe(2)
    expect(state['3,4']).toBe(2)
    expect(state['7,4']).toBe(2)
  });

  it('should count intersections', () => {
    const intersections = countIntersections(mapOrthoLines(findOrthoLines(data)));
    expect(intersections).toBe(5);
  });

  it('should find non-orthogonal lines', () => {
    const lines = findNonOrthoLines(data);
    expect(lines.length).toBe(4);
  });

  it('should parse a line going southwest', () => {
    let state = parseDiagLine(data[1]);
    expect(state).toEqual({
      '8,0': 1,
      '7,1': 1,
      '6,2': 1,
      '5,3': 1,
      '4,4': 1,
      '3,5': 1,
      '2,6': 1,
      '1,7': 1,
      '0,8': 1,
    });
  });

  it('should parse a line going northwest', () => {
    let state = parseDiagLine(data[5]);
    expect(state).toEqual({
      '6,4': 1,
      '5,3': 1,
      '4,2': 1,
      '3,1': 1,
      '2,0': 1,
    });
  });

  it('should parse a line going southeast', () => {
    let state = parseDiagLine(data[8]);
    expect(state).toEqual({
      '0,0': 1,
      '1,1': 1,
      '2,2': 1,
      '3,3': 1,
      '4,4': 1,
      '5,5': 1,
      '6,6': 1,
      '7,7': 1,
      '8,8': 1,
    });
  });

  it('should parse a line going northeast', () => {
    let state = parseDiagLine(data[9]);
    expect(state).toEqual({
      '5,5': 1,
      '6,4': 1,
      '7,3': 1,
      '8,2': 1,
    });
  });

  it('should count intersections of all lines', () => {
    const intersections = countIntersections(mapAllLines(data));
    expect(intersections).toBe(12);
  });
});

describe('with real data', () => {
  let data;
  beforeEach(() => {
    data = real.map((line) => parseLine(line));
  });

  it('should count intersections', () => {
    const intersections = countIntersections(mapOrthoLines(findOrthoLines(data)));
    expect(intersections).toBe(5280);
  });

  it('should count intersections of all lines', () => {
    const intersections = countIntersections(mapAllLines(data));
    expect(intersections).toBe(16716);
  });
});
