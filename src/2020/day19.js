const parseRules = input => {
    let rules = new Map();
    input.forEach(line => {
        let key = line.split(': ')[0];
        let val = line.split(': ')[1];
        rules.set(key, val);
    });
    return rules;
}

const checkMessage = (rules, message, key = '0') => {
    let ret = {
        message: message,
        valid: false,
    }
    return message;
}

export { parseRules, checkMessage };
