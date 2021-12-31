const getCost = (letter) => letter === 'A' ? 1 : (letter === 'B' ? 10 : (letter === 'C' ? 100 : 1000));

const moveABack = (state) => {
  const states = [];
  if (!state.a.b || state.a.b === 'A') {
    return states;
  }
  if (!state.hallway.p && !state.hallway.q) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        p: state.a.b,
      },
      a: {
        ...state.a,
        b: undefined,
      },
      cost: state.cost + getCost(state.a.b) * 4,
    });
  }
  if (!state.hallway.q) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        q: state.a.b,
      },
      a: {
        ...state.a,
        b: undefined,
      },
      cost: state.cost + getCost(state.a.b) * 3,
    });
  }
  if (!state.hallway.r) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        r: state.a.b,
      },
      a: {
        ...state.a,
        b: undefined,
      },
      cost: state.cost + getCost(state.a.b) * 3,
    });
  }
  if (!state.hallway.r && !state.hallway.s) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        s: state.a.b,
      },
      a: {
        ...state.a,
        b: undefined,
      },
      cost: state.cost + getCost(state.a.b) * 5,
    });
  }
  if (!state.hallway.r && !state.hallway.s && !state.hallway.t) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        t: state.a.b,
      },
      a: {
        ...state.a,
        b: undefined,
      },
      cost: state.cost + getCost(state.a.b) * 7,
    });
  }
  if (!state.hallway.r && !state.hallway.s && !state.hallway.t && !state.hallway.u) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        u: state.a.b,
      },
      a: {
        ...state.a,
        b: undefined,
      },
      cost: state.cost + getCost(state.a.b) * 9,
    });
  }
  if (!state.hallway.r && !state.hallway.s && !state.hallway.t && !state.hallway.u && !state.hallway.v) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        v: state.a.b,
      },
      a: {
        ...state.a,
        b: undefined,
      },
      cost: state.cost + getCost(state.a.b) * 10,
    });
  }
  return states;
};

const moveBBack = (state) => {
  const states = [];
  if (!state.b.b || state.b.b === 'B') {
    return states;
  }
  if (!state.hallway.p && !state.hallway.q && !state.hallway.r) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        p: state.b.b,
      },
      b: {
        ...state.b,
        b: undefined,
      },
      cost: state.cost + getCost(state.b.b) * 6,
    });
  }
  if (!state.hallway.q && !state.hallway.r) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        q: state.b.b,
      },
      b: {
        ...state.b,
        b: undefined,
      },
      cost: state.cost + getCost(state.b.b) * 5,
    });
  }
  if (!state.hallway.r) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        r: state.b.b,
      },
      b: {
        ...state.b,
        b: undefined,
      },
      cost: state.cost + getCost(state.b.b) * 3,
    });
  }
  if (!state.hallway.s) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        s: state.b.b,
      },
      b: {
        ...state.b,
        b: undefined,
      },
      cost: state.cost + getCost(state.b.b) * 3,
    });
  }
  if (!state.hallway.s && !state.hallway.t) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        t: state.b.b,
      },
      b: {
        ...state.b,
        b: undefined,
      },
      cost: state.cost + getCost(state.b.b) * 5,
    });
  }
  if (!state.hallway.s && !state.hallway.t && !state.hallway.u) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        u: state.b.b,
      },
      b: {
        ...state.b,
        b: undefined,
      },
      cost: state.cost + getCost(state.b.b) * 7,
    });
  }
  if (!state.hallway.s && !state.hallway.t && !state.hallway.u && !state.hallway.v) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        v: state.b.b,
      },
      b: {
        ...state.b,
        b: undefined,
      },
      cost: state.cost + getCost(state.b.b) * 8,
    });
  }
  return states;
};

