import {
  parseLine,
  parseAll,
  analyzeDirs,
  findSum,
  findDeletable,
} from './src';
import { mock, real } from './data';

describe('when parsing input', () => {
  it('should reset to the root', () => {
    const [fs, dirs, loc] = parseLine({}, ['a'], 'a:b', mock[0]);
    expect(fs).toEqual({});
    expect(dirs).toEqual(['a']);
    expect(loc).toBe('');
  });

  it('should ignore the ls command', () => {
    const [fs, dirs, loc] = parseLine({}, ['a'], 'a:b', mock[1]);
    expect(fs).toEqual({});
    expect(dirs).toEqual(['a']);
    expect(loc).toBe('a:b');
  });

  it('should add a directory to the root', () => {
    const [fs, dirs, loc] = parseLine({}, [], '', mock[2]);
    expect(fs).toEqual({});
    expect(dirs).toEqual(['a']);
    expect(loc).toBe('');
  });

  it('should add a file to the root', () => {
    const [fs, dirs, loc] = parseLine({}, [], '', mock[3]);
    expect(fs).toEqual({'b.txt': 14848514});
    expect(dirs).toEqual([]);
    expect(loc).toBe('');
  });

  it('should cd', () => {
    const [fs, dirs, loc] = parseLine({}, ['a'], '', mock[6]);
    expect(fs).toEqual({});
    expect(dirs).toEqual(['a']);
    expect(loc).toBe('a');
  });

  it('should add a directory to a subdirectory', () => {
    const [fs, dirs, loc] = parseLine({}, ['a'], 'a', mock[8]);
    expect(fs).toEqual({});
    expect(dirs).toEqual(['a', 'a:e']);
    expect(loc).toBe('a');
  });

  it('should add a file to a subdirectory', () => {
    const [fs, dirs, loc] = parseLine({}, ['a', 'a:e'], 'a', mock[9]);
    expect(fs).toEqual({'a:f': 29116});
    expect(dirs).toEqual(['a', 'a:e']);
    expect(loc).toBe('a');
  });

  it('should go up a directory', () => {
    const [fs, dirs, loc] = parseLine({}, ['a', 'a:e'], 'a:e', mock[15]);
    expect(fs).toEqual({});
    expect(dirs).toEqual(['a', 'a:e']);
    expect(loc).toBe('a');
  });

  it('should read all the input', () => {
    const [fs, dirs, loc] = parseAll(mock);
    expect(fs['a:e:i']).toBe(584);
    expect(dirs).toEqual(['a', 'd', 'a:e']);
  });
});

describe('when analyzing directories', () => {
  it('should find the size of them', () => {
    const [fs, dirs, loc] = parseAll(mock);
    const out = analyzeDirs(fs, dirs);
    expect(out).toEqual({
      'a': 94853,
      'd': 24933642,
      'a:e': 584,
    });
  });

  it('should find the sum of those under 100000 in size', () => {
    const [fs, dirs, loc] = parseAll(mock);
    const sizes = analyzeDirs(fs, dirs);
    const sum = findSum(sizes);
    expect(sum).toBe(95437);
  });

  it('should find the sum of those under 100000 in size in real data', () => {
    const [fs, dirs, loc] = parseAll(real);
    const sizes = analyzeDirs(fs, dirs);
    const sum = findSum(sizes);
    expect(sum).toBe(1367870);
  });

  it('should find the smallest one to delete', () => {
    const [fs, dirs, loc] = parseAll(mock);
    const sizes = analyzeDirs(fs, dirs);
    const size = findDeletable(fs, sizes);
    expect(size).toBe(24933642);
  });

  it('should find the smallest one to delete in real data', () => {
    const [fs, dirs, loc] = parseAll(real);
    const sizes = analyzeDirs(fs, dirs);
    const size = findDeletable(fs, sizes);
    expect(size).toBe(549173);
  });
});
