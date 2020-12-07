const parseRules = rules => {
    let ret = {};
    rules.forEach(rule => {
        let key = rule.split('bags contain')[0].trim();
        ret[key] = [];
        if (!rule.includes('no other bags')) {
            rule.split('bags contain')[1].split(',').forEach(out => {
                let cnt = parseInt(out.trim(), 10);
                let bag = out.trim().split(' ')[1] + ' ' + out.trim().split(' ')[2];
                for (let i = 0; i < cnt; i++) {
                    ret[key].push(bag);
                }
            });
        }
    })
    return ret;
}

const canContain = (container, bag, rules) => {
    let cache = {};
    const helper = (container, bag, rules) => {
        if (cache[container] !== undefined) {
            return cache[container];
        }
        if (rules[container].length === 0) {
            cache[container] = false;
        } else if (rules[container].find(r => r === bag)) {
            cache[container] = true;
        } else {
            cache[container] = rules[container].reduce((can, nextContainer) => {
                return can || helper(nextContainer, bag, rules);
            }, false);
        }
        return cache[container];
    }
    return helper(container, bag, rules);
}

const countBags = (bag, rules) => {
    let cache = {};
    const helper = (bag, rules) => {
        if (cache[bag] !== undefined) {
            return cache[bag];
        }
        if (rules[bag].length === 0) {
            cache[bag] = 1;
        } else {
            cache[bag] = rules[bag].reduce((sum, nextBag) => {
                return sum + helper(nextBag, rules);
            }, 1);
        }
        return cache[bag];
    }
    return helper(bag, rules) - 1;
}

const howManyCanContain = (bag, rules) => Object.keys(rules).filter(rule => canContain(rule, bag, rules)).length;

export { canContain, parseRules, howManyCanContain, countBags };
