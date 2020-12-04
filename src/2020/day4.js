const validPassport = passport => {
    let has8 = passport.split(' ').length === 8;
    let has7 = passport.split(' ').length === 7;
    let hasCid = passport.indexOf('cid:') > 0;
    return has8 || (has7 && !hasCid);
};

const validPassports = passports => passports.filter(p => validPassport(p)).length;

const tokenize = passport => passport.split(' ');

const isValidField = field => {
    let dat = field.split(':')[0];
    let val = field.split(':')[1];
    let regex;
    switch (dat) {
    case 'byr':
        return parseInt(val, 10) <= 2002 && parseInt(val, 10) >= 1920;
    case 'ecl':
        return ['amb','blu','brn','grn','gry','hzl','oth'].indexOf(val) >= 0;
    case 'eyr':
        return parseInt(val, 10) <= 2030 && parseInt(val, 10) >= 2020;
    case 'hgt':
        let h = parseInt(val, 10);
        switch (val.substring(val.length - 2)) {
        case 'in':
            return h <= 76 && h >= 59;
        case 'cm':
            return h <= 193 && h >= 150;
        }
    case 'hcl':
        regex = RegExp(/^#[a-f0-9]{6}$/);
        return regex.test(val);
    case 'iyr':
        return parseInt(val, 10) <= 2020 && parseInt(val, 10) >= 2010;
    case 'pid':
        regex = RegExp(/^[0-9]{9}$/);
        return regex.test(val);
    case 'cid':
        return true;
    default:
        return false;
    }
}

const isValidPassport = passport => tokenize(passport).reduce((acc, f) => acc && isValidField(f), validPassport(passport));

const countValidPassports = passports => passports.filter(p => isValidPassport(p)).length;

export { validPassport, validPassports, tokenize, isValidField, isValidPassport, countValidPassports };
