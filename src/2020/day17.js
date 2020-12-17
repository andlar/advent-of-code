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

const get4dNeighbors = (grid, x, y, z, w) => {
    let before = w > 0 ? () => {
        let below = z > 0 ? [
            grid[w - 1][z - 1][y - 1] && grid[w - 1][z - 1][y - 1].charAt(x - 1),
            grid[w - 1][z - 1][y - 1] && grid[w - 1][z - 1][y - 1].charAt(x),
            grid[w - 1][z - 1][y - 1] && grid[w - 1][z - 1][y - 1].charAt(x + 1),
            grid[w - 1][z - 1][y] && grid[w - 1][z - 1][y].charAt(x - 1),
            grid[w - 1][z - 1][y] && grid[w - 1][z - 1][y].charAt(x),
            grid[w - 1][z - 1][y] && grid[w - 1][z - 1][y].charAt(x + 1),
            grid[w - 1][z - 1][y + 1] && grid[w - 1][z - 1][y + 1].charAt(x - 1),
            grid[w - 1][z - 1][y + 1] && grid[w - 1][z - 1][y + 1].charAt(x),
            grid[w - 1][z - 1][y + 1] && grid[w - 1][z - 1][y + 1].charAt(x + 1),
        ].filter(v => v === '#').length : 0;
        let level = [
            grid[w - 1][z][y - 1] && grid[w - 1][z][y - 1].charAt(x - 1),
            grid[w - 1][z][y - 1] && grid[w - 1][z][y - 1].charAt(x),
            grid[w - 1][z][y - 1] && grid[w - 1][z][y - 1].charAt(x + 1),
            grid[w - 1][z][y] && grid[w - 1][z][y].charAt(x - 1),
            grid[w - 1][z][y] && grid[w - 1][z][y].charAt(x + 1),
            grid[w - 1][z][y + 1] && grid[w - 1][z][y + 1].charAt(x - 1),
            grid[w - 1][z][y + 1] && grid[w - 1][z][y + 1].charAt(x),
            grid[w - 1][z][y + 1] && grid[w - 1][z][y + 1].charAt(x + 1),
        ].filter(v => v === '#').length;
        let above = z < (grid[w - 1].length - 1) ? [
            grid[w - 1][z + 1][y - 1] && grid[w - 1][z + 1][y - 1].charAt(x - 1),
            grid[w - 1][z + 1][y - 1] && grid[w - 1][z + 1][y - 1].charAt(x),
            grid[w - 1][z + 1][y - 1] && grid[w - 1][z + 1][y - 1].charAt(x + 1),
            grid[w - 1][z + 1][y] && grid[w - 1][z + 1][y].charAt(x - 1),
            grid[w - 1][z + 1][y] && grid[w - 1][z + 1][y].charAt(x),
            grid[w - 1][z + 1][y] && grid[w - 1][z + 1][y].charAt(x + 1),
            grid[w - 1][z + 1][y + 1] && grid[w - 1][z + 1][y + 1].charAt(x - 1),
            grid[w - 1][z + 1][y + 1] && grid[w - 1][z + 1][y + 1].charAt(x),
            grid[w - 1][z + 1][y + 1] && grid[w - 1][z + 1][y + 1].charAt(x + 1),
        ].filter(v => v === '#').length : 0;
        return below + level + above;
    } : () => 0;
    let now = () => {
        let below = z > 0 ? [
            grid[w][z - 1][y - 1] && grid[w][z - 1][y - 1].charAt(x - 1),
            grid[w][z - 1][y - 1] && grid[w][z - 1][y - 1].charAt(x),
            grid[w][z - 1][y - 1] && grid[w][z - 1][y - 1].charAt(x + 1),
            grid[w][z - 1][y] && grid[w][z - 1][y].charAt(x - 1),
            grid[w][z - 1][y] && grid[w][z - 1][y].charAt(x),
            grid[w][z - 1][y] && grid[w][z - 1][y].charAt(x + 1),
            grid[w][z - 1][y + 1] && grid[w][z - 1][y + 1].charAt(x - 1),
            grid[w][z - 1][y + 1] && grid[w][z - 1][y + 1].charAt(x),
            grid[w][z - 1][y + 1] && grid[w][z - 1][y + 1].charAt(x + 1),
        ].filter(v => v === '#').length : 0;
        let level = [
            grid[w][z][y - 1] && grid[w][z][y - 1].charAt(x - 1),
            grid[w][z][y - 1] && grid[w][z][y - 1].charAt(x),
            grid[w][z][y - 1] && grid[w][z][y - 1].charAt(x + 1),
            grid[w][z][y] && grid[w][z][y].charAt(x - 1),
            grid[w][z][y] && grid[w][z][y].charAt(x + 1),
            grid[w][z][y + 1] && grid[w][z][y + 1].charAt(x - 1),
            grid[w][z][y + 1] && grid[w][z][y + 1].charAt(x),
            grid[w][z][y + 1] && grid[w][z][y + 1].charAt(x + 1),
        ].filter(v => v === '#').length;
        let above = z < (grid[w].length - 1) ? [
            grid[w][z + 1][y - 1] && grid[w][z + 1][y - 1].charAt(x - 1),
            grid[w][z + 1][y - 1] && grid[w][z + 1][y - 1].charAt(x),
            grid[w][z + 1][y - 1] && grid[w][z + 1][y - 1].charAt(x + 1),
            grid[w][z + 1][y] && grid[w][z + 1][y].charAt(x - 1),
            grid[w][z + 1][y] && grid[w][z + 1][y].charAt(x),
            grid[w][z + 1][y] && grid[w][z + 1][y].charAt(x + 1),
            grid[w][z + 1][y + 1] && grid[w][z + 1][y + 1].charAt(x - 1),
            grid[w][z + 1][y + 1] && grid[w][z + 1][y + 1].charAt(x),
            grid[w][z + 1][y + 1] && grid[w][z + 1][y + 1].charAt(x + 1),
        ].filter(v => v === '#').length : 0;
        return below + level + above;
    };
    let after = w < (grid.length - 1) ? () => {
        let below = z > 0 ? [
            grid[w + 1][z - 1][y - 1] && grid[w + 1][z - 1][y - 1].charAt(x - 1),
            grid[w + 1][z - 1][y - 1] && grid[w + 1][z - 1][y - 1].charAt(x),
            grid[w + 1][z - 1][y - 1] && grid[w + 1][z - 1][y - 1].charAt(x + 1),
            grid[w + 1][z - 1][y] && grid[w + 1][z - 1][y].charAt(x - 1),
            grid[w + 1][z - 1][y] && grid[w + 1][z - 1][y].charAt(x),
            grid[w + 1][z - 1][y] && grid[w + 1][z - 1][y].charAt(x + 1),
            grid[w + 1][z - 1][y + 1] && grid[w + 1][z - 1][y + 1].charAt(x - 1),
            grid[w + 1][z - 1][y + 1] && grid[w + 1][z - 1][y + 1].charAt(x),
            grid[w + 1][z - 1][y + 1] && grid[w + 1][z - 1][y + 1].charAt(x + 1),
        ].filter(v => v === '#').length : 0;
        let level = [
            grid[w + 1][z][y - 1] && grid[w + 1][z][y - 1].charAt(x - 1),
            grid[w + 1][z][y - 1] && grid[w + 1][z][y - 1].charAt(x),
            grid[w + 1][z][y - 1] && grid[w + 1][z][y - 1].charAt(x + 1),
            grid[w + 1][z][y] && grid[w + 1][z][y].charAt(x - 1),
            grid[w + 1][z][y] && grid[w + 1][z][y].charAt(x + 1),
            grid[w + 1][z][y + 1] && grid[w + 1][z][y + 1].charAt(x - 1),
            grid[w + 1][z][y + 1] && grid[w + 1][z][y + 1].charAt(x),
            grid[w + 1][z][y + 1] && grid[w + 1][z][y + 1].charAt(x + 1),
        ].filter(v => v === '#').length;
        let above = z < (grid[w + 1].length - 1) ? [
            grid[w + 1][z + 1][y - 1] && grid[w + 1][z + 1][y - 1].charAt(x - 1),
            grid[w + 1][z + 1][y - 1] && grid[w + 1][z + 1][y - 1].charAt(x),
            grid[w + 1][z + 1][y - 1] && grid[w + 1][z + 1][y - 1].charAt(x + 1),
            grid[w + 1][z + 1][y] && grid[w + 1][z + 1][y].charAt(x - 1),
            grid[w + 1][z + 1][y] && grid[w + 1][z + 1][y].charAt(x),
            grid[w + 1][z + 1][y] && grid[w + 1][z + 1][y].charAt(x + 1),
            grid[w + 1][z + 1][y + 1] && grid[w + 1][z + 1][y + 1].charAt(x - 1),
            grid[w + 1][z + 1][y + 1] && grid[w + 1][z + 1][y + 1].charAt(x),
            grid[w + 1][z + 1][y + 1] && grid[w + 1][z + 1][y + 1].charAt(x + 1),
        ].filter(v => v === '#').length : 0;
        return below + level + above;
    } : () => 0;
    return before() + now() + after();
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
                }
            })
            nextPlane.push(out);
        });
        next.push(nextPlane);
    });
    return {grid: next};
}