const moveCBack = (state) => {
  const states = [];
  if (!state.c.b || state.c.b === 'C') {
    return states;
  }
  if (!state.hallway.p && !state.hallway.q && !state.hallway.r && !state.hallway.s) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        p: state.c.b,
      },
      c: {
        ...state.c,
        b: undefined,
      },
      cost: state.cost + getCost(state.c.b) * 8,
    });
  }
  if (!state.hallway.q && !state.hallway.r && !state.hallway.s) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        q: state.c.b,
      },
      c: {
        ...state.c,
        b: undefined,
      },
      cost: state.cost + getCost(state.c.b) * 7,
    });
  }
  if (!state.hallway.r && !state.hallway.s) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        r: state.c.b,
      },
      c: {
        ...state.c,
        b: undefined,
      },
      cost: state.cost + getCost(state.c.b) * 5,
    });
  }
  if (!state.hallway.s) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        s: state.c.b,
      },
      c: {
        ...state.c,
        b: undefined,
      },
      cost: state.cost + getCost(state.c.b) * 3,
    });
  }
  if (!state.hallway.t) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        t: state.c.b,
      },
      c: {
        ...state.c,
        b: undefined,
      },
      cost: state.cost + getCost(state.c.b) * 3,
    });
  }
  if (!state.hallway.t && !state.hallway.u) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        u: state.c.b,
      },
      c: {
        ...state.c,
        b: undefined,
      },
      cost: state.cost + getCost(state.c.b) * 5,
    });
  }
  if (!state.hallway.t && !state.hallway.u && !state.hallway.v) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        v: state.c.b,
      },
      c: {
        ...state.c,
        b: undefined,
      },
      cost: state.cost + getCost(state.c.b) * 6,
    });
  }
  return states;
};

const moveDBack = (state) => {
  const states = [];
  if (!state.d.b || state.d.b === 'D') {
    return states;
  }
  if (!state.hallway.p && !state.hallway.q && !state.hallway.r && !state.hallway.s && !state.hallway.t) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        p: state.d.b,
      },
      d: {
        ...state.d,
        b: undefined,
      },
      cost: state.cost + getCost(state.d.b) * 10,
    });
  }
  if (!state.hallway.q && !state.hallway.r && !state.hallway.s && !state.hallway.t) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        q: state.d.b,
      },
      d: {
        ...state.d,
        b: undefined,
      },
      cost: state.cost + getCost(state.d.b) * 9,
    });
  }
  if (!state.hallway.r && !state.hallway.s && !state.hallway.t) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        r: state.d.b,
      },
      d: {
        ...state.d,
        b: undefined,
      },
      cost: state.cost + getCost(state.d.b) * 7,
    });
  }
  if (!state.hallway.s && !state.hallway.t) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        s: state.d.b,
      },
      d: {
        ...state.d,
        b: undefined,
      },
      cost: state.cost + getCost(state.d.b) * 5,
    });
  }
  if (!state.hallway.t) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        t: state.d.b,
      },
      d: {
        ...state.d,
        b: undefined,
      },
      cost: state.cost + getCost(state.d.b) * 3,
    });
  }
  if (!state.hallway.u) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        u: state.d.b,
      },
      d: {
        ...state.d,
        b: undefined,
      },
      cost: state.cost + getCost(state.d.b) * 3,
    });
  }
  if (!state.hallway.u && !state.hallway.v) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        v: state.d.b,
      },
      d: {
        ...state.d,
        b: undefined,
      },
      cost: state.cost + getCost(state.d.b) * 4,
    });
  }
  return states;
};

const moveAFront = (state) => {
  const states = [];
  if (state.a.b === 'A' && state.a.f === 'A') {
    return states;
  }
  if (!state.a.f) {
    return moveABack(state);
  }
  if (!state.hallway.p && !state.hallway.q) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        p: state.a.f,
      },
      a: {
        ...state.a,
        f: undefined,
      },
      cost: state.cost + getCost(state.a.f) * 3,
    });
  }
  if (!state.hallway.q) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        q: state.a.f,
      },
      a: {
        ...state.a,
        f: undefined,
      },
      cost: state.cost + getCost(state.a.f) * 2,
    });
  }
  if (!state.hallway.r) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        r: state.a.f,
      },
      a: {
        ...state.a,
        f: undefined,
      },
      cost: state.cost + getCost(state.a.f) * 2,
    });
  }
  if (!state.hallway.r && !state.hallway.s) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        s: state.a.f,
      },
      a: {
        ...state.a,
        f: undefined,
      },
      cost: state.cost + getCost(state.a.f) * 4,
    });
  }
  if (!state.hallway.r && !state.hallway.s && !state.hallway.t) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        t: state.a.f,
      },
      a: {
        ...state.a,
        f: undefined,
      },
      cost: state.cost + getCost(state.a.f) * 6,
    });
  }
  if (!state.hallway.r && !state.hallway.s && !state.hallway.t && !state.hallway.u) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        u: state.a.f,
      },
      a: {
        ...state.a,
        f: undefined,
      },
      cost: state.cost + getCost(state.a.f) * 8,
    });
  }
  if (!state.hallway.r && !state.hallway.s && !state.hallway.t && !state.hallway.u && !state.hallway.v) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        v: state.a.f,
      },
      a: {
        ...state.a,
        f: undefined,
      },
      cost: state.cost + getCost(state.a.f) * 9,
    });
  }
  return states;
};

