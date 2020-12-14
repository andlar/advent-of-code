import { nextBus, sameTime, findTime } from '../../src/2020/day13';
import { input } from '../../src/2020/data/day13';

let mock = `939
7,13,x,x,59,x,31,19`.split('\n');

describe('utility functions', () => {
    it('should find the next bus for mock data', () => {
        let bus = nextBus(mock);
        expect(bus.bus * bus.time).toEqual(295);
    });

    it('should know when busses are departing at the right time', () => {
        expect(sameTime(mock[1], 0)).toBe(false);
        expect(sameTime(mock[1], 1068781)).toBe(true);
    });

    it('should know other times', () => {
        expect(sameTime('17,x,13,19', 3417)).toBe(true);
        expect(sameTime('67,7,59,61', 754018)).toBe(true);
        expect(sameTime('67,x,7,59,61', 779210)).toBe(true);
        expect(sameTime('67,7,x,59,61', 1261476)).toBe(true);
        expect(sameTime('1789,37,47,1889', 1202161486)).toBe(true);
    });

    it('should find the time', () => {
        expect(findTime(mock[1])).toBe(1068781);
    });

    it('should find other times', () => {
        expect(findTime('17,x,13,19')).toBe(3417);
    });

    it('should find other times', () => {
        expect(findTime('67,7,59,61')).toBe(754018);
    });

    it('should find other times', () => {
        expect(findTime('67,x,7,59,61')).toBe(779210);
    });

    it('should find other times', () => {
        expect(findTime('67,7,x,59,61')).toBe(1261476);
    });

    it('should find other times', () => {
        expect(findTime('1789,37,47,1889')).toBe(1202161486);
    });
});

describe('solutions', () => {
    it('should solve day 1', () => {
        let bus = nextBus(input);
        expect(bus.bus * bus.time).toEqual(3865);
    });

    xit('should solve day 2', () => {
        let time = findTime(input[1]);
        expect(time).toEqual(3865);
    });
});
