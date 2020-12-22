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

export { play, getScore };