const moveBFront = (state) => {
  const states = [];
  if (state.b.b === 'B' && state.b.f === 'B') {
    return states;
  }
  if (!state.b.f) {
    return moveBBack(state);
  }
  if (!state.hallway.p && !state.hallway.q && !state.hallway.r) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        p: state.b.f,
      },
      b: {
        ...state.b,
        f: undefined,
      },
      cost: state.cost + getCost(state.b.f) * 5,
    });
  }
  if (!state.hallway.q && !state.hallway.r) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        q: state.b.f,
      },
      b: {
        ...state.b,
        f: undefined,
      },
      cost: state.cost + getCost(state.b.f) * 4,
    });
  }
  if (!state.hallway.r) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        r: state.b.f,
      },
      b: {
        ...state.b,
        f: undefined,
      },
      cost: state.cost + getCost(state.b.f) * 2,
    });
  }
  if (!state.hallway.s) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        s: state.b.f,
      },
      b: {
        ...state.b,
        f: undefined,
      },
      cost: state.cost + getCost(state.b.f) * 2,
    });
  }
  if (!state.hallway.s && !state.hallway.t) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        t: state.b.f,
      },
      b: {
        ...state.b,
        f: undefined,
      },
      cost: state.cost + getCost(state.b.f) * 4,
    });
  }
  if (!state.hallway.s && !state.hallway.t && !state.hallway.u) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        u: state.b.f,
      },
      b: {
        ...state.b,
        f: undefined,
      },
      cost: state.cost + getCost(state.b.f) * 6,
    });
  }
  if (!state.hallway.s && !state.hallway.t && !state.hallway.u && !state.hallway.v) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        v: state.b.f,
      },
      b: {
        ...state.b,
        f: undefined,
      },
      cost: state.cost + getCost(state.b.f) * 7,
    });
  }
  return states;
};

const moveCFront = (state) => {
  const states = [];
  if (state.c.b === 'C' && state.c.f === 'C') {
    return states;
  }
  if (!state.c.f) {
    return moveCBack(state);
  }
  if (!state.hallway.p && !state.hallway.q && !state.hallway.r && !state.hallway.s) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        p: state.c.f,
      },
      c: {
        ...state.c,
        f: undefined,
      },
      cost: state.cost + getCost(state.c.f) * 7,
    });
  }
  if (!state.hallway.q && !state.hallway.r && !state.hallway.s) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        q: state.c.f,
      },
      c: {
        ...state.c,
        f: undefined,
      },
      cost: state.cost + getCost(state.c.f) * 6,
    });
  }
  if (!state.hallway.r && !state.hallway.s) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        r: state.c.f,
      },
      c: {
        ...state.c,
        f: undefined,
      },
      cost: state.cost + getCost(state.c.f) * 4,
    });
  }
  if (!state.hallway.s) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        s: state.c.f,
      },
      c: {
        ...state.c,
        f: undefined,
      },
      cost: state.cost + getCost(state.c.f) * 2,
    });
  }
  if (!state.hallway.t) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        t: state.c.f,
      },
      c: {
        ...state.c,
        f: undefined,
      },
      cost: state.cost + getCost(state.c.f) * 2,
    });
  }
  if (!state.hallway.t && !state.hallway.u) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        u: state.c.f,
      },
      c: {
        ...state.c,
        f: undefined,
      },
      cost: state.cost + getCost(state.c.f) * 4,
    });
  }
  if (!state.hallway.t && !state.hallway.u && !state.hallway.v) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        v: state.c.f,
      },
      c: {
        ...state.c,
        f: undefined,
      },
      cost: state.cost + getCost(state.c.f) * 5,
    });
  }
  return states;
};

