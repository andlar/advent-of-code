import { parseRules, checkMessage } from '../../src/2020/day19';
import { rules as ruleInput, messages } from '../../src/2020/data/day19';

let mock = `0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"`.split('\n');

describe('utility functions', () => {
    it('should parse rule input', () => {
        let rules = parseRules(mock);
        expect(rules.get('0')).toBe('4 1 5');
        expect(rules.get('4')).toBe('"a"');
    });

    xdescribe('when checking messages', () => {
        let rules;
        beforeEach(() => {
            rules = parseRules(mock);
        });

        fit('should have a valid leaf', () => {
            let message = 'a'
            expect(checkMessage(mock, message, '4').valid).toBe(true);
        });

        it('should have a valid "or"', () => {
            let message = 'aa'
            expect(checkMessage(mock, message, '2').valid).toBe(true);
        });

        it('should have a valid "or"', () => {
            let message = 'ab'
            expect(checkMessage(mock, message, '2').valid).toBe(false);
        });

        it('should check a complete message against rules', () => {
            let message = 'ababbb';
            expect(checkMessage(mock, message).valid).toBe(true);
        });
    });
});

xdescribe('solutions', () => {
    it('should check all the messages', () => {
        let valid = messages.filter(message => checkMessage(rules, message).valid);
        expect(valid.length).toEqual(3);
    });

    xit('should answer the 2nd homework questions', () => {
        let result = homework.reduce((sum, expression) => sum + solve(expression, doDifferentlyBadMath), 0);
        expect(result).toEqual(70518821989947);
    });
});
