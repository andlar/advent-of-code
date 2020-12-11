const parseInput = input => {
    let outs = [];
    let out = '';
    input.forEach(line => {
        if (line === '') {
            outs.push(out.trim());
            out = '';
        } else {
            out += ' ' + line;
        }
    });
    outs.push(out.trim());
    return outs;
}

export { parseInput };
