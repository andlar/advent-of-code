import {
  parseInput,
  moveCrates,
  moveAllCrates,
  readCrates,
} from './src';
import { mock, real } from './data';

describe('when reading input', () => {
  it('should create stacks', () => {
    const [stacks] = parseInput(mock);
    expect(stacks[1]).toEqual(['N', 'Z']);
    expect(stacks[2]).toEqual(['D', 'C', 'M']);
    expect(stacks[3]).toEqual(['P']);
  });

  it('should get instructions', () => {
    const [, instructions] = parseInput(mock);
    expect(instructions[0]).toEqual({num: 1, src: 2, dst: 1});
    expect(instructions[1]).toEqual({num: 3, src: 1, dst: 3});
    expect(instructions[2]).toEqual({num: 2, src: 2, dst: 1});
    expect(instructions[3]).toEqual({num: 1, src: 1, dst: 2});
  });

  it('should create all stacks', () => {
    const [stacks] = parseInput(real);
    expect(stacks[9][0]).toBe('N');
  });
});

describe('when moving crates', () => {
  it('should move a crate', () => {
    const [stacks, instructions] = parseInput(mock);
    const updated = moveCrates(stacks, instructions[0]);
    expect(updated[1]).toEqual(['D', 'N', 'Z']);
    expect(updated[2]).toEqual(['C', 'M']);
    expect(updated[3]).toEqual(['P']);
  });

  it('should move a few crates', () => {
    const [stacks, instructions] = parseInput(mock);
    let updated = moveCrates(stacks, instructions[0]);
    updated = moveCrates(updated, instructions[1]);
    expect(updated[1]).toEqual([]);
    expect(updated[2]).toEqual(['C', 'M']);
    expect(updated[3]).toEqual(['Z', 'N', 'D', 'P']);
  });

  it('should move all the crates', () => {
    const [stacks, instructions] = parseInput(mock);
    const updated = moveAllCrates(stacks, instructions);
    expect(updated[1]).toEqual(['C']);
    expect(updated[2]).toEqual(['M']);
    expect(updated[3]).toEqual(['Z', 'N', 'D', 'P']);
  });

  it('should move a chunk of crates', () => {
    const [stacks, instructions] = parseInput(mock);
    let updated = moveCrates(stacks, instructions[0], true);
    updated = moveCrates(updated, instructions[1], true);
    expect(updated[1]).toEqual([]);
    expect(updated[2]).toEqual(['C', 'M']);
    expect(updated[3]).toEqual(['D', 'N', 'Z', 'P']);
  });
});

describe('when looking at the crates', () => {
  it('should read the tops', () => {
    const [stacks] = parseInput(mock);
    expect(readCrates(stacks)).toBe('NDP');
  });
});

describe('when putting it all together', () => {
  it('should get the code for mock data', () => {
    const [stacks, instructions] = parseInput(mock);
    const updated = moveAllCrates(stacks, instructions);
    expect(readCrates(updated)).toBe('CMZ');
  });

  it('should get the code for real data', () => {
    const [stacks, instructions] = parseInput(real);
    const updated = moveAllCrates(stacks, instructions);
    expect(readCrates(updated)).toBe('WHTLRMZRC');
  });

  it('should get the code for mock data when moving in chunks', () => {
    const [stacks, instructions] = parseInput(mock);
    const updated = moveAllCrates(stacks, instructions, true);
    expect(readCrates(updated)).toBe('MCD');
  });

  it('should get the code for real data when moving in chunks', () => {
    const [stacks, instructions] = parseInput(real);
    const updated = moveAllCrates(stacks, instructions, true);
    expect(readCrates(updated)).toBe('GMPMLWNMG');
  });
});