const iterateIn4d = (grid) => {
    let next = [];
    let size = grid[0][0].length + 2;
    let line = new Array(size).fill('.').join('');
    grid = grid.map(space => {
        space = space.map(plane => {
            plane = plane.map(row => '.' + row + '.');
            plane.unshift(line);
            plane.push(line);
            return plane;
        });
        let below = new Array(size).fill(new Array(size).fill('.').join(''));
        let above = new Array(size).fill(new Array(size).fill('.').join(''));
        space.unshift(below);
        space.push(above);
        return space;
    });
    let before = grid[0].map(vals => vals.map(v => v.replace(/#/g, '.')));
    let after = grid[0].map(vals => vals.map(v => v.replace(/#/g, '.')));
    grid.unshift(before);
    grid.push(after);
    console.log(grid);
    grid.forEach((space, w) => {
        let nextSpace = [];
        space.forEach((plane, z) => {
            let nextPlane = [];
            plane.forEach((row, y) => {
                let out = '';
                row.split('').forEach((col, x) => {
                    let neighbors = get4dNeighbors(grid, x, y, z, w);
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
                    }
                })
                nextPlane.push(out);
            });
            nextSpace.push(nextPlane);
        });
        next.push(nextSpace);
    });
    console.log(next);
    return {grid: next};
}

const grow = (grid, steps) => {
    for (let i = 0; i < steps; i++) {
        grid = iterate(grid).grid;
    }
    return grid;
}

const growIn4d = (grid, steps) => {
    for (let i = 0; i < steps; i++) {
        grid = iterateIn4d(grid).grid;
    }
    return grid;
}

const countCubes = grid => grid.reduce((sum, plane) => sum + plane.reduce((sum, row) => sum + row.split('').filter(col => col === '#').length, 0), 0);

const countCubesIn4d = grid => grid.reduce((sum, space) => sum + space.reduce((sum, plane) => sum + plane.reduce((sum, row) => sum + row.split('').filter(col => col === '#').length, 0), 0), 0);

export { getNeighbors, get4dNeighbors, iterate, grow, growIn4d, countCubes, countCubesIn4d };
