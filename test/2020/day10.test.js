import { evaluateAdapters, buildChain, validChain, findShorterChains } from '../../src/2020/day10';
import { input } from '../../src/2020/data/day10';
import { mock, mock2 } from './data/day10';

describe('utility functions', () => {
    it('should evaluate the adapters', () => {
        expect(evaluateAdapters(mock)).toEqual({1: 7, 3: 5, total: 35});
        expect(evaluateAdapters(mock2)).toEqual({1: 22, 3: 10, total: 220});
    });

    it('builds a chain of adapters', () => {
        expect(buildChain(mock)).toEqual('0,1,4,5,6,7,10,11,12,15,16,19,22');
    });

    it('knows if an array is valid', () => {
        expect(validChain(mock)).toBe(true);
        expect(validChain([4,5,6,7,10,11,12,15,16,19])).toBe(false);
        expect(validChain([1,4,5,6,7,10,11,15,16,19])).toBe(false);
    });

    it('should find shorter chains', () => {
        let chains = findShorterChains(mock);
        expect(chains.length).toBe(8);
    });

    it('should find more shorter chains', () => {
        let chains = findShorterChains(mock2);
        expect(chains.length).toBe(19208);
    });
});

describe('solutions', () => {
    it('finds the first solution', () => {
        expect(evaluateAdapters(input)).toEqual({1: 66, 3: 32, total: 2112});
    });

    xit('finds the second solution', () => {
        expect(findShorterChains(input).length).toBe(3);
    });
});
