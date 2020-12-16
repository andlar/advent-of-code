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

const isInRange = (ranges, value) => ranges.filter(range => range[0] <= value && value <= range[1]).length > 0;

const findInvalid = data => {
    let notes = interpretNotes(data);
    let invalid = [];
    notes.nearby.forEach(values => values.forEach(value => {
        let valid = false;
        notes.ranges.forEach((ranges) => {
            if (isInRange(ranges, value)) {
                valid = true;
            }
        });
        if (!valid) { invalid.push(value) };
    }));
    return invalid.reduce((acc, val) => acc += val, 0);
}

const updateNearby = data => {
    let notes = interpretNotes(data);
    notes.nearby = notes.nearby.filter(values => {
        let valid = values.reduce((acc, value) => {
            let valid = false;
            notes.ranges.forEach(ranges => {
                valid = valid || isInRange(ranges, value);
            });
            return acc && valid;
        }, true);
        return valid;
    });
    return notes;
}

const initLocations = data => {
    let notes = interpretNotes(data);
    let locations = new Map();
    let keys = '';
    notes.your.forEach((v, idx) => {
        locations.set(idx, Array.from(notes.ranges.keys()));
    });
    return locations;
}

const eliminateLocations = (locations, notes) => {
    locations.forEach((value, key) => {
        notes.nearby.forEach(ticket => {
            let locs = locations.get(key).filter(loc => {
                return isInRange(notes.ranges.get(loc), ticket[key]);
            });
            locations.set(key, locs);
        });
    });
    return locations;
};

const cleanFixed = locations => {
    let singleVals = []
    locations.forEach(locs => {
        if (locs.length === 1) {
            singleVals.push(locs[0]);
        }
    });
    locations.forEach((value, key) => {
        if (value.length > 1) {
            value = value.filter(l => singleVals.indexOf(l) === -1);
            locations.set(key, value);
        }
    });
    return locations;
}

const isSettled = locations => {
    let settled = true;
    locations.forEach(locs => {
        if (locs.length > 1) {
            settled = false;
        }
    });
    return settled;
}

const settle = data => {
    let locations = initLocations(data);
    let notes = updateNearby(data);
    locations = eliminateLocations(locations, notes);
    while (!isSettled(locations)) {
        locations = cleanFixed(locations);
    }
    return locations;
}

export { interpretNotes, findInvalid, updateNearby, initLocations, eliminateLocations, cleanFixed, settle };
