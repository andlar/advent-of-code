import {
  getFirstMarker,
} from './src';
import { mock, real } from './data';

describe('when looking for the marker', () => {
  it('should find the first packet', () => {
    const markers = mock.map((v) => getFirstMarker(v));
    expect(markers).toEqual([7, 5, 6, 10, 11]);
  });

  it('should find the first packet one in real data', () => {
    const marker = getFirstMarker(real);
    expect(marker).toBe(1175);
  });

  it('should find the first message one', () => {
    const markers = mock.map((v) => getFirstMarker(v, 14));
    expect(markers).toEqual([19, 23, 23, 29, 26]);
  });

  it('should find the first message one in real data', () => {
    const marker = getFirstMarker(real, 14);
    expect(marker).toBe(3217);
  });
});
