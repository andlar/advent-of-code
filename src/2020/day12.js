const turn = (facing, direction, degrees) => {
    let turns = degrees / 90;
    let directions = ['N', 'E', 'S', 'W'];
    let start = directions.indexOf(facing);
    let ret;
    if (direction === 'R') {
        ret = directions[(start + turns + 4) % 4];
    } else {
        ret = directions[(start - turns + 4) % 4];
    }
    //console.log({facing, direction, degrees, turns, start, ret});
    return ret;
}

const move = (state, movement) => {
    let next = {...state};
    let mvt = movement.charAt(0);
    let dis = parseInt(movement.substring(1), 10);
    switch (mvt) {
    case 'F':
        switch (state.dir) {
        case 'E': next.x += dis; break;
        case 'W': next.x -= dis; break;
        case 'N': next.y += dis; break;
        case 'S': next.y -= dis; break;
            // no default
        }
        break;
    case 'E': next.x += dis; break;
    case 'W': next.x -= dis; break;
    case 'N': next.y += dis; break;
    case 'S': next.y -= dis; break;
    case 'R':
    case 'L': next.dir = turn(state.dir, mvt, dis); break;
        //no default
    }
    return next;
};

const rotateWaypoint = (x, y, direction, degrees) => {
    let turns = degrees / 90;
    if (turns === 2) {
        return {wpx: x * -1, wpy: y * -1};
    }
    if ((turns === 1 && direction === 'R') || (turns === 3 && direction === 'L')) {
        return {wpx: y, wpy: x * -1};
    }
    if ((turns === 3 && direction === 'R') || (turns === 1 && direction === 'L')) {
        return {wpx: y * -1, wpy: x};
    }
}

const navigate = (state, step) => {
    let next = {...state};
    let mvt = step.charAt(0);
    let dis = parseInt(step.substring(1), 10);
    switch (mvt) {
    case 'F':
        next.x += dis * state.wpx;
        next.y += dis * state.wpy;
        break;
    case 'E': next.wpx += dis; break;
    case 'W': next.wpx -= dis; break;
    case 'N': next.wpy += dis; break;
    case 'S': next.wpy -= dis; break;
    case 'R':
    case 'L':
        let nextWp = rotateWaypoint(state.wpx, state.wpy, mvt, dis);
        next.wpx = nextWp.wpx;
        next.wpy = nextWp.wpy;
        break;
        //no default
    }
    return next;
};

const travel = (start, steps) => {
    let state = {...start};
    steps.forEach(step => state = move(state, step))
    return state;
}

const followWaypoints = (start, steps) => {
    let state = {...start};
    steps.forEach(step => state = navigate(state, step))
    return state;
}

const getDistance = state => Math.abs(state.x) + Math.abs(state.y);

export { move, travel, navigate, followWaypoints, getDistance };
