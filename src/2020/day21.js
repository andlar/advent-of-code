const getAllergens = foods => {
    let allergens = new Map();
    foods.forEach(food => {
        let alls = food.substring(0, food.length - 1).split('contains ')[1].split(', ');
        let ingredients = food.split(' (contains')[0].split(' ');
        alls.forEach(a => {
            if (!allergens.has(a)) {
                allergens.set(a, new Set());
                ingredients.forEach(i => allergens.get(a).add(i));
            } else {
                allergens.get(a).forEach(f => {
                    if (ingredients.indexOf(f) === -1) {
                        allergens.get(a).delete(f);
                    }
                });
            }
        });
    });
    return allergens;
}

const getIngredients = foods => {
    let ingredients = [];
    foods.forEach(food => food.split(' (contains')[0].split(' ').forEach(i => ingredients.push(i)));
    return ingredients;
}

const getAllergenFree = (allergens, ingredients) => {
    return ingredients.filter(i => {
        let safe = true;
        allergens.forEach(value => {
            safe = safe && !value.has(i);
        });
        return safe;
    })
}

export { getAllergens, getIngredients, getAllergenFree };
