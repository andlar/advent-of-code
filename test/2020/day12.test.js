import { move, travel, navigate, followWaypoints, getDistance } from '../../src/2020/day12';
import { input } from '../../src/2020/data/day12';
import { mock } from './data/day12';

describe('utility functions', () => {
    describe('for moving', () => {
        let state;
        beforeEach(() => {
            state = {x: 0, y: 0, dir: 'E'};
        });

        describe('when moving forward', () => {
            it('should move east', () => {
                let pos = move(state, 'F10')
                expect(pos).toEqual({x: 10, y: 0, dir: 'E'});
            });

            it('should move west', () => {
                state.dir = 'W';
                let pos = move(state, 'F10')
                expect(pos).toEqual({x: -10, y: 0, dir: 'W'});
            });

            it('should move north', () => {
                state.dir = 'N';
                let pos = move(state, 'F10')
                expect(pos).toEqual({x: 0, y: 10, dir: 'N'});
            });

            it('should move south', () => {
                state.dir = 'S';
                let pos = move(state, 'F10')
                expect(pos).toEqual({x: 0, y: -10, dir: 'S'});
            });
        });

        describe('when strafing', () => {
            it('should move east', () => {
                let pos = move(state, 'E10')
                expect(pos).toEqual({x: 10, y: 0, dir: 'E'});
            });

            it('should move west', () => {
                let pos = move(state, 'W10')
                expect(pos).toEqual({x: -10, y: 0, dir: 'E'});
            });

            it('should move north', () => {
                let pos = move(state, 'N10')
                expect(pos).toEqual({x: 0, y: 10, dir: 'E'});
            });

            it('should move south', () => {
                let pos = move(state, 'S10')
                expect(pos).toEqual({x: 0, y: -10, dir: 'E'});
            });
        });

        describe('when rotating', () => {
            it('should rotate right by 90', () => {
                let pos = move(state, 'R90')
                expect(pos).toEqual({x: 0, y: 0, dir: 'S'});
            });

            it('should rotate right by 180', () => {
                let pos = move(state, 'R180')
                expect(pos).toEqual({x: 0, y: 0, dir: 'W'});
            });

            it('should rotate right by 270', () => {
                let pos = move(state, 'R270')
                expect(pos).toEqual({x: 0, y: 0, dir: 'N'});
            });

            it('should rotate left by 90', () => {
                let pos = move(state, 'L90')
                expect(pos).toEqual({x: 0, y: 0, dir: 'N'});
            });

            it('should rotate left by 180', () => {
                let pos = move(state, 'L180')
                expect(pos).toEqual({x: 0, y: 0, dir: 'W'});
            });

            it('should rotate left by 270', () => {
                let pos = move(state, 'L270')
                expect(pos).toEqual({x: 0, y: 0, dir: 'S'});
            });
        });
    });

    describe('when travelling', () => {
        it('should go all the way', () => {
            let start = {x: 0, y: 0, dir: 'E'};
            expect(travel(start, mock)).toEqual({x: 17, y: -8, dir: 'S'});
        });

        it('should know how far it travelled', () => {
            expect(getDistance({x: 17, y: -8})).toBe(17 + 8);
        });
    });

    describe('when travelling via waypoint', () => {
        let state;
        beforeEach(() => {
            state = {x: 0, y: 0, wpx: 10, wpy: 1};
        });

        it('should navigate forward', () => {
            let pos = navigate(state, 'F10')
            expect(pos).toEqual({x: 100, y: 10, wpx: 10, wpy: 1});
        });

        describe('when moving the waypoint', () => {
            it('should navigate east', () => {
                let pos = navigate(state, 'E10')
                expect(pos).toEqual({x: 0, y: 0, wpx: 20, wpy: 1});
            });

            it('should navigate west', () => {
                let pos = navigate(state, 'W10')
                expect(pos).toEqual({x: 0, y: 0, wpx: 0, wpy: 1});
            });

            it('should navigate north', () => {
                let pos = navigate(state, 'N10')
                expect(pos).toEqual({x: 0, y: 0, wpx: 10, wpy: 11});
            });

            it('should navigate south', () => {
                let pos = navigate(state, 'S10')
                expect(pos).toEqual({x: 0, y: 0, wpx: 10, wpy: -9});
            });
        });

        describe('when navigating', () => {
            it('should rotate right by 90', () => {
                let pos = navigate(state, 'R90')
                expect(pos).toEqual({x: 0, y: 0, wpx: 1, wpy: -10});
            });

            it('should rotate right by 180', () => {
                let pos = navigate(state, 'R180')
                expect(pos).toEqual({x: 0, y: 0, wpx: -10, wpy: -1});
            });

            it('should rotate right by 270', () => {
                let pos = navigate(state, 'R270')
                expect(pos).toEqual({x: 0, y: 0, wpx: -1, wpy: 10});
            });

            it('should rotate left by 90', () => {
                let pos = navigate(state, 'L90')
                expect(pos).toEqual({x: 0, y: 0, wpx: -1, wpy: 10});
            });

            it('should rotate left by 180', () => {
                let pos = navigate(state, 'L180')
                expect(pos).toEqual({x: 0, y: 0, wpx: -10, wpy: -1});
            });

            it('should rotate left by 270', () => {
                let pos = navigate(state, 'L270')
                expect(pos).toEqual({x: 0, y: 0, wpx: 1, wpy: -10});
            });
        });

        it('should follow the waypoint', () => {
            let state = {x: 0, y: 0, wpx: 10, wpy: 1};
            expect(followWaypoints(state, mock)).toEqual({x: 214, y: -72, wpx: 4, wpy: -10});
        });
    });
});

describe('solutions', () => {
    it('should solve part 1', () => {
        let start = {x: 0, y: 0, dir: 'E'};
        expect(getDistance(travel(start, input))).toBe(1589);
    });

    it('should solve part 2', () => {
        let start = {x: 0, y: 0, wpx: 10, wpy: 1};
        expect(getDistance(followWaypoints(start, input))).toBe(23960);
    });
});
