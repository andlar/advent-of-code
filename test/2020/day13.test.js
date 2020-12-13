import { nextBus } from '../../src/2020/day13';
import { input } from '../../src/2020/data/day13';

let mock = `939
7,13,x,x,59,x,31,19`.split('\n');

describe('utility functions', () => {
    it('should find the next bus for mock data', () => {
        let bus = nextBus(mock);
        expect(bus.bus * bus.time).toEqual(295);
    });
});

describe('solutions', () => {
    it('should solve day 1', () => {
        let bus = nextBus(input);
        expect(bus.bus * bus.time).toEqual(3865);
    });
});
