const tokenize = passport => passport.split(' ');

const validPassport = passport => tokenize(passport).length === 8 || (tokenize(passport).length === 7 && passport.indexOf('cid:') === -1);

const validPassports = passports => passports.filter(p => validPassport(p)).length;

const isValidField = field => {
    let type = field.split(':')[0];
    let val = field.split(':')[1];
    let v = parseInt(val, 10);
    switch (type) {
    case 'cid': return true;
    case 'ecl': return ['amb','blu','brn','grn','gry','hzl','oth'].indexOf(val) >= 0;
    case 'byr': return 1920 <= v && v <= 2002;
    case 'eyr': return 2020 <= v && v <= 2030;
    case 'iyr': return 2010 <= v && v <= 2020;
    case 'hcl': return RegExp(/^#[a-f0-9]{6}$/).test(val);
    case 'pid': return RegExp(/^[0-9]{9}$/).test(val);
    case 'hgt': return (val.substring(val.length - 2) === 'in' || val.substring(val.length - 2) === 'cm') && (val.substring(val.length - 2) === 'in' ? (59 <= v && v <= 76) : (150 <= v && v <= 193));
    default: return false;
    }
}

const isValidPassport = passport => tokenize(passport).reduce((acc, f) => acc && isValidField(f), validPassport(passport));

const countValidPassports = passports => passports.filter(p => isValidPassport(p)).length;

export { tokenize, validPassport, validPassports, isValidField, isValidPassport, countValidPassports };
