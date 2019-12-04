export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static manhattanDistance(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
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

    key() {
        return this.x + ':' + this.y;
    }
}
