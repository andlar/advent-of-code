import add from '../src/adder';

describe('adder tests', () => {
    it('should return the addition of two number', () => {
        expect(add(1, 2)).toBe(3);
    });
});
