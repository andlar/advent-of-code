import { gcd } from '../src/util';

describe('utility tests', () => {
    describe('gcd', () => {
        it('should find the greatest common denominator', () => {
            expect(gcd(3,0)).toBe(3);
            expect(gcd(0,-2)).toBe(2);
            expect(gcd(1071,462)).toBe(21);
            expect(gcd(462,1071)).toBe(21);
            expect(gcd(15,-12)).toBe(3)
            expect(gcd(13,17)).toBe(1);
            expect(gcd(3,-3)).toBe(3);
        });
    });
});
