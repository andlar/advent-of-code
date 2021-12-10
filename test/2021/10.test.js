import {
  findCorruptionScore,
  findCompletionScore,
  getLineCompletionScore,
} from '2021/10';
import { mock, real } from '2021/10.data';

describe('while parsing data', () => {

});

describe('with mock data', () => {
  let state;
  beforeEach(() => {
    state = {data: mock};
  });

  it('should find the corruption score', () => {
    const score = findCorruptionScore(state);
    expect(score).toBe(26397);
  });

  it('should find the completion score', () => {
    const score = findCompletionScore(state);
    expect(score).toBe(288957);
  });

  it('should find a line completion score', () => {
    const score = getLineCompletionScore('<{([');
    expect(score).toBe(294);
  });
});

describe('with real data', () => {
  let state;
  beforeEach(() => {
    state = {data: real};
  });

  it('should find the corruption score', () => {
    const score = findCorruptionScore(state);
    expect(score).toBe(364389);
  });

  it('should find the completion score', () => {
    const score = findCompletionScore(state);
    expect(score).toBe(2870201088);
  });
});
