const getSeatId = ticket => parseInt(ticket.replace(/[FL]/g, 0).replace(/[BR]/g, 1), 2);

const ticketCheck = tickets => Math.max(...tickets.map(t => getSeatId(t)));

const findSeat = tickets => tickets
      .map(t => getSeatId(t))
      .sort((a, b) => a < b ? -1 : 1)
      .find((s, idx, arr) => idx !== 0 && s !== arr[idx - 1] + 1) - 1;

export { getSeatId, ticketCheck, findSeat };
