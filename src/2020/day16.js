const interpretNotes = input => {
    let notes = {
        ranges: new Map(),
        your: input[1].split('\n')[1].split(',').map(v => parseInt(v, 10)),
        nearby: input[2].split('\n').slice(1).map(line => line.split(',').map(v => parseInt(v, 10))),
    }
    input[0].split('\n').forEach(line => {
        const key = line.split(':')[0];
        const vals = line.split(': ')[1].split(' or ').map(range => range.split('-').map(val => parseInt(val, 10)));
        notes.ranges.set(key, vals);
    });
    return notes;
}

const findInvalid = notes => {
    let data = interpretNotes(notes);
    let invalid = [];
    data.nearby.forEach(values => values.forEach(value => {
        let valid = false;
        data.ranges.forEach((ranges) => {
            if (ranges.filter(range => range[0] <= value && value <= range[1]).length > 0) {
                valid = true;
            }
        });
        if (!valid) { invalid.push(value) };
    }));
    return invalid.reduce((acc, val) => acc += val, 0);
}

export { interpretNotes, findInvalid };
