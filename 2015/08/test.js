import {
  countChars,
  getSize,
  getFileSize,
  encode,
} from './src';
import { mock, real } from './data';

describe('when counting characters', () => {
  it('should count basic quotes', () => {
    const [code, str] = countChars(mock[0]);
    expect(code).toBe(2);
    expect(str).toBe(0);
  });

  it('should handle simple characters', () => {
    const [code, str] = countChars(mock[1]);
    expect(code).toBe(5);
    expect(str).toBe(3);
  });

  it('should handle escaped quotes', () => {
    const [code, str, converted] = countChars(mock[2]);
    expect(converted).toBe('aaa"aaa');
    expect(code).toBe(10);
    expect(str).toBe(7);
  });

  it('should handle escaped slashes', () => {
    const [code, str, converted] = countChars(mock[3]);
    expect(converted).toBe('aaa|aaa');
    expect(code).toBe(10);
    expect(str).toBe(7);
  });

  it('should handle escaped slashes', () => {
    const [code, str, converted] = countChars(mock[4]);
    expect(converted).toBe('U');
    expect(code).toBe(6);
    expect(str).toBe(1);
  });

  it('should know the size difference', () => {
    expect(getSize(mock[0])).toBe(2);
    expect(getSize(mock[1])).toBe(2);
    expect(getSize(mock[2])).toBe(3);
    expect(getSize(mock[3])).toBe(3);
    expect(getSize(mock[4])).toBe(5);
  });

  it('should know the file size', () => {
    expect(getFileSize(mock)).toBe(15);
  });

  it('should know the full file size', () => {
    expect(getFileSize(real)).toBe(1342);
  });
});

describe('when encoding characters', () => {
  it('should count basic quotes', () => {
    const [code, str] = encode(mock[0]);
    expect(code).toBe(2);
    expect(str).toBe(6);
  });

  it('should handle simple characters', () => {
    const [code, str] = encode(mock[1]);
    expect(code).toBe(5);
    expect(str).toBe(9);
  });

  it('should handle escaped quotes', () => {
    const [code, str] = encode(mock[2]);
    expect(code).toBe(10);
    expect(str).toBe(16);
  });

  it('should handle escaped slashes', () => {
    const [code, str] = encode(mock[3]);
    expect(code).toBe(10);
    expect(str).toBe(16);
  });

  it('should handle escaped slashes', () => {
    const [code, str] = encode(mock[4]);
    expect(code).toBe(6);
    expect(str).toBe(11);
  });

  it('should know the size difference', () => {
    expect(getSize(mock[0], encode)).toBe(4);
    expect(getSize(mock[1], encode)).toBe(4);
    expect(getSize(mock[2], encode)).toBe(6);
    expect(getSize(mock[3], encode)).toBe(6);
    expect(getSize(mock[4], encode)).toBe(5);
  });

  it('should know the file size', () => {
    expect(getFileSize(mock, encode)).toBe(25);
  });

  it('should know the full file size', () => {
    expect(getFileSize(real, encode)).toBe(2074);
  });
});
