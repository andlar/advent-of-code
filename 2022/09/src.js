const isTouching = (hx, hy, tx, ty) => Math.abs(hx - tx) <= 1 && Math.abs(hy - ty) <= 1;

const isOrthogonal = (hx, hy, tx, ty) => hx === tx || hy === ty;

const moveHead = (head, dir) => {
  let [hx, hy] = head.split(':').map((v) => parseInt(v, 10));
  switch (dir) {
    case 'U': hy += 1; break;
    case 'R': hx += 1; break;
    case 'D': hy -= 1; break;
    case 'L': hx -= 1; break;
  };
  return [hx, hy];
};

const moveTail = (hx, hy, tail) => {
  let [tx, ty] = tail.split(':').map((v) => parseInt(v, 10));
  if (!isTouching(hx, hy, tx, ty)) {
    if (isOrthogonal(hx, hy, tx, ty)) {
      if (hx !== tx) { tx += (hx > tx ? 1 : -1) }
      if (hy !== ty) { ty += (hy > ty ? 1 : -1) }
    } else {
      tx += (hx > tx ? 1 : -1);
      ty += (hy > ty ? 1 : -1);
    }
  }
  return [tx, ty];
};

const move = (w, head, tail, dir) => {
  let world = [...w];
  const [hx, hy] = moveHead(head, dir);
  let tails = [];
  for (let i = 0; i < tail.length; i++) {
    if (i === 0) {
      tails = tails.concat(moveTail(hx, hy, tail[0]).join(':'));
    } else {
      const [px, py] = tails[i - 1].split(':').map((v) => parseInt(v, 10));
      tails = tails.concat(moveTail(px, py, tail[i]).join(':'));
    }
  };
  return [new Set(world.concat(tails.slice(-1))), `${hx}:${hy}`, tails];
};

const followInstruction = (w, h, t, ins) => {
  const [dir, steps] = ins.split(' ');
  let size = parseInt(steps, 10);
  let world = w, head = h, tail = t;
  for (let i = 0; i < size; i++) {
    [world, head, tail] = move(world, head, tail, dir);
  }
  return [world, head, tail];
};

const followAllInstructions = (instructions, size = 1) => {
  let world = new Set(['0:0']);
  let head = '0:0';
  let tail = Array(size).fill('0:0');
  instructions.forEach((ins) => {
    [world, head, tail] = followInstruction(world, head, tail, ins);
  });
  return [world, head, tail];
};

export {
  move,
  followInstruction,
  followAllInstructions,
};
