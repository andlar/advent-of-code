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

const sameTime = (busses, t) => busses
      .split(',')
      .reduce((same, b, idx) => same && (b === 'x' || ((t + idx) % b === 0)), true);

const findTime = busses => {
    let t = 0;
    let inc = 0;//parseInt(busses.split(',').filter(b => b !== 'x')[0], 10);
    busses.split(',').forEach((bus, idx) => {
        if (bus === 'x') { return ;}
        let b = parseInt(bus, 10);
        if (b > inc) {
            inc = b;
            t = idx * -1;
        }
    });
    //console.log({t, inc, busses});
    while (!sameTime(busses, t)) {
        /*
        if (t > 3400) {
            console.log({t, inc, busses, out: sameTime(busses, t)});
        }
        */
        t += inc;
        //if (t > 3420) { break; }
    }
    return t;
}

export { nextBus, sameTime, findTime };
