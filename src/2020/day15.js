const run = (input, length) => {
    let spoken = new Map(input.map((value, idx) => [value, idx + 1]));
    let turn = input.length + 1;
    let last = input[turn - 2];
    let next;

    while (turn <= length) {
        if (spoken.has(last)) {
            next = turn - 1 - spoken.get(last);
        } else {
            next = 0;
        }
        spoken.set(last, turn - 1);
        last = next;
        turn++;
    }
    return last;
}

export { run };
