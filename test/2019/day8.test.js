import { parseLayer, findFewest, flattenLayers } from '../src/day8';
import { input, layerData } from './data/day8.data';

describe('day 8 tests', () => {
    describe('part 1', () => {
        it('should parse a layer', () => {
            let sample = '1234566'
            let layer = parseLayer(sample);
            expect(layer).toEqual({
                1: 1,
                2: 1,
                3: 1,
                4: 1,
                5: 1,
                6: 2,
            });
        });

        it('should find the layer with the fewest 0s', () => {
            let layers = [
                {0: 3, 1: 2, 2: 8},
                {0: 1, 1: 2, 2: 0},
            ];
            let fewest = findFewest(layers);
            expect(fewest).toEqual({0: 1, 1: 2, 2: 0});
        });

        it('should solve', () => {
            let layers = layerData.map(layer => parseLayer(layer));
            let fewest = findFewest(layers);
            expect(fewest[1] * fewest[2]).toBe(1072);
        });
    });

    describe('part 2', () => {
        it('should flatten layers', () => {
            let sample = '0222112222120000';
            let output = flattenLayers(sample, 4);
            expect(output).toBe('0110');
        });

        it('should solve', () => {
            let output = flattenLayers(input, 150);
            expect(output).toBe('100011000011110111000011010001100001000010010000100101010000111001001000010001001000010000111000001000100100001000010000100100010011110100001000001100');
            console.log(output.replace(/0/g,' ').replace(/1/g,'#').match(/.{1,25}/g).join('\n'));
        });
    });
});
