import { startGame, getTurn } from '../../src/2020/day15';

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
    it('should start the game', () => {
        let game = startGame(mock[0]);
        expect(game).toEqual({
            turns: [
                {val:0, turn:1, used:0},
                {val:3, turn:2, used:0},
                {val:6, turn:3, used:0},
            ],
            lastTurn: 3,
        });
    });

    describe('while in the first game', () => {
        let game;
        beforeEach(() => {
            game = startGame(mock[0]);
        });

        it('should find a new number', () => {
            let turn = getTurn(game, 4);
            expect(turn).toEqual(0);
        });

        it('should find one already said', () => {
            let turn = getTurn(game, 5);
            expect(turn).toEqual(3);
        });

        it('should use the most recent', () => {
            let turn = getTurn(game, 7);
            expect(turn).toEqual(1);
        });

        it('should find more', () => {
            let turn = getTurn(game, 6);
            expect(turn).toEqual(3);
        });

        it('should find more', () => {
            let turn = getTurn(game, 8);
            expect(turn).toEqual(0);
        });

        it('should find more', () => {
            let turn = getTurn(game, 9);
            expect(turn).toEqual(4);
        });

        it('should find more', () => {
            let turn = getTurn(game, 10);
            expect(turn).toEqual(0);
        });

        it('should find the 2020th one', () => {
            let turn = getTurn(game, 2020);
            expect(turn).toEqual(436);
        });
    });

    describe('in the other mock games', () => {
        it('should find more late ones', () => {
            let turn = getTurn(startGame(mock[1]), 2020);
            expect(turn).toEqual(1);
        });

        it('should find more late ones', () => {
            let turn = getTurn(startGame(mock[2]), 2020);
            expect(turn).toEqual(10);
        });

        it('should find more late ones', () => {
            let turn = getTurn(startGame(mock[3]), 2020);
            expect(turn).toEqual(27);
        });

        it('should find more late ones', () => {
            let turn = getTurn(startGame(mock[4]), 2020);
            expect(turn).toEqual(78);
        });

        it('should find more late ones', () => {
            let turn = getTurn(startGame(mock[5]), 2020);
            expect(turn).toEqual(438);
        });

        it('should find more late ones', () => {
            let turn = getTurn(startGame(mock[6]), 2020);
            expect(turn).toEqual(1836);
        });
    });

    xdescribe('having a great memory', () => {
        it('should find a really late one', () => {
            let turn = getTurn(startGame(mock[0]), 30000000);
            expect(turn).toEqual(175594);
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
        let turn = getTurn(startGame(input), 2020);
        expect(turn).toEqual(758);
    });

    xit('should solve part 2', () => {
        let turn = getTurn(startGame(input), 30000000);
        expect(turn).toEqual(758);
    });
});
