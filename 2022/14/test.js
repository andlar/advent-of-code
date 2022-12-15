import {
  parseLine,
  buildWorld,
  drawWorld,
  drop,
  releaseTheSand,
  countSand,
} from './src';

import { mock, real } from './data';

describe('when when dealing with the world', () => {
  it('should turn lines into stones', () => {
    const stones = parseLine(mock[0]);
    expect(stones).toEqual(['498,4', '498,6', '498,5', '496,6', '497,6']);
  });

  it('should build one', () => {
    const world = buildWorld(mock.flatMap(parseLine));
    expect(world['494,9']).toEqual({x: 494, y: 9, v: '#'});
    expect(world.minX).toBe(494);
    expect(world.maxX).toBe(503);
    expect(world.maxY).toBe(9);
  });

  it('should draw one', () => {
    const world = buildWorld(mock.flatMap(parseLine));
    const drawn = drawWorld(world);
    expect(drawn.length).toBe(110);
    expect(drawn).toBe('......+...\n..........\n..........\n..........\n....#...##\n....#...#.\n..###...#.\n........#.\n........#.\n#########.\n');
  });
});

describe('when dropping water', () => {
  it('should drop straight down', () => {
    let world = buildWorld(mock.flatMap(parseLine));
    [world] = drop(world, {x: 500, y: 0});
    expect(world['500,8']).toEqual({x: 500, y: 8, v: 'o'});
  });

  it('should drop down-right', () => {
    let world = buildWorld(mock.flatMap(parseLine));
    [world] = drop(world, {x: 500, y: 0});
    [world] = drop(world, {x: 500, y: 0});
    expect(world['500,8']).toEqual({x: 500, y: 8, v: 'o'});
    expect(world['499,8']).toEqual({x: 499, y: 8, v: 'o'});
  });

  it('should drop down-left', () => {
    let world = buildWorld(mock.flatMap(parseLine));
    [world] = drop(world, {x: 500, y: 0});
    [world] = drop(world, {x: 500, y: 0});
    [world] = drop(world, {x: 500, y: 0});
    expect(world['500,8']).toEqual({x: 500, y: 8, v: 'o'});
    expect(world['499,8']).toEqual({x: 499, y: 8, v: 'o'});
    expect(world['501,8']).toEqual({x: 501, y: 8, v: 'o'});
  });

  it('should drop 22 times', () => {
    let world = buildWorld(mock.flatMap(parseLine));
    for (let i = 0; i < 22; i++) {
      [world] = drop(world, {x: 500, y: 0});
    }
    expect(world['500,8']).toEqual({x: 500, y: 8, v: 'o'});
    expect(world['499,8']).toEqual({x: 499, y: 8, v: 'o'});
    expect(world['501,8']).toEqual({x: 501, y: 8, v: 'o'});
    expect(world['500,2']).toEqual({x: 500, y: 2, v: 'o'});
  });

  it('should drop 24 times', () => {
    let world = buildWorld(mock.flatMap(parseLine));
    for (let i = 0; i < 24; i++) {
      [world] = drop(world, {x: 500, y: 0});
    }
    expect(world['500,8']).toEqual({x: 500, y: 8, v: 'o'});
    expect(world['499,8']).toEqual({x: 499, y: 8, v: 'o'});
    expect(world['501,8']).toEqual({x: 501, y: 8, v: 'o'});
    expect(world['500,2']).toEqual({x: 500, y: 2, v: 'o'});
    expect(world['495,8']).toEqual({x: 495, y: 8, v: 'o'});
  });

  it('should know when sand has fallen to the abyss', () => {
    let world = buildWorld(mock.flatMap(parseLine));
    let abyss;
    for (let i = 0; i < 24; i++) {
      [world, abyss] = drop(world, {x: 500, y: 0});
    }
    expect(abyss).toBe(false);
    [world, abyss] = drop(world, {x: 500, y: 0});
    expect(abyss).toBe(true);
  });

  it('should let the sand flow!', () => {
    let world = buildWorld(mock.flatMap(parseLine));
    world = releaseTheSand(world);
    expect(world['495,8']).toEqual({x: 495, y: 8, v: 'o'});
  });

  it('should count sand', () => {
    let world = buildWorld(mock.flatMap(parseLine));
    world = releaseTheSand(world);
    const sand = countSand(world);
    expect(sand).toBe(24);
  });

  it('should count all the sand', () => {
    let world = buildWorld(real.flatMap(parseLine));
    world = releaseTheSand(world);
    const sand = countSand(world);
    expect(sand).toBe(1078);
    console.log(drawWorld(world));
  });
});
