import { samples, input } from './data/day14.data';

import { parseReactions, decompose, moreToDo, highestRank, reduce, getOreNeeds, getMaxFuel } from '../src/day14';

describe('day 14 tests', () => {
    describe('part 1', () => {
        describe('reaction interpretation', () => {
            it('should create reactions', () => {
                let reactions = parseReactions(samples[0]);
                expect(reactions).toEqual({
                    A: {output: 10, input: [{ element: 'ORE', value: 10 }], distance: 1},
                    B: {output: 1, input: [{ element: 'ORE', value: 1 }], distance: 1},
                    C: {output: 1, input: [{ element: 'A', value: 7 }, {element: 'B', value: 1}], distance: 2},
                    D: {output: 1, input: [{ element: 'A', value: 7 }, {element: 'C', value: 1}], distance: 3},
                    E: {output: 1, input: [{ element: 'A', value: 7 }, {element: 'D', value: 1}], distance: 4},
                    FUEL: {output: 1, input: [{ element: 'A', value: 7 }, {element: 'E', value: 1}], distance: 5},
                });
            });
        });

        describe('decomposing', () => {
            let state, reactions;
            beforeEach(() => {
                state = {};
                reactions = parseReactions(samples[0]);
            });

            it('shouldn\'t touch ORE needed things', () => {
                state = {A: 10};
                let nextState = decompose(state, reactions);
                expect(nextState).toEqual({A: 10});
            });

            describe('with simple reactions', () => {
                beforeEach(() => {
                    reactions = {
                        C: {output: 3, input: [{ element: 'A', value: 7 }]},
                    }
                });

                it('should decompose', () => {
                    state = {C: 1};
                    let nextState = decompose(state, reactions);
                    expect(nextState).toEqual({A: 7});
                });

                it('should decompose when multiples are needed', () => {
                    state = {C: 6};
                    let nextState = decompose(state, reactions);
                    expect(nextState).toEqual({A: 14});
                });

                it('should decompose when non-integer multiples are needed', () => {
                    state = {C: 4};
                    let nextState = decompose(state, reactions);
                    expect(nextState).toEqual({A: 14});
                });
            });

            it('should know when it\'s done decomposing', () => {
                state = {A: 10};
                expect(moreToDo(state, reactions)).toBe(false);
                state = {C: 4};
                expect(moreToDo(state, reactions)).toBe(true);
            });

            it('should know what to decompose first', () => {
                state = {A: 10, C: 4, FUEL: 1};
                expect(highestRank(state, reactions)).toBe(5);
                state = {A: 10, C: 4};
                expect(highestRank(state, reactions)).toBe(2);
                state = {A: 10, B: 4};
                expect(highestRank(state, reactions)).toBe(1);
            });

            it('should only decompose the highest', () => {
                state = {C: 4, FUEL: 1};
                let nextState = decompose(state, reactions);
                expect(nextState).toEqual({A: 7, C: 4, E: 1});
            });
        });

        describe('finding ORE needs', () => {
            let state, reactions;
            beforeEach(() => {
                state = {FUEL: 1};
            });

            describe('for sample 1', () => {
                beforeEach(() => {
                    reactions = parseReactions(samples[0]);
                });

                it('should find the end state', () => {
                    let endState = reduce(state, reactions);
                    expect(endState).toEqual({A: 28, B: 1});
                });

                it('should get ore needs', () => {
                    state = {A: 28, B: 1};
                    expect(getOreNeeds(state, reactions)).toBe(31);
                });
            });

            describe('for sample 2', () => {
                beforeEach(() => {
                    reactions = parseReactions(samples[1]);
                });

                it('should find ORE needs for another sample', () => {
                    let endState = reduce(state, reactions);
                    expect(endState).toEqual({A: 10, B: 23, C: 37});
                });

                it('should get ore needs', () => {
                    state = {A: 10, B: 23, C: 37};
                    expect(getOreNeeds(state, reactions)).toBe(165);
                });
            });

            describe('for sample 3', () => {
                beforeEach(() => {
                    reactions = parseReactions(samples[2]);
                });

                it('should find ORE needs for another sample', () => {
                    let endState = reduce(state, reactions);
                    expect(endState).toEqual({
                        DCFZ: 157,
                        GPVTF: 10,
                        HKGWZ: 65,
                        NZVS: 36,
                        PSHF: 172,
                    });
                });

                it('should get ore needs', () => {
                    let endState = reduce(state, reactions);
                    expect(getOreNeeds(endState, reactions)).toBe(13312);
                });
            });

            describe('for sample 4', () => {
                beforeEach(() => {
                    reactions = parseReactions(samples[3]);
                });

                it('should get ore needs', () => {
                    let endState = reduce(state, reactions);
                    expect(getOreNeeds(endState, reactions)).toBe(180697);
                });
            });

            describe('for sample 5', () => {
                beforeEach(() => {
                    reactions = parseReactions(samples[4]);
                });

                it('should get ore needs', () => {
                    let endState = reduce(state, reactions);
                    expect(getOreNeeds(endState, reactions)).toBe(2210736);
                });
            });
        });

        it('should solve', () => {
            let state = {FUEL: 1};
            let reactions = parseReactions(input);
            let endState = reduce(state, reactions);
            expect(getOreNeeds(endState, reactions)).toBe(654909);
            // 697390 is too high
        });
    });

    describe('part 2', () => {
        describe('using all the ORE', () => {
            it('should test sample three', () => {
                let actualAnswer = 82892753;
                let reactions = parseReactions(samples[2]);
                let maxOre = 10 ** 12;
                let maxFuel = getMaxFuel(maxOre, reactions);
                let state = {FUEL: maxFuel};
                let endState = reduce(state, reactions);
                let ore = getOreNeeds(endState, reactions);
                expect(maxFuel).toBe(actualAnswer);
                expect(ore).toBe(999999999076);
            });
        });

        describe('testing sample 4', () => {
            it('should use 1,000,000,000 ORE', () => {
                let actualAnswer = 5586022;
                let reactions = parseReactions(samples[3]);
                let maxOre = 10 ** 12;
                let maxFuel = getMaxFuel(maxOre, reactions);
                let state = {FUEL: maxFuel};
                let endState = reduce(state, reactions);
                let ore = getOreNeeds(endState, reactions);
                expect(maxFuel).toBe(actualAnswer);
                expect(ore).toBe(999999895124);
            });
        });

        describe('testing sample 5', () => {
            it('should use 1,000,000,000 ORE', () => {
                let actualAnswer = 460664;
                let reactions = parseReactions(samples[4]);
                let maxOre = 10 ** 12;
                let maxFuel = getMaxFuel(maxOre, reactions);
                let state = {FUEL: maxFuel};
                let endState = reduce(state, reactions);
                let ore = getOreNeeds(endState, reactions);
                expect(maxFuel).toBe(actualAnswer);
                expect(ore).toBe(999998346916);
            });
        });

        it('should solve', () => {
            let actualAnswer = 2876992;
            let reactions = parseReactions(input);
            let maxOre = 10 ** 12;
            let maxFuel = getMaxFuel(maxOre, reactions);
            let state = {FUEL: maxFuel};
            let endState = reduce(state, reactions);
            let ore = getOreNeeds(endState, reactions);
            expect(maxFuel).toBe(actualAnswer);
            expect(ore).toBe(999999895242);
        });
    });
});
