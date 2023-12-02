import {
  parseGame,
  isPossible,
  findPossibleGameSums,
  findPower,
  findAllPowers,
} from './src';
import { mock, mock2, mock3, real } from './data';

describe('when parsing', () => {
  it('should parse a game', () => {
    expect(parseGame(mock[0]).id).toBe(1);
    expect(parseGame(mock[0]).pulls[0].blue).toBe(3);
    expect(parseGame(mock[0]).pulls[0].red).toBe(4);
    expect(parseGame(mock[0]).pulls[0].green).toBe(0);
    expect(parseGame(mock[1]).id).toBe(2);
    expect(parseGame(mock[2]).id).toBe(3);
    expect(parseGame(mock[3]).id).toBe(4);
    expect(parseGame(mock[4]).id).toBe(5);
  });

  it('should know the minimum cubes needed, by power', () => {
    expect(findPower(parseGame(mock[0]))).toBe(48);
    expect(findPower(parseGame(mock[1]))).toBe(12);
    expect(findPower(parseGame(mock[2]))).toBe(1560);
    expect(findPower(parseGame(mock[3]))).toBe(630);
    expect(findPower(parseGame(mock[4]))).toBe(36);
  });
});

describe('when evaluating games', () => {
  it('should know if a game was possible', () => {
    expect(isPossible(parseGame(mock[0]))).toBe(true);
    expect(isPossible(parseGame(mock[1]))).toBe(true);
    expect(isPossible(parseGame(mock[2]))).toBe(false);
    expect(isPossible(parseGame(mock[3]))).toBe(false);
    expect(isPossible(parseGame(mock[4]))).toBe(true);
  });

  it('should know the sums of the ids of possible games', () => {
    expect(findPossibleGameSums(mock)).toBe(8);
  });

  it('should know the sums of the ids of real games', () => {
    expect(findPossibleGameSums(real)).toBe(2237);
  });

  it('should know the power of the mock games', () => {
    expect(findAllPowers(mock)).toBe(2286);
  });

  it('should know the power of the real games', () => {
    expect(findAllPowers(real)).toBe(66681);
  });
});
