const nextBus = input => {
    let earliest = parseInt(input[0], 10);
    let busses = input[1]
        .split(',')
        .filter(b => b !== 'x')
        .map(b => parseInt(b, 10))
        .map(b => ({bus: b, time: b - (earliest % b)}))
        .sort((a, b) => a.time - b.time);
    return busses[0];
}

export { nextBus };
