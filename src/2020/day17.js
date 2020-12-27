const initSpace = (input, part2) => {
    let space = new Set();
    input.forEach((row, y) => {
        row.split('').forEach((col, x) => {
            if (col === '#') {
                space.add(x + ':' + y + (part2 ? ':0:0' : ':0'));
            }
        });
    });
    return space;
}

const getNeighbors = (space, loc, part2) => {
    let [x, y, z, w] = loc.split(':').map(v => parseInt(v, 10));
    let count = 0;
    [-1, 0, 1].forEach(dx => {
        [-1, 0, 1].forEach(dy => {
            [-1, 0, 1].forEach(dz => {
                let ws = part2 ? [-1, 0, 1] : [0];
                ws.forEach(dw => {
                    let key = part2 ? ((x + dx) + ':' + (y + dy) + ':' + (z + dz) + ':' + (w + dw)) : ((x + dx) + ':' + (y + dy) + ':' + (z + dz));
                    if (dx === 0 && dy === 0 && dz === 0 && dw === 0) { return; }
                    if (space.has(key)) {
                        count++;
                    }
                });
            });
        });
    });
    return count;
}

const iterate = (space, part2) => {
    let next = new Set();
    let neighbors = new Set();
    space.forEach(value => {
        let [x, y, z, w] = value.split(':').map(v => parseInt(v, 10));
        [-1, 0, 1].forEach(dx => {
            [-1, 0, 1].forEach(dy => {
                [-1, 0, 1].forEach(dz => {
                    let ws = part2 ? [-1, 0, 1] : [0];
                    ws.forEach(dw => {
                        let key = part2 ? ((x + dx) + ':' + (y + dy) + ':' + (z + dz) + ':' + (w + dw)) : ((x + dx) + ':' + (y + dy) + ':' + (z + dz));
                        if (dx === 0 && dy === 0 && dz === 0 && dw === 0) {
                            let cnt = getNeighbors(space, key, part2);
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
        let cnt = getNeighbors(space, check, part2);
        if (cnt === 3) {
            next.add(check);
        }
    });
    return next;
}

const grow = (space, steps, part2) => {
    for (let i = 0; i < steps; i++) {
        space = iterate(space, part2);
    }
    return space;
}

export { initSpace, getNeighbors, iterate, grow };
