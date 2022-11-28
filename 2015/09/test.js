import {
  interpretRow,
  interpretInput,
  buildRoutes,
  calculateCost,
  findRoute,
} from './src';
import { mock, real } from './data';

describe('when parsing', () => {
  it('should interpret a row', () => {
    const [key, distance, locations] = interpretRow(mock[0]);
    expect(key).toBe('Dublin.London');
    expect(distance).toBe(464);
    expect(locations).toEqual(new Set(['Dublin', 'London']));
  });

  it('should interpret all the rows', () => {
    const [distances, locations] = interpretInput(mock);
    expect(distances).toEqual({
      'Dublin.London': 464,
      'Belfast.London': 518,
      'Belfast.Dublin': 141,
    });
    expect(locations).toEqual(new Set(['Dublin', 'London', 'Belfast']));
  });

  it('should interpret all the rows of real data', () => {
    const [distances, locations] = interpretInput(real);
    expect(locations).toEqual(new Set(['AlphaCentauri', 'Arbre', 'Faerun', 'Norrath', 'Snowdin', 'Straylight', 'Tambi', 'Tristram']));
  });
});

describe('when working with routes', () => {
  it('should build the list of routes from a set', () => {
    const [, locations] = interpretInput(mock);
    const routes = buildRoutes(locations);
    expect(routes.length).toBe(6);
    expect(routes.includes('Dublin.London.Belfast')).toBe(true);
    expect(routes.includes('fake.foo.bar')).toBe(false);
  });

  it('should calculate the cost of a route', () => {
    const [distances,] = interpretInput(mock);
    expect(calculateCost(distances, 'London.Dublin.Belfast')).toBe(605);
    expect(calculateCost(distances, 'London.Belfast.Dublin')).toBe(659);
    expect(calculateCost(distances, 'Dublin.London.Belfast')).toBe(982);
    expect(calculateCost(distances, 'Dublin.Belfast.London')).toBe(659);
    expect(calculateCost(distances, 'Belfast.London.Dublin')).toBe(982);
    expect(calculateCost(distances, 'Belfast.Dublin.London')).toBe(605);
  });

  it('should find the shortest route', () => {
    expect(findRoute(mock)).toBe(605);
  });

  it('should find the shortest route on real data', () => {
    expect(findRoute(real)).toBe(117);
  });

  it('should find the longest route', () => {
    expect(findRoute(mock, false)).toBe(982);
  });

  it('should find the longest route on real data', () => {
    expect(findRoute(real, false)).toBe(909);
  });
});
