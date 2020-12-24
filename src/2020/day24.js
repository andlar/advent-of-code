const layTile = (tiles, direction) => {
    let x = 0, y = 0;
    while (direction) {
        if (direction.charAt(0) === 'e') {
            x += 2;
            direction = direction.substring(1);
        } else if (direction.charAt(0) === 'w') {
            x -= 2;
            direction = direction.substring(1);
        } else if (direction.charAt(0) === 'n') {
            y += 1;
            if (direction.charAt(1) === 'e') {
                x += 1;
            } else {
                x -= 1;
            }
            direction = direction.substring(2);
        } else {
            y -= 1;
            if (direction.charAt(1) === 'e') {
                x += 1;
            } else {
                x -= 1;
            }
            direction = direction.substring(2);
        }
    }
    let loc = x + ':' + y;
    if (tiles.has(loc)) {
        tiles.delete(loc);
    } else {
        tiles.add(loc);
    }
    return tiles;
}

const layTiles = (tiles, directions) => {
    directions.forEach(direction => tiles = layTile(tiles, direction));
    return tiles;
}

const getNeighbors = (tiles, loc) => {
    let [x, y] = loc.split(':').map(v => parseInt(v, 10));
    let count = [
        tiles.has((x - 2) + ':' + y),
        tiles.has((x + 2) + ':' + y),
        tiles.has((x - 1) + ':' + (y - 1)),
        tiles.has((x - 1) + ':' + (y + 1)),
        tiles.has((x + 1) + ':' + (y - 1)),
        tiles.has((x + 1) + ':' + (y + 1)),
    ].filter(v => v).length;
    return count;
}

const grow = tiles => {
    let next = new Set();
    let neighbors = new Set();
    tiles.forEach(value => {
        let [x, y] = value.split(':').map(v => parseInt(v, 10));
        // find neighbors that aren't covered
        let key = (x - 2) + ':' + y;
        if (!tiles.has(key)) { neighbors.add(key); }
        key = (x + 2) + ':' + y;
        if (!tiles.has(key)) { neighbors.add(key); }
        key = (x - 1) + ':' + (y - 1);
        if (!tiles.has(key)) { neighbors.add(key); }
        key = (x - 1) + ':' + (y + 1);
        if (!tiles.has(key)) { neighbors.add(key); }
        key = (x + 1) + ':' + (y - 1);
        if (!tiles.has(key)) { neighbors.add(key); }
        key = (x + 1) + ':' + (y + 1);
        if (!tiles.has(key)) { neighbors.add(key); }
        // check tiles already marked as black
        let cnt = getNeighbors(tiles, value);
        if (cnt === 1 || cnt === 2) { next.add(value); }
    });
    neighbors.forEach(check => {
        let cnt = getNeighbors(tiles, check);
        if (cnt === 2) {
            next.add(check);
        }
    });
    return next;
}

const drawTiles = tiles => {
    let minX = 0, minY = 0, maxX = 0, maxY = 0;
    let out = [];
    tiles.forEach(value => {
        let [x, y] = value.split(':').map(v => parseInt(v, 10));
        if (x < minX) { minX = x; }
        if (x > maxX) { maxX = x; }
        if (y < minY) { minY = y; }
        if (y > maxY) { maxY = y; }
    });
    minX -= 2;
    minY -= 1;
    maxX += 2;
    maxY += 1;
    for (let y = maxY; y >= minY; y--) {
        let line = Math.abs(y) + ': ';
        for (let x = minX; x <= maxX; x++) {
            let loc = x + ':' + y;
            if (loc === '0:0') {
                line += 'o';
            } else if (tiles.has(loc)) {
                line += 'X';
            } else {
                if ((Math.abs(y) + Math.abs(x)) % 2 !== 0) {
                    line += ' ';
                } else {
                    line += '.';
                }
            }
        }
        out.push(line);
    }
    return out.join('\n');
}

export { layTile, layTiles, getNeighbors, grow, drawTiles };
