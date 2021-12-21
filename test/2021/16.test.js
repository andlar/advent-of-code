import {
  parseInput,
  parsePacket,
  sumVersions,
  calculate,
} from '2021/16';
import { mock, real } from '2021/16.data';

describe('when parsing', () => {
  it('should read the version of a packet', () => {
    const parsed = parsePacket(parseInput(mock[0]));
    expect(parsed.version).toBe(6)
  });

  it('should read the type id of a packet', () => {
    const parsed = parsePacket(parseInput(mock[0]));
    expect(parsed.type).toBe(4)
  });

  it('should read literal values', () => {
    const parsed = parsePacket(parseInput(mock[0]));
    expect(parsed.literal).toBe(2021)
    expect(parsed.rest).toBe('000');
  });

  it('should read operators with length type 0', () => {
    const parsed = parsePacket(parseInput(mock[1]));
    expect(parsed.packets.length).toBe(2);
    expect(parsed.packets[0].literal).toBe(10);
    expect(parsed.packets[1].literal).toBe(20);
    expect(parsed.rest).toBe('0000000');
  });

  it('should read operators with length type 1', () => {
    const parsed = parsePacket(parseInput(mock[2]));
    expect(parsed.packets.length).toBe(3);
    expect(parsed.packets[0].literal).toBe(1);
    expect(parsed.packets[1].literal).toBe(2);
    expect(parsed.packets[2].literal).toBe(3);
    expect(parsed.rest).toBe('00000');
  });

  it('should sum the versions of packets', () => {
    let parsed = parsePacket(parseInput(mock[0]));
    expect(sumVersions(parsed)).toBe(6);
    parsed = parsePacket(parseInput(mock[1]));
    expect(sumVersions(parsed)).toBe(9);
    parsed = parsePacket(parseInput(mock[2]));
    expect(sumVersions(parsed)).toBe(14);
    parsed = parsePacket(parseInput(mock[3]));
    expect(sumVersions(parsed)).toBe(16);
    parsed = parsePacket(parseInput(mock[4]));
    expect(sumVersions(parsed)).toBe(12);
    parsed = parsePacket(parseInput(mock[5]));
    expect(sumVersions(parsed)).toBe(23);
    parsed = parsePacket(parseInput(mock[6]));
    expect(sumVersions(parsed)).toBe(31);
  });
});

describe('when calculating', () => {
  let input;
  it('should find a sum', () => {
    input = mock[7];
    const parsed = parsePacket(parseInput(input));
    const output = calculate(parsed);
    expect(output).toBe(3);
  });

  it('should find a product', () => {
    input = mock[8];
    const parsed = parsePacket(parseInput(input));
    const output = calculate(parsed);
    expect(output).toBe(54);
  });

  it('should find the minimum', () => {
    input = mock[9];
    const parsed = parsePacket(parseInput(input));
    const output = calculate(parsed);
    expect(output).toBe(7);
  });

  it('should find the maximum', () => {
    input = mock[10];
    const parsed = parsePacket(parseInput(input));
    const output = calculate(parsed);
    expect(output).toBe(9);
  });

  it('should find the greater', () => {
    input = mock[11];
    const parsed = parsePacket(parseInput(input));
    const output = calculate(parsed);
    expect(output).toBe(1);
  });

  it('should find the lesser', () => {
    input = mock[12];
    const parsed = parsePacket(parseInput(input));
    const output = calculate(parsed);
    expect(output).toBe(0);
  });

  it('should know when they are equal', () => {
    input = mock[13];
    const parsed = parsePacket(parseInput(input));
    const output = calculate(parsed);
    expect(output).toBe(0);
  });

  it('should combine operations', () => {
    input = mock[14];
    const parsed = parsePacket(parseInput(input));
    const output = calculate(parsed);
    expect(output).toBe(1);
  });
});

describe('with real data', () => {
  it('should sum the versions of packets', () => {
    let parsed = parsePacket(parseInput(real));
    expect(sumVersions(parsed)).toBe(996);
  });

  it('should know what the output is', () => {
    const input = real;
    const parsed = parsePacket(parseInput(input));
    const output = calculate(parsed);
    expect(output).toBe(96257984154);
  });
});
