const initSpace = input => {
    let space = new Set();
    input.forEach((row, y) => {
        row.split('').forEach((col, x) => {
            if (col === '#') {
                space.add(x + ':' + y + ':0');
            }
        });
    });
    return space;
}

const getNeighbors = (space, loc) => {
    let [x, y, z] = loc.split(':').map(v => parseInt(v, 10));
    let count = 0;
    [-1, 0, 1].forEach(dx => {
        [-1, 0, 1].forEach(dy => {
            [-1, 0, 1].forEach(dz => {
                if (dx === 0 && dy === 0 && dz === 0) { return; }
                if (space.has((x + dx) + ':' + (y + dy) + ':' + (z + dz))) {
                    count++;
                }
            });
        });
    });
    return count;
}

const iterate = space => {
    let next = new Set();
    let neighbors = new Set();
    space.forEach(value => {
        let [x, y, z] = value.split(':').map(v => parseInt(v, 10));
        [-1, 0, 1].forEach(dx => {
            [-1, 0, 1].forEach(dy => {
                [-1, 0, 1].forEach(dz => {
                    let key = (x + dx) + ':' + (y + dy) + ':' + (z + dz);
                    if (dx === 0 && dy === 0 && dz === 0) {
                        let cnt = getNeighbors(space, key);
                        if (2 === cnt || cnt === 3) {
                            next.add(key);
                        }
                    }
                    if (!space.has(key)) {
                        neighbors.add(key)
                    }
                });
            });
        });
    });
    neighbors.forEach(check => {
        let cnt = getNeighbors(space, check);
        if (cnt === 3) {
            next.add(check);
        }
    });
    return next;
}

const grow = (space, steps) => {
    for (let i = 0; i < steps; i++) {
        space = iterate(space);
    }
    return space;
}

const growIn4d = (grid, steps) => {
    for (let i = 0; i < steps; i++) {
        grid = iterateIn4d(grid).grid;
    }
    return grid;
}

export { initSpace, getNeighbors, iterate, grow };
