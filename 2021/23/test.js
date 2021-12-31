import {
  getNext,
  print,
  isOver,
  solve,
} from './src';

describe('when moving to the hallway', () => {
  it('should get the next states when the top amphis can go anywhere in the hallway', () => {
    const state = {
      hallway: {
        p: undefined,
        q: undefined,
        r: undefined,
        s: undefined,
        t: undefined,
        u: undefined,
        v: undefined,
      },
      a: {
        f: 'B',
        b: 'A',
      },
      b: {
        f: 'C',
        b: 'D',
      },
      c: {
        f: 'B',
        b: 'C',
      },
      d: {
        f: 'D',
        b: 'A',
      },
      cost: 0,
    };
    const states = getNext(state);
    expect(states.length).toBe(28);
  });

  it('should get the next states when the bottom amphis can go anywhere in the hallway', () => {
    const state = {
      hallway: {
        p: undefined,
        q: undefined,
        r: undefined,
        s: undefined,
        t: undefined,
        u: undefined,
        v: undefined,
      },
      a: {
        f: undefined,
        b: 'B',
      },
      b: {
        f: undefined,
        b: 'D',
      },
      c: {
        f: undefined,
        b: 'A',
      },
      d: {
        f: undefined,
        b: 'A',
      },
      cost: 0,
    };
    const states = getNext(state);
    expect(states.length).toBe(28);
  });

  it('should get the next states when the bottom amphis are already in their home', () => {
    const state = {
      hallway: {
        p: undefined,
        q: undefined,
        r: undefined,
        s: undefined,
        t: undefined,
        u: undefined,
        v: undefined,
      },
      a: {
        f: undefined,
        b: 'A',
      },
      b: {
        f: undefined,
        b: 'B',
      },
      c: {
        f: undefined,
        b: 'C',
      },
      d: {
        f: undefined,
        b: 'D',
      },
      cost: 0,
    };
    const states = getNext(state);
    expect(states.length).toBe(0);
  });

  it('should get the next states when moving from the hallway', () => {
    const state = {
      hallway: {
        p: 'A',
        q: undefined,
        r: 'B',
        s: undefined,
        t: 'C',
        u: undefined,
        v: 'D',
      },
      a: {
        f: undefined,
        b: 'A',
      },
      b: {
        f: undefined,
        b: 'B',
      },
      c: {
        f: undefined,
        b: 'C',
      },
      d: {
        f: undefined,
        b: 'D',
      },
      cost: 0,
    };
    const states = getNext(state);
    //states.forEach((state) => console.log(print(state)));
    expect(states.length).toBe(1);
  });

  it('should get only one state if a hallway position can move to a final state', () => {
    const state = {
      hallway: {
        p: 'A',
        q: undefined,
        r: 'C',
        s: undefined,
        t: undefined,
        u: 'B',
        v: 'D',
      },
      a: {
        f: 'B',
        b: 'A',
      },
      b: {
        f: undefined,
        b: 'D',
      },
      c: {
        f: undefined,
        b: 'C',
      },
      d: {
        f: undefined,
        b: undefined,
      },
      cost: 3250,
    };
    const states = getNext(state);
    //console.log(print(state))
    //states.forEach((state) => console.log(print(state)));
    expect(states.length).toBe(1);
  });
});

