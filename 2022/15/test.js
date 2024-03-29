import {
  parseInput,
  cannotHasBeacon,
  cannotHasBeacons,
  countCants,
  countCantsCountingBeacons,
  findBlanks,
  findBeacon,
  getTuningFrequency,
} from './src';
import { mock, real } from './data';
import { drawWorld } from '../util';

describe('when setting up', () => {
  it('should parse the input', () => {
    const world  = parseInput(mock);
    expect(world.minX).toBe(-2);
    expect(world.maxX).toBe(25);
    expect(world.minY).toBe(0);
    expect(world.maxY).toBe(22);
    expect(world['2,18']).toEqual({x: 2, y: 18, v: 'S', vis: 7});
    expect(world['-2,15']).toEqual({x: -2, y: 15, v: 'B'});
  });
});

describe('when looking for beacons', () => {
  it('should know what range, along a line, cannot have a beacon, based on a single sensor that does not restrict it', () => {
    const world  = parseInput(mock);
    const cant = cannotHasBeacon(world, '20,1', 10);
    expect(cant).toBeUndefined()
  });

  it('should know what range, along a line, cannot have a beacon, based on a single sensor that does not have a beacon on the line', () => {
    const world  = parseInput(mock);
    const cant = cannotHasBeacon(world, '16,7', 10);
    expect(cant).toBe('14:18');
  });

  it('should know what range, along a line, cannot have a beacon, based on a single sensor that has a beacon on the line', () => {
    const world  = parseInput(mock);
    const cant = cannotHasBeacon(world, '8,7', 10);
    expect(cant).toBe('2:14');
  });

  it('should know what all the cants are', () => {
    const world  = parseInput(mock);
    const cants = cannotHasBeacons(world, 10);
    expect(cants.length).toBe(6);
  });

  it('should know how many places cannot have a beaon on a given line', () => {
    const world  = parseInput(mock);
    const rng = '-2:24';
    const cants = countCants(world, rng, 10);
    expect(cants).toBe(26);
  });

  it('should count all the spaces', () => {
    const world  = parseInput(mock);
    const cants = countCantsCountingBeacons(world, 10);
    expect(cants).toBe(26);
  });

  it('should count all the spaces in the big space', () => {
    const world  = parseInput(real);
    const cants = countCantsCountingBeacons(world, 2000000);
    expect(cants).toBe(5142231);
  });
});

describe('when looking for an unfound beacon', () => {
  it('should look for blanks', () => {
    const world = parseInput(mock);
    const [blanks] = findBlanks(world, 20);
    expect(blanks).toEqual(['-3:13', '15:25']);
  });

  it('should find the beacon', () => {
    const world = parseInput(mock);
    const [x, y] = findBeacon(world, 20);
    expect(x).toBe(14);
    expect(y).toBe(11);
  });

  it('should know the tuning frequency', () => {
    const x = 14, y = 11;
    const frequency = getTuningFrequency(x, y);
    expect(frequency).toBe(56000011);
  });

  xit('should know the tuning frequency of the real beacon', () => { // runs for too long (800s as of right now)
    const world = parseInput(real);
    const [x, y] = findBeacon(world, 4000000);
    const frequency = getTuningFrequency(x, y);
    expect(frequency).toBe(56000011);
  });
});
