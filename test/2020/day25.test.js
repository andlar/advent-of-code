import { genEncryptionKey } from '../../src/2020/day25';

describe('utility functions', () => {
    it('should generate an encryption key', () => {
        let cardKey = 5764801;
        let doorKey = 17807724;
        let encKey = genEncryptionKey(7, 7, cardKey, doorKey);
        expect(encKey).toBe(14897079);
    });

    it('should work both ways when generating an encryption key', () => {
        let cardKey = 5764801;
        let doorKey = 17807724;
        let encKey = genEncryptionKey(7, 7, doorKey, cardKey);
        expect(encKey).toBe(14897079);
    });
});

describe('solutions', () => {
    it('should get the encryption key for the RFID lock', () => {
        let cardKey = 14012298;
        let doorKey = 74241;
        let encKey = genEncryptionKey(7, 7, cardKey, doorKey);
        expect(encKey).toBe(18608573); // 822600 is too low
    });
});
