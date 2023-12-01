import {
  findCalibrationValue,
  findTextCalibrationValue,
  findTotalCalibration,
} from './src';
import { mock, mock2, mock3, real } from './data';

describe('when parsing', () => {
  it('should find the calibration value of a line', () => {
    expect(findCalibrationValue(mock[0])).toBe(12);
    expect(findCalibrationValue(mock[1])).toBe(38);
    expect(findCalibrationValue(mock[2])).toBe(15);
    expect(findCalibrationValue(mock[3])).toBe(77);
  });

  it('should find the total calibration value', () => {
    expect(findTotalCalibration(mock)).toBe(142);
  });

  it('should find the total calibration value of real data', () => {
    expect(findTotalCalibration(real)).toBe(54877);
  });

  it('should find the calibration value of a line with text digits', () => {
    expect(findTextCalibrationValue(mock2[0])).toBe(29);
    expect(findTextCalibrationValue(mock2[1])).toBe(83);
    expect(findTextCalibrationValue(mock2[2])).toBe(13);
    expect(findTextCalibrationValue(mock2[3])).toBe(24);
    expect(findTextCalibrationValue(mock2[4])).toBe(42);
    expect(findTextCalibrationValue(mock2[5])).toBe(14);
    expect(findTextCalibrationValue(mock2[6])).toBe(76);
  });

  it('should find the calibration value of a line with text digits', () => {
    expect(findTextCalibrationValue(mock3[0])).toBe(18);
    expect(findTextCalibrationValue(mock3[1])).toBe(79);
    expect(findTextCalibrationValue(mock3[2])).toBe(33);
  });

  it('should find the total calibration value with digits', () => {
    expect(findTotalCalibration(mock2, findTextCalibrationValue)).toBe(281);
  });

  it('should find the total calibration value with digits and real data', () => {
    //expect(findTotalCalibration(real, findTextCalibrationValue)).toBe(54010); // too low
    expect(findTotalCalibration(real, findTextCalibrationValue)).toBe(54100);
  });
});