const moveDFront = (state) => {
  const states = [];
  if (state.d.b === 'D' && state.d.f === 'D') {
    return states;
  }
  if (!state.d.f) {
    return moveDBack(state);
  }
  if (!state.hallway.p && !state.hallway.q && !state.hallway.r && !state.hallway.s && !state.hallway.t) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        p: state.d.f,
      },
      d: {
        ...state.d,
        f: undefined,
      },
      cost: state.cost + getCost(state.d.f) * 9,
    });
  }
  if (!state.hallway.q && !state.hallway.r && !state.hallway.s && !state.hallway.t) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        q: state.d.f,
      },
      d: {
        ...state.d,
        f: undefined,
      },
      cost: state.cost + getCost(state.d.f) * 8,
    });
  }
  if (!state.hallway.r && !state.hallway.s && !state.hallway.t) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        r: state.d.f,
      },
      d: {
        ...state.d,
        f: undefined,
      },
      cost: state.cost + getCost(state.d.f) * 6,
    });
  }
  if (!state.hallway.r && !state.hallway.s && !state.hallway.t) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        s: state.d.f,
      },
      d: {
        ...state.d,
        f: undefined,
      },
      cost: state.cost + getCost(state.d.f) * 4,
    });
  }
  if (!state.hallway.t) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        t: state.d.f,
      },
      d: {
        ...state.d,
        f: undefined,
      },
      cost: state.cost + getCost(state.d.f) * 2,
    });
  }
  if (!state.hallway.u) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        u: state.d.f,
      },
      d: {
        ...state.d,
        f: undefined,
      },
      cost: state.cost + getCost(state.d.f) * 2,
    });
  }
  if (!state.hallway.u && !state.hallway.v) {
    states.push({
      ...state,
      hallway: {
        ...state.hallway,
        v: state.d.f,
      },
      d: {
        ...state.d,
        f: undefined,
      },
      cost: state.cost + getCost(state.d.f) * 3,
    });
  }
  return states;
};

