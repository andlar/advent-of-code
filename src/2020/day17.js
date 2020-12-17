const drawGrid = grid => grid.map(plane => plane.join('\n')).join('\n\n');

const getNeighbors = (grid, x, y, z) => {
    let below = z > 0 ? [
        grid[z - 1][y - 1] && grid[z - 1][y - 1].charAt(x - 1),
        grid[z - 1][y - 1] && grid[z - 1][y - 1].charAt(x),
        grid[z - 1][y - 1] && grid[z - 1][y - 1].charAt(x + 1),
        grid[z - 1][y] && grid[z - 1][y].charAt(x - 1),
        grid[z - 1][y] && grid[z - 1][y].charAt(x),
        grid[z - 1][y] && grid[z - 1][y].charAt(x + 1),
        grid[z - 1][y + 1] && grid[z - 1][y + 1].charAt(x - 1),
        grid[z - 1][y + 1] && grid[z - 1][y + 1].charAt(x),
        grid[z - 1][y + 1] && grid[z - 1][y + 1].charAt(x + 1),
    ].filter(v => v === '#').length : 0;
    let level = [
        grid[z][y - 1] && grid[z][y - 1].charAt(x - 1),
        grid[z][y - 1] && grid[z][y - 1].charAt(x),
        grid[z][y - 1] && grid[z][y - 1].charAt(x + 1),
        grid[z][y] && grid[z][y].charAt(x - 1),
        grid[z][y] && grid[z][y].charAt(x + 1),
        grid[z][y + 1] && grid[z][y + 1].charAt(x - 1),
        grid[z][y + 1] && grid[z][y + 1].charAt(x),
        grid[z][y + 1] && grid[z][y + 1].charAt(x + 1),
    ].filter(v => v === '#').length;
    let above = z < (grid.length - 1) ? [
        grid[z + 1][y - 1] && grid[z + 1][y - 1].charAt(x - 1),
        grid[z + 1][y - 1] && grid[z + 1][y - 1].charAt(x),
        grid[z + 1][y - 1] && grid[z + 1][y - 1].charAt(x + 1),
        grid[z + 1][y] && grid[z + 1][y].charAt(x - 1),
        grid[z + 1][y] && grid[z + 1][y].charAt(x),
        grid[z + 1][y] && grid[z + 1][y].charAt(x + 1),
        grid[z + 1][y + 1] && grid[z + 1][y + 1].charAt(x - 1),
        grid[z + 1][y + 1] && grid[z + 1][y + 1].charAt(x),
        grid[z + 1][y + 1] && grid[z + 1][y + 1].charAt(x + 1),
    ].filter(v => v === '#').length : 0;
    return below + level + above;
}

const iterate = (grid, validator = getNeighbors) => {
    let next = [];
    let size = grid[0].length + 2;
    let line = new Array(size).fill('.').join('');
    grid = grid.map(plane => {
        plane = plane.map(row => '.' + row + '.');
        plane.unshift(line);
        plane.push(line);
        return plane;
    });
    let below = new Array(size).fill(new Array(size).fill('.').join(''));
    let above = new Array(size).fill(new Array(size).fill('.').join(''));
    grid.unshift(below);
    grid.push(above);
    grid.forEach((plane, z) => {
        let nextPlane = [];
        plane.forEach((row, y) => {
            let out = '';
            row.split('').forEach((col, x) => {
                let neighbors = validator(grid, x, y, z);
                switch (col) {
                case '#':
                    if (2 <= neighbors && neighbors <= 3) {
                        out += '#';
                    } else {
                        out += '.';
                    }
                    break;
                case '.':
                    if (neighbors === 3) {
                        out += '#';
                    } else {
                        out += '.';
                    }
                    break;
                default:
                    out += '.';
                }
            })
            nextPlane.push(out);
        });
        next.push(nextPlane);
    });
    return {grid: next};
}

const grow = (grid, steps) => {
    for (let i = 0; i < steps; i++) {
        grid = iterate(grid).grid;
    }
    return grid;
}

const countCubes = grid => grid.reduce((sum, plane) => sum + plane.reduce((sum, row) => sum + row.split('').filter(col => col === '#').length, 0), 0);

export { drawGrid, getNeighbors, iterate, grow, countCubes };
