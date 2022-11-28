import {
  interpretRow,
  interpretInput,
  buildArrangements,
  calculateHappiness,
  findArrangement,
  addMe,
} from './src';
import { mock, real } from './data';

describe('when parsing', () => {
  it('should interpret a row', () => {
    const [key, value, people] = interpretRow(mock[0]);
    expect(key).toBe('Alice.Bob');
    expect(value).toBe(54);
    expect(people).toEqual(new Set(['Alice', 'Bob']));
  });

  it('should interpret all the rows', () => {
    const [values, people] = interpretInput(mock);
    expect(values['Alice.Bob']).toBe(54 + 83);
    expect(values['Alice.Carol']).toBe(-79 + -62);
    expect(values['Alice.David']).toBe(-2 + 46);
    expect(people).toEqual(new Set(['Alice', 'Bob', 'Carol', 'David']));
  });

  it('should interpret all the rows of real data', () => {
    const [values, people] = interpretInput(real);
    expect(people).toEqual(new Set(['Alice', 'Bob', 'Carol', 'David', 'Eric', 'Frank', 'George', 'Mallory']));
  });
});

describe('when working with seating', () => {
  it('should build the list of arrangements from a set', () => {
    const [, people] = interpretInput(mock);
    const arrangements = buildArrangements(people);
    expect(arrangements.length).toBe(24);
    expect(arrangements.includes('Alice.Bob.Carol.David')).toBe(true);
    expect(arrangements.includes('fake.foo.bar.baz')).toBe(false);
  });

  it('should calculate the happiness of an arrangement', () => {
    const [values,] = interpretInput(mock);
    expect(calculateHappiness(values, 'David.Alice.Bob.Carol')).toBe(44 + 137 + 53 + 96);
  });

  it('should find the greatest happiness', () => {
    expect(findArrangement(mock)).toBe(330);
  });

  it('should find the greatest happiness on real data', () => {
    expect(findArrangement(real)).toBe(733);
  });
});

describe('when adding me', () => {
  it('should insert me to the data', () => {
    const [values, people] = addMe(interpretInput(mock));
    expect(values['Alice.ZZZMe']).toBe(0);
    expect(people.has('ZZZMe')).toBe(true);
  });

  it('should insert me into the arrangements', () => {
    const [, people] = addMe(interpretInput(mock));
    const arrangements = buildArrangements(people);
    expect(arrangements.length).toBe(120);
    expect(arrangements.includes('Alice.Bob.Carol.David.ZZZMe')).toBe(true);
  });

  it('should find the greatest happiness on real data when "me" is there', () => {
    expect(findArrangement([...real], true)).toBe(725);
  });
});
