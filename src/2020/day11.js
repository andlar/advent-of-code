const getNeighbors = (grid, x, y) => {
    return [
        grid[y - 1] && grid[y - 1].charAt(x - 1),
        grid[y - 1] && grid[y - 1].charAt(x),
        grid[y - 1] && grid[y - 1].charAt(x + 1),
        grid[y] && grid[y].charAt(x - 1),
        grid[y] && grid[y].charAt(x + 1),
        grid[y + 1] && grid[y + 1].charAt(x - 1),
        grid[y + 1] && grid[y + 1].charAt(x),
        grid[y + 1] && grid[y + 1].charAt(x + 1),
    ].filter(v => v === '#').length;
}

const iterate = grid => {
    let next = [];
    let changed = false;
    grid.forEach((row, y) => {
        let out = '';
        row.split('').forEach((col, x) => {
            let neighbors = getNeighbors(grid, x, y);
            switch (col) {
            case '#':
                if (neighbors >= 4) {
                    out += 'L';
                    changed = true;
                } else {
                    out += '#';
                }
                break;
            case 'L':
                if (neighbors === 0) {
                    out += '#';
                    changed = true;
                } else {
                    out += 'L';
                }
                break;
            default:
                out += '.';
            }
        })
        next.push(out);
    });
    return {grid: next, changed: changed};
}

const settle = grid => {
    let ret = iterate(grid);
    while (ret.changed) {
        ret = iterate(ret.grid);
    }
    return ret;
}

const countPassengers = grid => grid.reduce((sum, row) => sum + row.split('').filter(col => col === '#').length, 0);

export { getNeighbors, iterate, settle, countPassengers };
