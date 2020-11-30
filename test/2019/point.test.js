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

    it('should know the direction vector to another point', () => {
        let a = new Point(2, 2);
        let up = new Point(2, 0);
        let rt = new Point(4, 2);
        let dn = new Point(2, 4);
        let lt = new Point(0, 2);
        let sw = new Point(-1, 5);
        let sse = new Point(4, 6);
        expect(Point.direction(a, up)).toEqual(new Point(0, -1));
        expect(Point.direction(a, rt)).toEqual(new Point(1, 0));
        expect(Point.direction(a, dn)).toEqual(new Point(0, 1));
        expect(Point.direction(a, lt)).toEqual(new Point(-1, 0));
        expect(Point.direction(a, sw)).toEqual(new Point(-1, 1));
        expect(Point.direction(a, sse)).toEqual(new Point(1, 2));
    });

    it('should add points', () => {
        let a = new Point(2, 3);
        let b = new Point(-1, 3);
        expect(Point.add(a, b)).toEqual(new Point(1, 6));
    });
});
