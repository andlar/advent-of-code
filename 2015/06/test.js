import {
  turnOn, turnOff, toggle, genWorld, parseInstruction, act, countLit, countBrightness,
} from './src';
import { real } from './data';

describe('when toggling lights', () => {
  it('should turn lights on', () => {
    const world = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];
    const out = turnOn(world, 0, 0, 1, 1);
    expect(out[0][0]).toBe(true);
    expect(out[0][1]).toBe(true);
    expect(out[0][2]).toBe(false);
    expect(out[1][0]).toBe(true);
    expect(out[1][1]).toBe(true);
    expect(out[1][2]).toBe(false);
    expect(out[2][0]).toBe(false);
    expect(out[2][1]).toBe(false);
    expect(out[2][2]).toBe(false);
  });

  it('should turn lights off', () => {
    const world = [
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ];
    const out = turnOff(world, 0, 0, 1, 1);
    expect(out[0][0]).toBe(false);
    expect(out[0][1]).toBe(false);
    expect(out[0][2]).toBe(true);
    expect(out[1][0]).toBe(false);
    expect(out[1][1]).toBe(false);
    expect(out[1][2]).toBe(true);
    expect(out[2][0]).toBe(true);
    expect(out[2][1]).toBe(true);
    expect(out[2][2]).toBe(true);
  });

  it('should toggle lights', () => {
    const world = [
      [false, false, false],
      [true, true, true],
      [true, false, false],
    ];
    const out = toggle(world, 1, 1, 2, 2);
    expect(out[0][0]).toBe(false);
    expect(out[0][1]).toBe(false);
    expect(out[0][2]).toBe(false);
    expect(out[1][0]).toBe(true);
    expect(out[1][1]).toBe(false);
    expect(out[1][2]).toBe(false);
    expect(out[2][0]).toBe(true);
    expect(out[2][1]).toBe(true);
    expect(out[2][2]).toBe(true);
  });
});

describe('when handling maintenance', () => {
  it('should generate a world', () => {
    const world = genWorld(3);
    expect(world[0][0]).toBe(false);
    expect(world[0][1]).toBe(false);
    expect(world[0][2]).toBe(false);
    expect(world[1][0]).toBe(false);
    expect(world[1][1]).toBe(false);
    expect(world[1][2]).toBe(false);
    expect(world[2][0]).toBe(false);
    expect(world[2][1]).toBe(false);
    expect(world[2][2]).toBe(false);
  });

  it('should generate a world of brightness', () => {
    const world = genWorld(3, 2);
    expect(world[0][0]).toBe(2);
    expect(world[0][1]).toBe(2);
    expect(world[0][2]).toBe(2);
    expect(world[1][0]).toBe(2);
    expect(world[1][1]).toBe(2);
    expect(world[1][2]).toBe(2);
    expect(world[2][0]).toBe(2);
    expect(world[2][1]).toBe(2);
    expect(world[2][2]).toBe(2);
  });

  describe('when parsing', () => {
    it('should parse turning on', () => {
      const instruction = 'turn on 0,0 through 999,999';
      const parsed = parseInstruction(instruction);
      expect(parsed.fn).toBe('on');
      expect(parsed.sx).toBe(0);
      expect(parsed.ex).toBe(999);
      expect(parsed.sy).toBe(0);
      expect(parsed.ey).toBe(999);
    });

    it('should parse turning off', () => {
      const instruction = 'turn off 499,499 through 500,500';
      const parsed = parseInstruction(instruction);
      expect(parsed.fn).toBe('off');
      expect(parsed.sx).toBe(499);
      expect(parsed.ex).toBe(500);
      expect(parsed.sy).toBe(499);
      expect(parsed.ey).toBe(500);
    });

    it('should parse toggling', () => {
      const instruction = 'toggle 0,0 through 999,0';
      const parsed = parseInstruction(instruction);
      expect(parsed.fn).toBe('toggle');
      expect(parsed.sx).toBe(0);
      expect(parsed.ex).toBe(999);
      expect(parsed.sy).toBe(0);
      expect(parsed.ey).toBe(0);
    });
  });

  describe('when parsing brightness', () => {
    it('should parse turning on', () => {
      const instruction = 'turn on 0,0 through 999,999';
      const parsed = parseInstruction(instruction, true);
      expect(parsed.fn).toBe('inc');
    });

    it('should parse turning off', () => {
      const instruction = 'turn off 499,499 through 500,500';
      const parsed = parseInstruction(instruction, true);
      expect(parsed.fn).toBe('dec');
    });

    it('should parse toggling', () => {
      const instruction = 'toggle 0,0 through 999,0';
      const parsed = parseInstruction(instruction, true);
      expect(parsed.fn).toBe('dbl');
    });
  });

  it('should know how many lights are lit', () => {
    const world = [
      [false, false, false],
      [true, true, true],
      [true, false, false],
    ];
    expect(countLit(world)).toBe(4);
  });
});

describe('when following instructions', () => {
  it('should handle an instruction', () => {
    const world = genWorld(3);
    const instruction1 = 'turn on 0,0 through 1,1';
    const instruction2 = 'toggle 1,1 through 2,2';
    const instruction3 = 'turn off 0,0 through 2,0';
    let out = act(world, instruction1);
    out = act(out, instruction2);
    out = act(out, instruction3);
    expect(out[0][0]).toBe(false);
    expect(out[0][1]).toBe(false);
    expect(out[0][2]).toBe(false);
    expect(out[1][0]).toBe(true);
    expect(out[1][1]).toBe(false);
    expect(out[1][2]).toBe(true);
    expect(out[2][0]).toBe(false);
    expect(out[2][1]).toBe(true);
    expect(out[2][2]).toBe(true);
  });

  it('should follow santa\'s instructions', () => {
    let world = genWorld(1000);
    real.forEach((instruction) => {
      world = act(world, instruction);
    });
    expect(countLit(world)).toBe(400410);
  });

  it('should follow santa\'s instructions on brightness', () => {
    let world = genWorld(1000, 0);
    real.forEach((instruction) => {
      world = act(world, instruction, true);
    });
    expect(countBrightness(world)).toBe(15343601);
  });
});
