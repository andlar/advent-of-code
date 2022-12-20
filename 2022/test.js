import {
  md,
  drawWorld,
  unionRange,
  unionRanges,
} from './util';

describe('utility functions', () => {
  it('should calculate the manhattan distance between two points', () => {
    const dis = md({x: 2, y: 2}, {x: -2, y: 0});
    expect(dis).toBe(6);
  });

  it('should draw a world', () => {
    const world = {
      '0,0': { x: 0, y: 0, v: 'O' },
      '2,2': { x: 2, y: 2, v: '#' },
      '-2,-2': { x: -2, y: -2, v: '#'},
      minX: -2,
      maxX: 2,
      minY: -2,
      maxY: 2,
    };
    const drawn = drawWorld(world);
    expect(drawn.length).toBe(30);
    expect(drawn).toBe('#....\n.....\n..O..\n.....\n....#\n');
  });

  describe('when unioning ranges', () => {
    it('should join two overlapping ones', () => {
      const res = unionRange('0:3', '2:5');
      expect(res).toEqual(['0:5']);
    });

    it('should leave non-intersecting ones alone', () => {
      let res = unionRange('0:3', '7:9');
      expect(res).toEqual(['0:3', '7:9']);
      res = unionRange('10:13', '7:9');
      expect(res).toEqual(['10:13', '7:9']);
    });

    it('should handle completely overlapped ones', () => {
      const res = unionRange('0:7', '2:3');
      expect(res).toEqual(['0:7']);
    });

    it('should mass union ranges', () => {
      const res = unionRanges(['12:12', '2:14', '2:2', '-2:2', '16:24', '14:18']);
      expect(res).toEqual(['-2:24']);
    });

    it('should mass union ranges that do not fully overlap', () => {
      const res = unionRanges(['12:12', '2:14', '2:2', '-2:2', '16:24', '14:18', '34:50']);
      expect(res).toEqual(['-2:24', '34:50']);
    });

    it('should mass union ranges that do fully overlap', () => {
      const res = unionRanges(['34:50', '55:56']);
      expect(res).toEqual(['34:50', '55:56']);
    });

    it('should mass union ranges that do not fully overlap', () => {
      const res = unionRanges(['12:12', '2:14', '2:2', '-2:2', '16:24', '14:18', '34:50', '55:56']);
      expect(res).toEqual(['-2:24', '34:50', '55:56']);
    });

    it('should mass union ranges that do not fully overlap', () => {
      const res = unionRanges(['-10:-9', '12:12', '2:14', '2:2', '-2:2', '16:24', '14:18', '34:50', '55:56']);
      expect(res).toEqual(['-10:-9', '-2:24', '34:50', '55:56']);
    });
  });
});
