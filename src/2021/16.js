const parseInput = (input) => {
  return input.split('').map((c) => {
    switch (c) {
      case '0': return '0000';
      case '1': return '0001';
      case '2': return '0010';
      case '3': return '0011';
      case '4': return '0100';
      case '5': return '0101';
      case '6': return '0110';
      case '7': return '0111';
      case '8': return '1000';
      case '9': return '1001';
      case 'A': return '1010';
      case 'B': return '1011';
      case 'C': return '1100';
      case 'D': return '1101';
      case 'E': return '1110';
      case 'F': return '1111';
    };
  }).join('');
};

const parseLiteral = (packet, binary = '') => {
  if (packet.substring(0, 1) === '1') {
    return parseLiteral(packet.substring(5), binary += packet.substring(1, 5));
  }
  return {
    value: parseInt(binary += packet.substring(1, 5), 2),
    rest: packet.substring(5),
  }
};

const parsePacketsByLength = (binary, packets = []) => {
  if (binary.length === 0) { return packets }
  const next = parsePacket(binary);
  packets.push(next);
  return parsePacketsByLength(next.rest, packets);
};

const parsePacketsByCount = (binary, count, packets = []) => {
  if (count === 0) {
    return {
      packets,
      rest: binary,
    };
  }
  const next = parsePacket(binary);
  packets.push(next);
  return parsePacketsByCount(next.rest, count -= 1, packets);
};

const parsePacket = (packet) => {
  const version = parseInt(packet.substring(0, 3), 2);
  const type = parseInt(packet.substring(3, 6), 2);
  if (type === 4) { // literal value
    const literal = parseLiteral(packet.substring(6));
    return {
      version,
      type,
      literal: literal.value,
      rest: literal.rest,
    };
  }
  // operator
  const lengthType = packet.substring(6, 7);
  if (lengthType === '0') {
    const lengthCode = packet.substring(7, 22)
    const packetsLength = parseInt(lengthCode, 2);
    return {
      version,
      type,
      packets: parsePacketsByLength(packet.substring(22, 22 + packetsLength)),
      rest: packet.substring(22 + packetsLength),
    };
  }
  const lengthCode = packet.substring(7, 18)
  const packetsLength = parseInt(lengthCode, 2);
  const parsed = parsePacketsByCount(packet.substring(18),packetsLength);
  return {
    version,
    type,
    packets: parsed.packets,
    rest: parsed.rest,
  };
};

const sumVersions = (packet) => packet.version + (packet.packets ?? []).reduce((total, packet) => total + sumVersions(packet), 0);

const calculate = (packet) => {
  switch (packet.type) {
    case 0: return packet.packets.reduce((total, packet) => total + calculate(packet), 0);
    case 1: return packet.packets.reduce((total, packet) => total * calculate(packet), 1);
    case 2: return Math.min(...packet.packets.map((packet) => calculate(packet)));
    case 3: return Math.max(...packet.packets.map((packet) => calculate(packet)));
    case 4: return packet.literal;
    case 5: return calculate(packet.packets[0]) > calculate(packet.packets[1]) ? 1 : 0;
    case 6: return calculate(packet.packets[0]) < calculate(packet.packets[1]) ? 1 : 0;
    case 7: return calculate(packet.packets[0]) === calculate(packet.packets[1]) ? 1 : 0;
  }
};

export {
  parseInput,
  parsePacket,
  sumVersions,
  calculate,
};
