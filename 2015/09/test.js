import {
  interpretRow,
  interpretInput,
} from './src';
import { mock, real } from './data';

describe('parsing', () => {
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
