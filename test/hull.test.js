import { getColor, paint, move } from '../src/hull';

let hullState, robotLocation, robotDirection;

describe('hull tests', () => {
    beforeEach(() => {
        hullState = {
            hull: {},
            robotLocation: '0:0',
            robotDirection: '^',
        };
    });

    describe('reading paint', () => {
        it('should read a black square', () => {
            let currentColor = getColor(hullState);
            expect(currentColor).toBe(0);
        });

        it('should read a white square', () => {
            hullState.hull['0:0'] = '#'
            let currentColor = getColor(hullState);
            expect(currentColor).toBe(1);
        });
    });

    describe('painting', () => {
        it('should paint white', () => {
            let nextState = paint(hullState, 1);
            expect(nextState.hull).toEqual({'0:0':'#'});
        });

        it('should paint black', () => {
            hullState.hull['0:0'] = '#'
            let nextState = paint(hullState, 0);
            expect(nextState.hull).toEqual({'0:0':'.'});
        });
    });

    describe('moving', () => {
        it('should move left', () => {
            let nextState = move(hullState, 0);
            expect(nextState.robotLocation).toBe('-1:0');
            expect(nextState.robotDirection).toBe('<');
            nextState = move(nextState, 0);
            expect(nextState.robotLocation).toEqual('-1:-1');
            expect(nextState.robotDirection).toBe('v');
            nextState = move(nextState, 0);
            expect(nextState.robotLocation).toEqual('0:-1');
            expect(nextState.robotDirection).toBe('>');
            nextState = move(nextState, 0);
            expect(nextState.robotLocation).toEqual('0:0');
            expect(nextState.robotDirection).toBe('^');
        });

        it('should move right', () => {
            let nextState = move(hullState, 1);
            expect(nextState.robotLocation).toBe('1:0');
            expect(nextState.robotDirection).toBe('>');
            nextState = move(nextState, 1);
            expect(nextState.robotLocation).toEqual('1:-1');
            expect(nextState.robotDirection).toBe('v');
            nextState = move(nextState, 1);
            expect(nextState.robotLocation).toEqual('0:-1');
            expect(nextState.robotDirection).toBe('<');
            nextState = move(nextState, 1);
            expect(nextState.robotLocation).toEqual('0:0');
            expect(nextState.robotDirection).toBe('^');
        });
    });
});
