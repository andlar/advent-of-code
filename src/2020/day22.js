const play = cards => {
    while (cards.a.length > 0 && cards.b.length > 0) {
        if (cards.a[0] > cards.b[0]) {
            cards.a.push(cards.a[0]);
            cards.a.push(cards.b[0]);
        } else {
            cards.b.push(cards.b[0]);
            cards.b.push(cards.a[0]);
        }
        cards.a.shift();
        cards.b.shift();
    }
    return cards;
};

const getScore = game => {
    if (game.a.length > 0) {
        return game.a.reduce((sum, card, idx, array) => sum += (array.length - idx) * card, 0);
    }
    return game.b.reduce((sum, card, idx, array) => sum += (array.length - idx) * card, 0);
}

const recurse = cards => {
    let seen = [];
    let key;
    while (cards.a.length > 0 && cards.b.length > 0) {
        key = 'a' + cards.a.join(',') + 'b' + cards.b.join(',');
        if (seen.includes(key)) {
            return cards;
        }
        seen.push(key);
        if (cards.a.length >= cards.a[0] + 1 && cards.b.length >= cards.b[0] + 1) {
            let next = {
                a: cards.a.slice(1, cards.a[0] + 1),
                b: cards.b.slice(1, cards.b[0] + 1),
            }
            next = recurse(next);
            if (next.a.length > 0) {
                cards.a.push(cards.a[0]);
                cards.a.push(cards.b[0]);
            } else {
                cards.b.push(cards.b[0]);
                cards.b.push(cards.a[0]);
            }
        } else {
            if (cards.a[0] > cards.b[0]) {
                cards.a.push(cards.a[0]);
                cards.a.push(cards.b[0]);
            } else {
                cards.b.push(cards.b[0]);
                cards.b.push(cards.a[0]);
            }
        }
        cards.a.shift();
        cards.b.shift();
    }
    return cards;
}

export { play, getScore, recurse };
