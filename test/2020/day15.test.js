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

    xdescribe('having a great memory', () => {
        it('should find a really late one', () => {
            let game = run(mock[0], 300000000);
            expect(game).toEqual(175594);
        });

        xit('should find a lot of really late ones', () => {
            let turn = getTurn(startGame(mock[1]), 30000000);
            expect(turn).toEqual(2578);
            turn = getTurn(startGame(mock[2]), 30000000);
            expect(turn).toEqual(3544142);
            turn = getTurn(startGame(mock[3]), 30000000);
            expect(turn).toEqual(261214);
            turn = getTurn(startGame(mock[4]), 30000000);
            expect(turn).toEqual(6895259);
            turn = getTurn(startGame(mock[5]), 30000000);
            expect(turn).toEqual(18);
            turn = getTurn(startGame(mock[6]), 30000000);
            expect(turn).toEqual(362);
        });
    });
});

describe('solutions', () => {
    it('should solve part 1', () => {
        let game = run(input, 2020);
        expect(game).toEqual(758);
    });

    xit('should solve part 2', () => {
        let turn = getTurn(startGame(input), 30000000);
        expect(turn).toEqual(758);
    });
});
