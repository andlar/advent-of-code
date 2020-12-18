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
            result += parseInt(vals[i+1], 10);
        } else {
            result *= parseInt(vals[i+1], 10);
        }
    }
    return result;
}

const doDifferentlyBadMath = expression => {
    if (expression.charAt(0) === '(') {
        expression = expression.substring(1);
    }
    if (expression.charAt(expression.length - 1) === ')') {
        expression = expression.substring(0, expression.length - 1);
    }
    let vals = expression.split(' ');
    while (vals.includes('+')) {
        let idx = vals.findIndex(e => e === '+');
        vals[idx - 1] = parseInt(vals[idx - 1], 10) + parseInt(vals[idx + 1], 10);
        vals.splice(idx, 2);
    }
    let result = parseInt(vals[0], 10);
    for (let i = 1; i < vals.length; i += 2) {
        result *= parseInt(vals[i+1], 10);
    }
    return result;
}

const extract = (expression, math = doBadMath) => {
    let regex = /\([^\(]+?\)/;
    return expression.replace(regex, math);
}

const solve = (expression, math = doBadMath) => {
    while (expression.indexOf('(') >= 0) {
        expression = extract(expression, math);
    }
    return math(expression);
}

export { doBadMath, doDifferentlyBadMath, extract, solve };