const moveHallway = (state) => {
  if (!state.hallway.p && !state.hallway.q && !state.hallway.r && !state.hallway.s && !state.hallway.t && !state.hallway.u && !state.hallway.v) {
    return [];
  }
  if (state.hallway.p && !state.hallway.q) {
    switch (state.hallway.p) {
      case 'A':
        if (!state.a.f && !state.a.b) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              p: undefined,
            },
            a: {
              ...state.a,
              b: 'A',
            },
            cost: state.cost + getCost('A') * 4,
          }];
        }
        if (!state.a.f && state.a.b === 'A') {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              p: undefined,
            },
            a: {
              ...state.a,
              f: 'A',
            },
            cost: state.cost + getCost('A') * 3,
          }];
        }
        break;
      case 'B':
        if (!state.b.f && !state.b.b && !state.hallway.r) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              p: undefined,
            },
            b: {
              ...state.b,
              b: 'B',
            },
            cost: state.cost + getCost('B') * 6,
          }];
        }
        if (!state.b.f && state.b.b === 'B' && !state.hallway.r) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              p: undefined,
            },
            b: {
              ...state.b,
              f: 'B',
            },
            cost: state.cost + getCost('B') * 5,
          }];
        }
        break;
      case 'C':
        if (!state.c.f && !state.c.b && !state.hallway.r && !state.hallway.s) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              p: undefined,
            },
            c: {
              ...state.c,
              b: 'C',
            },
            cost: state.cost + getCost('C') * 8,
          }];
        }
        if (!state.c.f && state.c.b === 'C' && !state.hallway.r && !state.hallway.s) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              p: undefined,
            },
            c: {
              ...state.c,
              f: 'C',
            },
            cost: state.cost + getCost('C') * 7,
          }];
        }
        break;
      case 'D':
        if (!state.d.f && !state.d.b && !state.hallway.r && !state.hallway.s && !state.hallway.t) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              p: undefined,
            },
            d: {
              ...state.d,
              b: 'D',
            },
            cost: state.cost + getCost('D') * 10,
          }];
        }
        if (!state.d.f && state.d.b === 'D' && !state.hallway.r && !state.hallway.s && !state.hallway.t) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              p: undefined,
            },
            d: {
              ...state.d,
              f: 'D',
            },
            cost: state.cost + getCost('D') * 9,
          }];
        }
        break;
    };
  }
  if (state.hallway.q) {
    switch (state.hallway.q) {
      case 'A':
        if (!state.a.f && !state.a.b) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              q: undefined,
            },
            a: {
              ...state.a,
              b: 'A',
            },
            cost: state.cost + getCost('A') * 3,
          }];
        }
        if (!state.a.f && state.a.b === 'A') {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              q: undefined,
            },
            a: {
              ...state.a,
              f: 'A',
            },
            cost: state.cost + getCost('A') * 2,
          }];
        }
        break;
      case 'B':
        if (!state.b.f && !state.b.b && !state.hallway.r) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              q: undefined,
            },
            b: {
              ...state.b,
              b: 'B',
            },
            cost: state.cost + getCost('B') * 5,
          }];
        }
        if (!state.b.f && state.b.b === 'B' && !state.hallway.r) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              q: undefined,
            },
            b: {
              ...state.b,
              f: 'B',
            },
            cost: state.cost + getCost('B') * 4,
          }];
        }
        break;
      case 'C':
        if (!state.c.f && !state.c.b && !state.hallway.r && !state.hallway.s) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              q: undefined,
            },
            c: {
              ...state.c,
              b: 'C',
            },
            cost: state.cost + getCost('C') * 7,
          }];
        }
        if (!state.c.f && state.c.b === 'C' && !state.hallway.r && !state.hallway.s) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              q: undefined,
            },
            c: {
              ...state.c,
              f: 'C',
            },
            cost: state.cost + getCost('C') * 6,
          }];
        }
        break;
      case 'D':
        if (!state.d.f && !state.d.b && !state.hallway.r && !state.hallway.s && !state.hallway.t) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              q: undefined,
            },
            d: {
              ...state.d,
              b: 'D',
            },
            cost: state.cost + getCost('D') * 9,
          }];
        }
        if (!state.d.f && state.d.b === 'D' && !state.hallway.r && !state.hallway.s && !state.hallway.t) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              q: undefined,
            },
            d: {
              ...state.d,
              f: 'D',
            },
            cost: state.cost + getCost('D') * 8,
          }];
        }
        break;
    };
  }
  if (state.hallway.r) {
    switch (state.hallway.r) {
      case 'A':
        if (!state.a.f && !state.a.b) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              r: undefined,
            },
            a: {
              ...state.a,
              b: 'A',
            },
            cost: state.cost + getCost('A') * 3,
          }];
        }
        if (!state.a.f && state.a.b === 'A') {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              r: undefined,
            },
            a: {
              ...state.a,
              f: 'A',
            },
            cost: state.cost + getCost('A') * 2,
          }];
        }
        break;
      case 'B':
        if (!state.b.f && !state.b.b) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              r: undefined,
            },
            b: {
              ...state.b,
              b: 'B',
            },
            cost: state.cost + getCost('B') * 3,
          }];
        }
        if (!state.b.f && state.b.b === 'B') {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              r: undefined,
            },
            b: {
              ...state.b,
              f: 'B',
            },
            cost: state.cost + getCost('B') * 2,
          }];
        }
        break;
      case 'C':
        if (!state.c.f && !state.c.b && !state.hallway.s) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              r: undefined,
            },
            c: {
              ...state.c,
              b: 'C',
            },
            cost: state.cost + getCost('C') * 5,
          }];
        }
        if (!state.c.f && state.c.b === 'C' && !state.hallway.s) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              r: undefined,
            },
            c: {
              ...state.c,
              f: 'C',
            },
            cost: state.cost + getCost('C') * 4,
          }];
        }
        break;
      case 'D':
        if (!state.d.f && !state.d.b && !state.hallway.s && !state.hallway.t) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              r: undefined,
            },
            d: {
              ...state.d,
              b: 'D',
            },
            cost: state.cost + getCost('D') * 7,
          }];
        }
        if (!state.d.f && state.d.b === 'D' && !state.hallway.s && !state.hallway.t) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              r: undefined,
            },
            d: {
              ...state.d,
              f: 'D',
            },
            cost: state.cost + getCost('D') * 6,
          }];
        }
        break;
    };
  }
  if (state.hallway.s) {
    switch (state.hallway.s) {
      case 'A':
        if (!state.a.f && !state.a.b && !state.hallway.r) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              s: undefined,
            },
            a: {
              ...state.a,
              b: 'A',
            },
            cost: state.cost + getCost('A') * 5,
          }];
        }
        if (!state.a.f && state.a.b === 'A' && !state.hallway.r) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              s: undefined,
            },
            a: {
              ...state.a,
              f: 'A',
            },
            cost: state.cost + getCost('A') * 4,
          }];
        }
        break;
      case 'B':
        if (!state.b.f && !state.b.b) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              s: undefined,
            },
            b: {
              ...state.b,
              b: 'B',
            },
            cost: state.cost + getCost('B') * 3,
          }];
        }
        if (!state.b.f && state.b.b === 'B') {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              s: undefined,
            },
            b: {
              ...state.b,
              f: 'B',
            },
            cost: state.cost + getCost('B') * 2,
          }];
        }
        break;
      case 'C':
        if (!state.c.f && !state.c.b) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              s: undefined,
            },
            c: {
              ...state.c,
              b: 'C',
            },
            cost: state.cost + getCost('C') * 3,
          }];
        }
        if (!state.c.f && state.c.b === 'C') {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              s: undefined,
            },
            c: {
              ...state.c,
              f: 'C',
            },
            cost: state.cost + getCost('C') * 2,
          }];
        }
        break;
      case 'D':
        if (!state.d.f && !state.d.b && !state.hallway.t) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              s: undefined,
            },
            d: {
              ...state.d,
              b: 'D',
            },
            cost: state.cost + getCost('D') * 5,
          }];
        }
        if (!state.d.f && state.d.b === 'D' && !state.hallway.t) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              s: undefined,
            },
            d: {
              ...state.d,
              f: 'D',
            },
            cost: state.cost + getCost('D') * 4,
          }];
        }
        break;
    };
  }
  if (state.hallway.t) {
    switch (state.hallway.t) {
      case 'A':
        if (!state.a.f && !state.a.b && !state.hallway.r && !state.hallway.s) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              t: undefined,
            },
            a: {
              ...state.a,
              b: 'A',
            },
            cost: state.cost + getCost('A') * 7,
          }];
        }
        if (!state.a.f && state.a.b === 'A' && !state.hallway.r && !state.hallway.s) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              t: undefined,
            },
            a: {
              ...state.a,
              f: 'A',
            },
            cost: state.cost + getCost('A') * 6,
          }];
        }
        break;
      case 'B':
        if (!state.b.f && !state.b.b && !state.hallway.s) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              t: undefined,
            },
            b: {
              ...state.b,
              b: 'B',
            },
            cost: state.cost + getCost('B') * 5,
          }];
        }
        if (!state.b.f && state.b.b === 'B' && !state.hallway.s) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              t: undefined,
            },
            b: {
              ...state.b,
              f: 'B',
            },
            cost: state.cost + getCost('B') * 4,
          }];
        }
        break;
      case 'C':
        if (!state.c.f && !state.c.b) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              t: undefined,
            },
            c: {
              ...state.c,
              b: 'C',
            },
            cost: state.cost + getCost('C') * 3,
          }];
        }
        if (!state.c.f && state.c.b === 'C') {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              t: undefined,
            },
            c: {
              ...state.c,
              f: 'C',
            },
            cost: state.cost + getCost('C') * 2,
          }];
        }
        break;
      case 'D':
        if (!state.d.f && !state.d.b) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              t: undefined,
            },
            d: {
              ...state.d,
              b: 'D',
            },
            cost: state.cost + getCost('D') * 3,
          }];
        }
        if (!state.d.f && state.d.b === 'D') {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              t: undefined,
            },
            d: {
              ...state.d,
              f: 'D',
            },
            cost: state.cost + getCost('D') * 2,
          }];
        }
        break;
    };
  }
  if (state.hallway.u) {
    switch (state.hallway.u) {
      case 'A':
        if (!state.a.f && !state.a.b && !state.hallway.r && !state.hallway.s && !state.hallway.t) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              u: undefined,
            },
            a: {
              ...state.a,
              b: 'A',
            },
            cost: state.cost + getCost('A') * 9,
          }];
        }
        if (!state.a.f && state.a.b === 'A' && !state.hallway.r && !state.hallway.s && !state.hallway.t) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              u: undefined,
            },
            a: {
              ...state.a,
              f: 'A',
            },
            cost: state.cost + getCost('A') * 8,
          }];
        }
        break;
      case 'B':
        if (!state.b.f && !state.b.b && !state.hallway.s && !state.hallway.t) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              u: undefined,
            },
            b: {
              ...state.b,
              b: 'B',
            },
            cost: state.cost + getCost('B') * 7,
          }];
        }
        if (!state.b.f && state.b.b === 'B' && !state.hallway.s && !state.hallway.t) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              u: undefined,
            },
            b: {
              ...state.b,
              f: 'B',
            },
            cost: state.cost + getCost('B') * 6,
          }];
        }
        break;
      case 'C':
        if (!state.c.f && !state.c.b && !state.hallway.t) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              u: undefined,
            },
            c: {
              ...state.c,
              b: 'C',
            },
            cost: state.cost + getCost('C') * 5,
          }];
        }
        if (!state.c.f && state.c.b === 'C' && !state.hallway.t) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              u: undefined,
            },
            c: {
              ...state.c,
              f: 'C',
            },
            cost: state.cost + getCost('C') * 4,
          }];
        }
        break;
      case 'D':
        if (!state.d.f && !state.d.b) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              u: undefined,
            },
            d: {
              ...state.d,
              b: 'D',
            },
            cost: state.cost + getCost('D') * 3,
          }];
        }
        if (!state.d.f && state.d.b === 'D') {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              u: undefined,
            },
            d: {
              ...state.d,
              f: 'D',
            },
            cost: state.cost + getCost('D') * 2,
          }];
        }
        break;
    };
  }
  if (state.hallway.v && !state.hallway.u) {
    switch (state.hallway.v) {
      case 'A':
        if (!state.a.f && !state.a.b && !state.hallway.r && !state.hallway.s && !state.hallway.t) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              v: undefined,
            },
            a: {
              ...state.a,
              b: 'A',
            },
            cost: state.cost + getCost('A') * 10,
          }];
        }
        if (!state.a.f && state.a.b === 'A' && !state.hallway.r && !state.hallway.s && !state.hallway.t) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              v: undefined,
            },
            a: {
              ...state.a,
              f: 'A',
            },
            cost: state.cost + getCost('A') * 9,
          }];
        }
        break;
      case 'B':
        if (!state.b.f && !state.b.b && !state.hallway.s && !state.hallway.t) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              v: undefined,
            },
            b: {
              ...state.b,
              b: 'B',
            },
            cost: state.cost + getCost('B') * 8,
          }];
        }
        if (!state.b.f && state.b.b === 'B' && !state.hallway.s && !state.hallway.t) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              v: undefined,
            },
            b: {
              ...state.b,
              f: 'B',
            },
            cost: state.cost + getCost('B') * 7,
          }];
        }
        break;
      case 'C':
        if (!state.c.f && !state.c.b && !state.hallway.t) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              v: undefined,
            },
            c: {
              ...state.c,
              b: 'C',
            },
            cost: state.cost + getCost('C') * 6,
          }];
        }
        if (!state.c.f && state.c.b === 'C' && !state.hallway.t) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              v: undefined,
            },
            c: {
              ...state.c,
              f: 'C',
            },
            cost: state.cost + getCost('C') * 5,
          }];
        }
        break;
      case 'D':
        if (!state.d.f && !state.d.b) {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              v: undefined,
            },
            d: {
              ...state.d,
              b: 'D',
            },
            cost: state.cost + getCost('D') * 4,
          }];
        }
        if (!state.d.f && state.d.b === 'D') {
          return [{
            ...state,
            hallway: {
              ...state.hallway,
              v: undefined,
            },
            d: {
              ...state.d,
              f: 'D',
            },
            cost: state.cost + getCost('D') * 3,
          }];
        }
        break;
    };
  }
  return [];
};

