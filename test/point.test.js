import { Point } from '../src/point'

describe('Point tests', () => {
    it('should find the manhattan distance between two points', () => {
        let a = new Point(0, 0);
        let b = new Point(3, 3);
        expect(Point.manhattanDistance(a, b)).toBe(6);
        b.x = 0;
        expect(Point.manhattanDistance(a, b)).toBe(3);
    });

    it('should clone a point', () => {
        let a = new Point(1, 2);
        let b = Point.copy(a);
        expect(b).not.toBe(a);
        expect(b).toEqual(a);
    });

    it('should know about equality', () => {
        let a = new Point(1, 2);
        let b = new Point(2, 2);
        let c = new Point(1, 2);
        expect(Point.equals(a, b)).toBe(false);
        expect(Point.equals(a, c)).toBe(true);
    });

    it('should return a key', () => {
        let a = new Point(1, 2);
        expect(a.key()).toBe('1:2');
    });

    it('should create a point from a key', () => {
        let a = Point.fromKey('1:2');
        expect(a).toEqual(new Point(1, 2));
    });
});