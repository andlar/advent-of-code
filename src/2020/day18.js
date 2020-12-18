const doBadMath = expression => {
    if (expression.charAt(0) === '(') {
        expression = expression.substring(1);
    }
    if (expression.charAt(expression.length - 1) === ')') {
        expression = expression.substring(0, expression.length - 1);
    }
    let vals = expression.split(' ');
    let result = parseInt(vals[0], 10);
    for (let i = 1; i < vals.length; i += 2) {
        if (vals[i] === '+') {
            result += parseInt(vals[i+1], 0);
        } else {
            result *= parseInt(vals[i+1], 0);
        }
    }
    return result;
}

const extract = expression => {
    let regex = /\([^\(]+?\)/;
    return expression.replace(regex, doBadMath);
}

const solve = expression => {
    while (expression.indexOf('(') >= 0) {
        expression = extract(expression);
    }
    return doBadMath(expression);
}

export { doBadMath, extract, solve };
