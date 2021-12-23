import {
  getX,
  getY,
  intersects,
  countTrajectories,
} from '2021/17';

describe('when calculating trajectories', () => {
  let x, y, t;

  describe('for x', () => {
    it('should find x for t = 1', () => {
      x = 9;
      t = 1;
      expect(getX(x, t)).toBe(9);
    });

    it('should find x for t = 2', () => {
      x = 9;
      t = 2;
      expect(getX(x, t)).toBe(17);
    });

    it('should find x for t = x', () => {
      x = 9;
      t = 9;
      expect(getX(x, t)).toBe(45);
    });

    it('should find x for t > x', () => {
      x = 9;
      t = 12;
      expect(getX(x, t)).toBe(45);
    });
  });

  describe('for y', () => {
    it('should find y for t = 1', () => {
      y = 9;
      t = 1;
      expect(getY(y, t)).toBe(9);
    });

    it('should find y for t = 2', () => {
      y = 9;
      t = 2;
      expect(getY(y, t)).toBe(17);
    });

    it('should find y for t = y', () => {
      y = 9;
      t = 9;
      expect(getY(y, t)).toBe(45);
    });

    it('should find y for t = y + 1', () => {
      y = 9;
      t = 10;
      expect(getY(y, t)).toBe(45);
    });

    it('should find y for t = 2y + 1', () => {
      y = 9;
      t = 19;
      expect(getY(y, t)).toBe(0);
    });

    describe('when y is 0', () => {
      it('should find y for t = 1', () => {
        y = 0;
        t = 1;
        expect(getY(y, t)).toBe(0);
      });

      it('should find y for t = 2', () => {
        y = 0;
        t = 2;
        expect(getY(y, t)).toBe(-1);
      });
    });

    describe('when y is negative', () => {
      it('should find y for t = 1', () => {
        y = -9;
        t = 1;
        expect(getY(y, t)).toBe(-9);
      });

      it('should find y for t = 2', () => {
        y = -9;
        t = 2;
        expect(getY(y, t)).toBe(-19);
      });
    });
  });
});

describe('when intersecting the target', () => {
  const target = {
    x: { min: 20, max: 30 },
    y: { min: -10, max: -5 },
  };
  let trajectory;

  it('should know if an upwards trajectory hits the target', () => {
    trajectory = { x: 7, y: 2 };
    expect(intersects(target, trajectory)).toBe(true);
  });

  it('should know if a flat trajectory hits the target', () => {
    trajectory = { x: 9, y: 0 };
    expect(intersects(target, trajectory)).toBe(true);
  });

  it('should know if a downward trajectory hits the target', () => {
    trajectory = { x: 9, y: -1 };
    expect(intersects(target, trajectory)).toBe(true);
  });

  it('should know if trajectory misses the target', () => {
    trajectory = { x: 17, y: -4 };
    expect(intersects(target, trajectory)).toBe(false);
  });

  it('should find the trajectories that intersect', () => {
    const trajectories = countTrajectories(target);
    expect(trajectories.length).toBe(112);
  });
});

describe('with mock data', () => {
  it('should know the highest y', () => {
    const y = 9;
    const highest = (y * y + y) / 2
    expect(highest).toBe(45);
  });
});

describe('with real data', () => {
  it('should know the highest y', () => {
    const y = 162;
    const highest = (y * y + y) / 2
    expect(highest).toBe(13203);
  });

  it('should find the trajectories that intersect', () => {
    const target = {
      x: { min: 85, max: 145 },
      y: { min: -163, max: -108 },
    };
    const trajectories = countTrajectories(target);
    expect(trajectories.length).toBe(5644);
  });
});
