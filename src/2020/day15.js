const startGame = input => {
    let game = {
        turns: input.map((i, idx) => ({val: i, turn: idx + 1, used:0})),
        lastTurn: input.length,
    };
    return game;
};

const takeTurn = game => {
    let nextTurn = {
        turns: [...game.turns],
        lastTurn: game.lastTurn + 1,
    }
    let next = {
        val: undefined,
        turn: game.lastTurn + 1,
        used: 0,
    };
    let last = game.turns.find(t => t.turn === game.lastTurn);
    let prev = game.turns.find(t => (t.val === last.val) && (t.turn !== game.lastTurn));
    if (!prev) {
        next.val = 0;
    } else {
        next.val = game.lastTurn - prev.turn;
    }
    nextTurn.turns = nextTurn.turns.map(t => {
        if (t.val === next.val) {
            t.used += 1;
        }
        return t;
    }).filter(t => t.used < 2).concat(next);
    return nextTurn;
}

const getTurn = (game, turn) => {
    while (game.lastTurn <= turn) {
        game = takeTurn(game);
    }
    return game.turns.find(t => t.turn === turn).val;
}

export { startGame, getTurn };
