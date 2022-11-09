import {
  countChars,
} from './src';
import { mock, real } from './data';

describe('when counting characters', () => {
  it('should count basic quotes', () => {
    const [code, str] = countChars(mock[0]);
    expect(code).toBe(2);
    expect(str).toBe(0);
  });

  it('should handle simple characters', () => {
    console.log({mock});
    const [code, str] = countChars(mock[1]);
    expect(code).toBe(5);
    expect(str).toBe(3);
  });

  xit('should handle escaped quotes', () => {
    const [code, str, converted] = countChars(mock[2]);
    console.log(mock[2]);
    expect(converted).toBe('aaaQaaa');
    expect(code).toBe(10);
    expect(str).toBe(7);
  });

  xit('should handle escaped slashes', () => {
    const [code, str, converted] = countChars(mock[3]);
    expect(converted).toBe('aaa|aaa');
    expect(code).toBe(10);
    expect(str).toBe(7);
  });
});
