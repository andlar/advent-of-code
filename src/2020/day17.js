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

const init4dSpace = input => {
    let space = new Set();
    input.forEach((row, y) => {
        row.split('').forEach((col, x) => {
            if (col === '#') {
                space.add(x + ':' + y + ':0:0');
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

const get4dNeighbors = (space, loc) => {
    let [x, y, z, w] = loc.split(':').map(v => parseInt(v, 10));
    let count = 0;
    [-1, 0, 1].forEach(dx => {
        [-1, 0, 1].forEach(dy => {
            [-1, 0, 1].forEach(dz => {
                [-1, 0, 1].forEach(dw => {
                    if (dx === 0 && dy === 0 && dz === 0 && dw === 0) { return; }
                    if (space.has((x + dx) + ':' + (y + dy) + ':' + (z + dz) + ':' + (w + dw))) {
                        count++;
                    }
                });
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

const iterate4d = space => {
    let next = new Set();
    let neighbors = new Set();
    space.forEach(value => {
        let [x, y, z, w] = value.split(':').map(v => parseInt(v, 10));
        [-1, 0, 1].forEach(dx => {
            [-1, 0, 1].forEach(dy => {
                [-1, 0, 1].forEach(dz => {
                    [-1, 0, 1].forEach(dw => {
                        let key = (x + dx) + ':' + (y + dy) + ':' + (z + dz) + ':' + (w + dw);
                        if (dx === 0 && dy === 0 && dz === 0 && dw === 0) {
                            let cnt = get4dNeighbors(space, key);
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
    });
    neighbors.forEach(check => {
        let cnt = get4dNeighbors(space, check);
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

const grow4d = (space, steps) => {
    for (let i = 0; i < steps; i++) {
        space = iterate4d(space);
    }
    return space;
}

export { initSpace, init4dSpace, getNeighbors, get4dNeighbors, iterate, iterate4d, grow, grow4d };
