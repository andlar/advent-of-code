import {
  parseInput,
  grow,
  growAll,
  growAllExtended,
} from '2021/12';
import { mock1, mock2, mock3, real } from '2021/12.data';

describe('while parsing data', () => {
  it('should interpret input', () => {
    let state = parseInput(mock1);
    expect(state.mappings['start']).toEqual(['A', 'b']);
    expect(state.mappings['A']).toEqual(['c', 'b', 'end']);
    expect(state.mappings['b']).toEqual(['A', 'd', 'end']);
    expect(state.mappings['c']).toEqual(['A']);
    expect(state.mappings['d']).toEqual(['b']);
    expect(state.mappings['end']).toEqual([]);
    expect(state.pending[0]).toBe('start')
    expect(state.routes.size).toBe(0);
  });
});

describe('with mock data', () => {
  let state;
  beforeEach(() => {
    state = parseInput(mock1);
  });

  describe('growing paths', () => {
    it('should grow a path', () => {
      let next = grow(state);
      expect(next.pending[0]).toBe('start,A');
      expect(next.pending[1]).toBe('start,b');
      expect(next.pending.length).toBe(2);
      expect(next.routes.size).toBe(0);
    });

    it('should grow a path twice', () => {
      let next = grow(state);
      next = grow(next);
      expect(next.pending[0]).toBe('start,A,c');
      expect(next.pending[1]).toBe('start,A,b');
      expect(next.pending[2]).toBe('start,A,end');
      expect(next.pending[3]).toBe('start,b,A');
      expect(next.pending[4]).toBe('start,b,d');
      expect(next.pending[5]).toBe('start,b,end');
      expect(next.pending.length).toBe(6);
      expect(next.routes.size).toBe(2);
    });

    it('should grow a path three times', () => {
      let next = grow(state);
      next = grow(next);
      next = grow(next);
      expect(next.pending.includes('start,A,b,d')).toBe(true);
      expect(next.pending.includes('start,A,c,A')).toBe(true);
      expect(next.pending.includes('start,A,b,A')).toBe(true);
      expect(next.pending.includes('start,A,b,end')).toBe(true);
      expect(next.pending.includes('start,b,A,c')).toBe(true);
      expect(next.pending.includes('start,b,A,end')).toBe(true);
      expect(next.pending.length).toBe(6);
      expect(next.routes.size).toBe(4);
    });

    it('should grow a path four times', () => {
      let next = grow(state);
      next = grow(next);
      next = grow(next);
      next = grow(next);
      expect(next.pending.includes('start,A,c,A,b')).toBe(true);
      expect(next.pending.includes('start,A,c,A,end')).toBe(true);
      expect(next.pending.includes('start,A,b,A,c')).toBe(true);
      expect(next.pending.includes('start,A,b,A,end')).toBe(true);
      expect(next.pending.includes('start,b,A,c,A')).toBe(true);
      expect(next.pending.length).toBe(5);
      expect(next.routes.size).toBe(6);
    });

    it('should grow a path five times', () => {
      let next = grow(state);
      next = grow(next);
      next = grow(next);
      next = grow(next);
      next = grow(next);
      expect(next.pending.includes('start,A,c,A,b,A')).toBe(true);
      expect(next.pending.includes('start,A,c,A,b,d')).toBe(true);
      expect(next.pending.includes('start,A,c,A,b,end')).toBe(true);
      expect(next.pending.includes('start,A,b,A,c,A')).toBe(true);
      expect(next.pending.includes('start,b,A,c,A,end')).toBe(true);
      expect(next.pending.length).toBe(5);
      expect(next.routes.size).toBe(8);
    });

    it('should grow a path five times', () => {
      let next = grow(state);
      next = grow(next);
      next = grow(next);
      next = grow(next);
      next = grow(next);
      next = grow(next);
      expect(next.pending.includes('start,A,c,A,b,A,end')).toBe(true);
      expect(next.pending.includes('start,A,b,A,c,A,end')).toBe(true);
      expect(next.pending.length).toBe(2);
      expect(next.routes.size).toBe(10);
    });

    it('should grow a path six times', () => {
      let next = grow(state);
      next = grow(next);
      next = grow(next);
      next = grow(next);
      next = grow(next);
      next = grow(next);
      next = grow(next);
      expect(next.pending.length).toBe(0);
      expect(next.routes.size).toBe(10);
    });
  });

  describe('growing all the way', () => {
    it('should grow all for mock1', () => {
      let next = growAll(state);
      expect(next.routes.size).toBe(10);
    });

    it('should grow all for mock2', () => {
      let next = growAll(parseInput(mock2));
      expect(next.routes.size).toBe(19);
    });

    it('should grow all for mock3', () => {
      let next = growAll(parseInput(mock3));
      expect(next.routes.size).toBe(226);
    });

    it('should grow all, extended, for mock1', () => {
      let next = growAllExtended(state);
      expect(next.routes.size).toBe(36);
    });

    it('should grow all, extended, for mock2', () => {
      let next = growAllExtended(parseInput(mock2));
      expect(next.routes.size).toBe(103);
    });

    it('should grow all, extended, for mock3', () => {
      let next = growAllExtended(parseInput(mock3));
      expect(next.routes.size).toBe(3509);
    });
  });
});

describe('with real data', () => {
  let state;
  beforeEach(() => {
    state = parseInput(real);
  });

  it('should grow all', () => {
    let next = growAll(state);
    expect(next.routes.size).toBe(3887);
  });

  it('should grow all extended', () => {
    let next = growAllExtended(state);
    expect(next.routes.size).toBe(104834);
  });
});
