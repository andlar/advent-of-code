import {
  parseInput,
  readSteps,
} from './src';
import { mock1, mock2, real } from './data';

describe('when injesting data', () => {
  it('should get the toggle state', () => {
    const steps = mock1.map((row) => parseInput(row));
    expect(steps[0].toggle).toBe('on');
    expect(steps[2].toggle).toBe('off');
  });

  it('should get the ranges', () => {
    const steps = mock1.map((row) => parseInput(row));
    expect(steps[0].x).toEqual({min: 10, max: 12});
    expect(steps[0].y).toEqual({min: 10, max: 12});
    expect(steps[0].z).toEqual({min: 10, max: 12});
  });
});

describe('when parsing steps', () => {
  it('should toggle cubes', () => {
    const steps = mock1.map((row) => parseInput(row));
    const cubes = readSteps(steps);
    expect(cubes.size).toBe(39);
  });

  it('should toggle more cubes', () => {
    const steps = mock2.map((row) => parseInput(row));
    const cubes = readSteps(steps);
    expect(cubes.size).toBe(590784);
  });

  it('should toggle real cubes', () => {
    const steps = real.map((row) => parseInput(row));
    const cubes = readSteps(steps);
    expect(cubes.size).toBe(602574);
  });
});