describe('with specific situations', () => {
  it('should work', () => {
    const state = {
      hallway: {
        p: undefined,
        q: undefined,
        r: undefined,
        s: 'B',
        t: undefined,
        u: 'D',
        v: 'B',
      },
      a: {
        f: 'A',
        b: 'A',
      },
      b: {
        f: undefined,
        b: 'D',
      },
      c: {
        f: 'C',
        b: 'C',
      },
      d: {
        f: undefined,
        b: undefined,
      },
      cost: 3103,
    };
    const states = getNext(state);
    //console.log(print(state))
    //states.forEach((state) => console.log(print(state)));
    expect(states.length).toBe(1);
  });

  it('should work', () => {
    const state = {
      hallway: {
        p: undefined,
        q: undefined,
        r: 'D',
        s: undefined,
        t: undefined,
        u: undefined,
        v: 'D',
      },
      a: {
        f: undefined,
        b: 'A',
      },
      b: {
        f: 'B',
        b: 'B',
      },
      c: {
        f: 'C',
        b: 'C',
      },
      d: {
        f: undefined,
        b: 'A',
      },
      cost: 7470,
    };
    const states = getNext(state);
    //console.log(print(state))
    //states.forEach((state) => console.log(print(state)));
    expect(states.length).toBe(3);
  });

  it('should not have multiple Cs', () => {
    const state = {
      hallway: {
        p: undefined,
        q: undefined,
        r: undefined,
        s: 'B',
        t: undefined,
        u: undefined,
        v: undefined,
      },
      a: {
        f: 'B',
        b: 'A',
      },
      b: {
        f: 'C',
        b: 'D',
      },
      c: {
        f: undefined,
        b: 'C',
      },
      d: {
        f: 'D',
        b: 'A',
      },
      cost: 20,
    };
    const states = getNext(state);
    //console.log(print(state))
    //states.forEach((state) => console.log(print(state)));
    expect(states.length).toBe(9);
  });
});

describe('when analyzing the game', () => {
  it('should know when it is over', () => {
    const state = {
      hallway: {
        p: undefined,
        q: undefined,
        r: undefined,
        s: undefined,
        t: undefined,
        u: undefined,
        v: undefined,
      },
      a: {
        f: 'A',
        b: 'A',
      },
      b: {
        f: 'B',
        b: 'B',
      },
      c: {
        f: 'C',
        b: 'C',
      },
      d: {
        f: 'D',
        b: 'D',
      },
      cost: 0,
    };
    const done = isOver(state);
    expect(done).toBe(true);
  });
});

describe('when solving', () => {
  it('should solve the sample game', () => {
    const states = [{
      hallway: {
        p: undefined,
        q: undefined,
        r: undefined,
        s: undefined,
        t: undefined,
        u: undefined,
        v: undefined,
      },
      a: {
        f: 'B',
        b: 'A',
      },
      b: {
        f: 'C',
        b: 'D',
      },
      c: {
        f: 'B',
        b: 'C',
      },
      d: {
        f: 'D',
        b: 'A',
      },
      cost: 0,
      history: [],
    }];
    let solved = solve(states);
    //console.log(print(solved));
    //console.log(solved);
    //console.log(solved.filter((state) => state.cost <= 12521).length);
    /*
    solved = solve(solved);
    console.log(solved.filter((state) => state.cost <= 12521).length);
    solved = solve(solved);
    console.log(solved.filter((state) => state.cost <= 12521).length);
    solved = solve(solved);
    console.log(solved.filter((state) => state.cost <= 12521).length);
    solved = solve(solved);
    console.log(solved.filter((state) => state.cost <= 12521).length);
    solved = solve(solved);
    console.log(solved.filter((state) => state.cost <= 12521).length);
    solved = solve(solved);
    console.log(solved.filter((state) => state.cost <= 12521).length);
    */
    /*
    solved
      //.filter((state) => state.cost <= 450)
      .filter((state) => state.c.f === 'C')
      .filter((state) => state.b.b === 'B')
      .forEach((state) => console.log(print(state)));
    */
    solved.history.forEach((state) => console.log(print(state)));
    expect(solved.cost).toBe(12521);
  });

  it('should solve the real game', () => {
    const states = [{
      hallway: {
        p: undefined,
        q: undefined,
        r: undefined,
        s: undefined,
        t: undefined,
        u: undefined,
        v: undefined,
      },
      a: {
        f: 'A',
        b: 'C',
      },
      b: {
        f: 'D',
        b: 'D',
      },
      c: {
        f: 'C',
        b: 'B',
      },
      d: {
        f: 'A',
        b: 'B',
      },
      cost: 0,
      history: [],
    }];
    let solved = solve(states);
    //solved.history.forEach((state) => console.log(print(state)));
    console.log(solved.history.length);
    expect(solved.cost).toBe(15365);
  });
});
