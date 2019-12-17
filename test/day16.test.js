import { samples, input } from './data/day16.data';

import { parseSequence, calculateElement, calculatePattern, calculatePhase, calculatePhases, generateFullSignal, getSignal } from '../src/day16';

describe('day 16 tests', () => {
    describe('part 1', () => {
        it('should parse a sequence from input', () => {
            let sequence = parseSequence('15243');
            expect(sequence).toEqual([1, 5, 2, 4, 3]);
        });

        it('should calculate an element', () => {
            let sequence = parseSequence('98765');
            let pattern = [1, 2, 3];
            let element = calculateElement(sequence, pattern);
            expect(element).toBe(6);
        });

        it('should know the correct pattern', () => {
            let root = [0, 1, 0, -1];
            let pattern = calculatePattern(root, 1);
            expect(pattern).toEqual([0, 1, 0, -1]);
            pattern = calculatePattern(root, 2);
            expect(pattern).toEqual([0, 0, 1, 1, 0, 0 , -1, -1]);
            pattern = calculatePattern(root, 3);
            expect(pattern).toEqual([0, 0, 0, 1, 1, 1, 0, 0, 0 , -1, -1, -1]);
        });

        describe('calculating phases', () => {
            let root;
            beforeEach(() => {
                root = [0, 1, 0, -1];
            });

            it('should calculate phases for 12345678', () => {
                let input = '12345678';
                let nextSequence = calculatePhase(input, root);
                expect(nextSequence).toBe('48226158');
                nextSequence = calculatePhase(nextSequence, root);
                expect(nextSequence).toBe('34040438');
                nextSequence = calculatePhase(nextSequence, root);
                expect(nextSequence).toBe('03415518');
                nextSequence = calculatePhase(nextSequence, root);
                expect(nextSequence).toBe('01029498');
            });

            it('should calculate phases for 12345678', () => {
                let input = '12345678';
                let finalSequence = calculatePhases(input, root, 4);
                expect(finalSequence).toBe('01029498');
            });

            it('should calculate phases for sample 0', () => {
                let finalSequence = calculatePhases(samples[0], root, 100);
                expect(finalSequence.substring(0, 8)).toBe('24176176');
            });

            it('should calculate phases for sample 1', () => {
                let finalSequence = calculatePhases(samples[1], root, 100);
                expect(finalSequence.substring(0, 8)).toBe('73745418');
            });

            it('should calculate phases for sample 2', () => {
                let finalSequence = calculatePhases(samples[2], root, 100);
                expect(finalSequence.substring(0, 8)).toBe('52432133');
            });
        });

        it('should solve', () => {
            let root = [0, 1, 0, -1];
            let finalSequence = calculatePhases(input, root, 100);
            expect(finalSequence.substring(0, 8)).toBe('82435530');
        });
    });

    describe('part 2', () => {
        it('should build the full signal', () => {
            let signal = '1';
            let fullSignal = generateFullSignal(signal);
            expect(fullSignal.length).toBe(10000);
        });

        it('should read the message', () => {
            let output = '00000150000000012345678';
            let signal = getSignal(output);
            expect(signal).toBe('12345678');
        });

        describe('finding signals', () => {
            let root;
            beforeEach(() => {
                root = [0, 1, 0, -1];
            });

            it('should find the signal for sample 0', () => {
                let signal = getSignal(calculatePhases(generateFullSignal(samples[0]), root, 100));
                expect(finalSequence.substring(0, 8)).toBe('84462026');
            });

            it('should find the signal for sample 1', () => {
                let signal = getSignal(calculatePhases(generateFullSignal(samples[1]), root, 100));
                expect(finalSequence.substring(0, 8)).toBe('78725270');
            });

            it('should find the signal for sample 2', () => {
                let signal = getSignal(calculatePhases(generateFullSignal(samples[2]), root, 100));
                expect(finalSequence.substring(0, 8)).toBe('53553731');
            });
        });
    });
});
