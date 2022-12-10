import {
  getPosition,
  getRegisterValue,
  getTotalStrength,
  getPixel,
  drawRow,
  drawAllRows,
} from './src';
import { mock, mock2, real } from './data';

describe('when following instructions', () => {
  let sum;
  it('should sum up the commands until the cycle count is reached', () => {
    sum = getPosition(mock, 1);
    expect(sum).toBe(1);
    sum = getPosition(mock, 2);
    expect(sum).toBe(1);
    sum = getPosition(mock, 3);
    expect(sum).toBe(4);
    sum = getPosition(mock, 4);
    expect(sum).toBe(4);
    sum = getPosition(mock, 5);
    expect(sum).toBe(-1);
  });

  it('should get register values', () => {
    sum = getRegisterValue(mock2, 20);
    expect(sum).toBe(420);
    sum = getRegisterValue(mock2, 60);
    expect(sum).toBe(1140);
    sum = getRegisterValue(mock2, 100);
    expect(sum).toBe(1800);
    sum = getRegisterValue(mock2, 140);
    expect(sum).toBe(2940);
    sum = getRegisterValue(mock2, 180);
    expect(sum).toBe(2880);
    sum = getRegisterValue(mock2, 220);
    expect(sum).toBe(3960);
  });

  it('should find the total strength', () => {
    const total = getTotalStrength(mock2);
    expect(total).toBe(13140);
  });

  it('should find the total strength of real data', () => {
    const total = getTotalStrength(real);
    expect(total).toBe(14240);
  });
});

describe('drawing stuff', () => {
  it('should get the first row of pixels', () => {
    expect(getPixel(mock2, 0)).toBe('#');
    expect(getPixel(mock2, 1)).toBe('#');
    expect(getPixel(mock2, 2)).toBe(' ');
    expect(getPixel(mock2, 3)).toBe(' ');
    expect(getPixel(mock2, 4)).toBe('#');
    expect(getPixel(mock2, 5)).toBe('#');
    expect(getPixel(mock2, 6)).toBe(' ');
    expect(getPixel(mock2, 7)).toBe(' ');
    expect(getPixel(mock2, 32)).toBe('#');
    expect(getPixel(mock2, 33)).toBe('#');
    expect(getPixel(mock2, 34)).toBe(' ');
    expect(getPixel(mock2, 35)).toBe(' ');
    expect(getPixel(mock2, 36)).toBe('#');
    expect(getPixel(mock2, 37)).toBe('#');
    expect(getPixel(mock2, 38)).toBe(' ');
    expect(getPixel(mock2, 39)).toBe(' ');
  });

  it('should get the second row of pixels', () => {
    expect(getPixel(mock2, 40)).toBe('#');
    expect(getPixel(mock2, 41)).toBe('#');
    expect(getPixel(mock2, 42)).toBe('#');
    expect(getPixel(mock2, 43)).toBe(' ');
    expect(getPixel(mock2, 44)).toBe(' ');
    expect(getPixel(mock2, 45)).toBe(' ');
    expect(getPixel(mock2, 46)).toBe('#');
    expect(getPixel(mock2, 47)).toBe('#');
    expect(getPixel(mock2, 72)).toBe('#');
    expect(getPixel(mock2, 73)).toBe(' ');
    expect(getPixel(mock2, 74)).toBe(' ');
    expect(getPixel(mock2, 75)).toBe(' ');
    expect(getPixel(mock2, 76)).toBe('#');
    expect(getPixel(mock2, 77)).toBe('#');
    expect(getPixel(mock2, 78)).toBe('#');
    expect(getPixel(mock2, 79)).toBe(' ');
  });

  it('should draw the third row of pixels', () => {
    const row = drawRow(mock2, 2);
    expect(row).toBe('####    ####    ####    ####    ####    ');
  });

  it('should draw all rows of pixels', () => {
    const rows = drawAllRows(mock2);
    console.log(rows);
    expect(rows).toBe(`##  ##  ##  ##  ##  ##  ##  ##  ##  ##  
###   ###   ###   ###   ###   ###   ### 
####    ####    ####    ####    ####    
#####     #####     #####     #####     
######      ######      ######      ####
#######       #######       #######     `);
  });

  it('should draw all rows of real pixels', () => {
    const rows = drawAllRows(real);
    console.log(rows);
    expect(rows).toBe(`###  #    #  # #    #  # ###  #### #  # 
#  # #    #  # #    # #  #  #    # #  # 
#  # #    #  # #    ##   ###    #  #### 
###  #    #  # #    # #  #  #  #   #  # 
#    #    #  # #    # #  #  # #    #  # 
#    ####  ##  #### #  # ###  #### #  # `);
  });
});
