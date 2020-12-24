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

const grow = tiles => {
    return tiles;
}

export { layTile, layTiles, grow };
