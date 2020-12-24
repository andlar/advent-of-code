const flipTile = (tiles, direction) => {
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
        } else if (direction.charAt(0) === 's') {
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
        tiles.set(loc, tiles.get(loc) === 'w' ? 'b' : 'w');
    } else {
        tiles.set(loc, 'b')
    }
    return tiles;
}

const flipTiles = (tiles, directions) => {
    directions.forEach(direction => tiles = flipTile(tiles, direction));
    return tiles;
}

const countBlack = tiles => {
    let count = 0;
    tiles.forEach(value => {
        if (value === 'b') {
            count += 1;
        }
    });
    return count;
}

export { flipTile, flipTiles, countBlack };
