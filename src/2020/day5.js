const startSeat = {rowMin: 0, rowMax: 127, colMin: 0, colMax: 7};

const getSeat = (ticket, seat = startSeat) => {
    switch(ticket.charAt(0)) {
    case 'F': return getSeat(ticket.substring(1), {...seat, rowMax: seat.rowMax - (seat.rowMax - seat.rowMin + 1) / 2,});
    case 'B': return getSeat(ticket.substring(1), {...seat, rowMin: seat.rowMin + (seat.rowMax - seat.rowMin + 1) / 2,});
    case 'R': return getSeat(ticket.substring(1), {...seat, colMin: seat.colMin + (seat.colMax - seat.colMin + 1) / 2,});
    case 'L': return getSeat(ticket.substring(1), {...seat, colMax: seat.colMax - (seat.colMax - seat.colMin + 1) / 2,});
    default: return {row: seat.rowMin, col: seat.colMin, id: seat.rowMin * 8 + seat.colMin};
    }
}

const ticketCheck = tickets => Math.max(...tickets.map(t => getSeat(t).id));

const findSeat = tickets => {
    let seats = tickets
        .map(t => getSeat(t))
        .sort((a, b) => a.id < b.id ? -1 : 1)
        .filter((s, idx, arr) => idx === 0
                || idx === arr.length - 1
                || s.id !== arr[idx - 1].id + 1
                || s.id !== arr[idx + 1].id - 1);
    return seats[1].id + 1;
}

export { getSeat, ticketCheck, findSeat };
