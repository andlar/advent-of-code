const makeMap = input => {
    let cups = new Map();
    input.split('').map(c => parseInt(c, 10)).forEach((cup, idx, array) => {
        if (idx === array.length - 1) {
            cups.set(cup, array[0]);
        } else {
            cups.set(cup, array[idx + 1]);
        }
    });
    return cups;
}

const step = (cups, current, max) => {
    let removed = cups.get(current);
    let skipped = cups.get(removed);
    let last = cups.get(skipped);
    cups.set(current, cups.get(last));
    let destination = current - 1;
    while (destination === removed || destination === skipped || destination === last || destination === 0) {
        destination -= 1;
        if (destination <= 0) {
            destination = max;
        }
    }
    cups.set(last, cups.get(destination));
    cups.set(destination, removed);
    return cups;
}

const play = (cups, steps, current, max) => {
    for (let i = 0; i < steps; i++) {
        cups = step(cups, current, max);
        current = cups.get(current);
    }
    return cups;
}

const getAnswer = cups => {
    let next = 1;
    let out = '';
    do {
        out += cups.get(next);
        next = cups.get(next);
    } while (next !== 1)
    return out.substring(0, out.length - 1);
}

const getSecondAnswer = cups => {
    while (cups[0] !== 1) {
        cups.push(cups[0]);
        cups.shift();
    }
    return cups[1] * cups[2];
}

export { makeMap, step, play, getAnswer, getSecondAnswer };
