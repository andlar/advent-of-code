const parseTile = input => {
    let data = input.split('\n').map(r => r.split(''));
    let tile = {
        t: data[0].join(''),
        n: data[1].join(''),
        nr: data[1].join('').split('').reverse().join(''),
        e: '',
        er: '',
        s: data[10].join('').split('').reverse().join(''),
        sr: data[10].join(''),
        w: '',
        wr: '',
        display: data.slice(1).map(r => r.join('')).join('\n'),
        displayReverse: data.slice(1).map(r => r.join('').split('').reverse().join('')).join('\n'),
    };
    for (let i = 1; i <= 10; i++) {
        tile.e += data[i][9];
        tile.er += data[11 - i][9];
        tile.w += data[11 - i][0];
        tile.wr += data[i][0];
    }
    return tile;
}

const mapEdges = tiles => {
    let edges = new Map();
    tiles.forEach(tile => {
        ['n', 'nr', 'e', 'er', 's', 'sr', 'w', 'wr'].forEach(dir => {
            if (!edges.has(tile[dir])) {
                edges.set(tile[dir], tile.t + dir);
            } else {
                edges.set(tile[dir], edges.get(tile[dir]) + ';' + tile.t + dir)
            }
        });
    });
    return edges;
}

const findCorners = edges => {
    let corners = [];
    let cnt = new Map()
    edges.forEach(value => {
        if (value.indexOf(';') === -1 && !value.endsWith('r')) {
            let tile = value.split(' ')[1].split(':')[0];
            if (!cnt.has(tile)) { cnt.set(tile, 0) }
            cnt.set(tile, cnt.get(tile) + 1);
        }
    });
    cnt.forEach((value, key) => {
        if (value >= 2) { corners.push(parseInt(key, 10)) }
    });
    return corners;
}

export { parseTile, mapEdges, findCorners };