const print = (state) => {
  let out = `############# cost:${state.cost}
#${state.hallway.p || '.'}${state.hallway.q || '.'}.${state.hallway.r || '.'}.${state.hallway.s || '.'}.${state.hallway.t || '.'}.${state.hallway.u || '.'}${state.hallway.v || '.'}#
###${state.a.f || '.'}#${state.b.f || '.'}#${state.c.f || '.'}#${state.d.f || '.'}###
  #${state.a.b || '.'}#${state.b.b || '.'}#${state.c.b || '.'}#${state.d.b || '.'}#
  #########  `;
  return out;
};

const getKey = (state) => {
  let out = `${state.hallway.p || '.'}${state.hallway.q || '.'}${state.hallway.r || '.'}${state.hallway.s || '.'}${state.hallway.t || '.'}${state.hallway.u || '.'}${state.hallway.v || '.'}-${state.a.f || '.'}${state.b.f || '.'}${state.c.f || '.'}${state.d.f || '.'}-${state.a.b || '.'}${state.b.b || '.'}${state.c.b || '.'}${state.d.b || '.'}`;
  return out;
};

const getNext = (state) => {
  let states = moveHallway(state);
  if (states.length > 0) {
    return states.map((next) => ({
      ...next,
      history: [].concat(state.history).concat(state),
    }));
  }
  states = []
      .concat(moveAFront(state))
      .concat(moveBFront(state))
      .concat(moveCFront(state))
      .concat(moveDFront(state));
  return states.map((next) => ({
      ...next,
      history: [].concat(state.history).concat(state),
    }));
};

