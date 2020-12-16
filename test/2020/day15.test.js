import { startGame, getTurn, run } from '../../src/2020/day15';

const input = [2,20,0,4,1,17];
const mock = [
    [0,3,6],
    [1,3,2],
    [2,1,3],
    [1,2,3],
    [2,3,1],
    [3,2,1],
    [3,1,2],
];

describe('utility functions', () => {
    it('should do ten turns', () => {
        let game = run(mock[0], 10);
        expect(game).toEqual(0);
    });

    it('should do the full game', () => {
        let game = run(mock[0], 2020);
        expect(game).toEqual(436);
    });

    describe('in the other mock games', () => {
        it('should find more late ones', () => {
            let game = run(mock[1], 2020);
            expect(game).toEqual(1);
        });

        it('should find more late ones', () => {
            let game = run(mock[2], 2020);
            expect(game).toEqual(10);
        });

        it('should find more late ones', () => {
            let game = run(mock[3], 2020);
            expect(game).toEqual(27);
        });

        it('should find more late ones', () => {
            let game = run(mock[4], 2020);
            expect(game).toEqual(78);
        });

        it('should find more late ones', () => {
            let game = run(mock[5], 2020);
            expect(game).toEqual(438);
        });

        it('should find more late ones', () => {
            let game = run(mock[6], 2020);
            expect(game).toEqual(1836);
        });
    });
});

describe('solutions', () => {
    it('should solve part 1', () => {
        let game = run(input, 2020);
        expect(game).toEqual(758);
    });

    xit('should solve part 2', () => {
        let game = run(input, 30000000);
        expect(game).toEqual(814);
        //note: this is the right answer, but the local framework can't run it...
    });
});
