const step = cups => {
    let removed = cups.splice(1, 3);
    let destination = cups[0] - 1;
    while (cups.indexOf(destination) === -1) {
        destination -= 1;
        if (destination <= 0) {
            destination = 9;
        }
    }
    cups.splice(cups.indexOf(destination) + 1, 0, removed[0], removed[1], removed[2]);
    cups.push(cups[0]);
    cups.shift();
    return cups;
}

const play = (cups, steps) => {
    for (let i = 0; i < steps; i++) {
    //console.log({cups});
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

export { step, play, getAnswer };