const isOver = (state) => state.a.f === 'A' && state.a.b === 'A'
      && state.b.f === 'B' && state.b.b === 'B'
      && state.c.f === 'C' && state.c.b === 'C'
      && state.d.f === 'D' && state.d.b === 'D';

const heuristic = (first, second) => {
  const firstHome = first.a.b === 'A' ? (first.a.f === 'A' ? 2 : 1) : 0
        + first.b.b === 'B' ? (first.b.f === 'B' ? 2 : 1) : 0
        + first.c.b === 'C' ? (first.c.f === 'C' ? 2 : 1) : 0
        + first.d.b === 'D' ? (first.d.f === 'D' ? 2 : 1) : 0;
  const secondHome = second.a.b === 'A' ? (second.a.f === 'A' ? 2 : 1) : 0
        + second.b.b === 'B' ? (second.b.f === 'B' ? 2 : 1) : 0
        + second.c.b === 'C' ? (second.c.f === 'C' ? 2 : 1) : 0
        + second.d.b === 'D' ? (second.d.f === 'D' ? 2 : 1) : 0;
//  if (firstHome !== secondHome) {
//    return secondHome - firstHome;
//  }
  return first.cost - second.cost;
}

const hasThreeCs = (state) => {
  return (state.hallway.p === 'C' ? 1 : 0)
    + (state.hallway.q === 'C' ? 1 : 0)
    + (state.hallway.r === 'C' ? 1 : 0)
    + (state.hallway.s === 'C' ? 1 : 0)
    + (state.hallway.t === 'C' ? 1 : 0)
    + (state.hallway.u === 'C' ? 1 : 0)
    + (state.hallway.v === 'C' ? 1 : 0)
    + (state.a.f === 'C' ? 1 : 0)
    + (state.a.b === 'C' ? 1 : 0)
    + (state.b.f === 'C' ? 1 : 0)
    + (state.b.b === 'C' ? 1 : 0)
    + (state.c.f === 'C' ? 1 : 0)
    + (state.c.b === 'C' ? 1 : 0)
    + (state.d.f === 'C' ? 1 : 0)
    + (state.d.b === 'C' ? 1 : 0)
    > 2;
};

const solve = (states) => {
  let next = [...states];
  let seen = new Set();
  let i = 0;
  let printed = false;
  //for (let i = 0; i < 30; i++) {
  while (!isOver(next[0])) {
    i += 1;
    seen.add(getKey(next[0]));
    next = next
      .flatMap((state, idx) => idx === 0 ? getNext(state) : state)
      .filter((state) => !seen.has(getKey(state)))
      .sort((a, b) => heuristic(a, b));
    //if (i % 100 === 0) {
    //console.log(print(next[0]), next.length, i);
  //}
  }
  //console.log(seen);
  //next.forEach((state) => console.log(print(state)));

  if (isOver(next[0])) {
    return next[0];
  }
  return next;
};

export {
  getNext,
  print,
  isOver,
  solve,
};
