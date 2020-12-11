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

const firstSeat = (grid, initX, initY, dx, dy) => {
    let seat, x, y;
    x = initX + dx;
    y = initY + dy;
    do {
        seat = grid[y] && grid[y][x];
        x += dx;
        y += dy;
    } while (seat === '.');
    return seat;
}

const seenNeighbors = (grid, x, y) => {
    return [
        firstSeat(grid, x, y, -1, -1),
        firstSeat(grid, x, y, -1, 0),
        firstSeat(grid, x, y, -1, 1),
        firstSeat(grid, x, y, 0, -1),
        firstSeat(grid, x, y, 0, 1),
        firstSeat(grid, x, y, 1, -1),
        firstSeat(grid, x, y, 1, 0),
        firstSeat(grid, x, y, 1, 1),
    ].filter(v => v === '#').length;
}

const iterate = (grid, validator = getNeighbors, max = 4) => {
    let next = [];
    let changed = false;
    grid.forEach((row, y) => {
        let out = '';
        row.split('').forEach((col, x) => {
            let neighbors = validator(grid, x, y);
            switch (col) {
            case '#':
                if (neighbors >= max) {
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

const settle = (grid, validator = getNeighbors, max = 4) => {
    let ret = iterate(grid);
    do {
        ret = iterate(ret.grid, validator, max);
    }
    while (ret.changed);
    return ret;
}

const countPassengers = grid => grid.reduce((sum, row) => sum + row.split('').filter(col => col === '#').length, 0);

export { getNeighbors, seenNeighbors, firstSeat, iterate, settle, countPassengers };
