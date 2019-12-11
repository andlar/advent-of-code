import { Point } from './point';

const gcd = (a, b) => {
    if (a === 0) { return Math.abs(b); }
    if (b === 0) { return Math.abs(a); }
    if (Math.abs(a) > Math.abs(b)) { return gcd(b, a % b); }
    return gcd(a, b % a);
}

const drawGrid = grid => {
    let minX = 0, minY = 0, maxX = 0, maxY = 0;
    Object.keys(grid).forEach(key => {
        let p = Point.fromKey(key);
        if (p.x < minX) { minX = p.x; }
        if (p.y < minY) { minY = p.y; }
        if (p.x > maxX) { maxX = p.x; }
        if (p.y > maxY) { maxY = p.y; }
    });
    let output = '';
    for (var y = maxY + 1; y >= (minY - 1); y--) {
        for (var x = minX - 1; x <= (maxX + 1); x++) {
            if (y === maxY + 1 || y === minY - 1 || x === maxX + 1 || x === minX - 1) {
                output += '#';
            } else {
                output += grid[x + ':' + y] || ' ';
            }
        }
        if (y !== minY - 1) { output += '\n';}
    }
    return output;
}

export { gcd, drawGrid };
