import { gcd } from './util';

export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static manhattanDistance(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    static direction(a, b) {
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        if (dx === 0) {
            return new Point(0, dy > 0 ? 1 : -1);
        }
        if (dy === 0) {
            return new Point(dx > 0 ? 1 : -1, 0);
        }
        let den = gcd(dx, dy);
        while (den !== 1) {
            dx = dx / den;
            dy = dy / den;
            den = gcd(dx, dy);
        }
        return new Point(dx, dy);
    }

    static copy(p) {
        return new Point(p.x, p.y);
    }

    static equals(a, b) {
        return a.x === b.x && a.y === b.y;
    }

    static fromKey(key) {
        let x = parseInt(key.split(':')[0], 10);
        let y = parseInt(key.split(':')[1], 10);
        return new Point(x, y);
    }

    static add(a, b) {
        return new Point(a.x + b.x, a.y + b.y);
    }

    key() {
        return this.x + ':' + this.y;
    }
}
