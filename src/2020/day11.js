const iterate = grid => {
    let ret = [];
    grid.forEach((row, y, arr) => {
        let n = ''
        row.split('').forEach((val, x) => {
            let next = val;
            if (val === 'L' && (
                row.charAt(x - 1) !== 'L' && row.charAt(x + 1) !== 'L'
                    && grid[y - 1].charAt(x) !== 'L' && grid[y + 1].charAt(x) !== 'L'
                    && grid[y - 1].charAt(x - 1) !== 'L' && grid[y + 1].charAt(x + 1) !== 'L'
                    && grid[y - 1].charAt(x + 1) !== 'L' && grid[y + 1].charAt(x - 1) !== 'L'
            )) {
                next = '#';
            }
            n += next;
        });
        ret.push(n);
    });

    return grid;
};

export { iterate };
