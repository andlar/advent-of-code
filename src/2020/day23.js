const step = (cups) => {
    let removed = cups.splice(1, 3);
    let destination = cups[0] - 1;
    while (removed.indexOf(destination) > -1 || destination === 0) {
        destination -= 1;
        if (destination <= 0) {
            destination = cups.length + 3;
        }
    }
    cups.splice(cups.indexOf(destination) + 1, 0, removed[0], removed[1], removed[2]);
    cups.push(cups[0]);
    cups.shift();
    return cups;
}

const play = (cups, steps) => {
    for (let i = 0; i < steps; i++) {
        cups = step(cups);
    }
    return cups;
}

const getAnswer = cups => {
    while (cups[0] !== 1) {
        cups.push(cups[0]);
        cups.shift();
    }
    return cups.slice(1).join('');
}

const buildCircle = (cups, total) => {
    for (let i = cups.length + 1; i <= total; i++) {
        cups.push(i);
    }
    return cups;
}

const getSecondAnswer = cups => {
    while (cups[0] !== 1) {
        cups.push(cups[0]);
        cups.shift();
    }
    return cups[1] * cups[2];
}

export { step, play, getAnswer, buildCircle, getSecondAnswer };
