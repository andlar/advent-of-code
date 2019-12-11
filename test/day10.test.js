import { parseChart, findVectors, generateVectorMap, findBestLocation, vaporize, laserSweep, sortLasers, findNextToVaporize, findNthToVaporize } from '../src/day10';
import { input, samples, vaporField } from './data/day10.data';

describe('day 10 tests', () => {
    describe('part 1', () => {
        it('should parse a chart', () => {
            let chart = parseChart(samples[0]);
            expect(chart).toEqual(['1:0','4:0','0:2','1:2','2:2','3:2','4:2','4:3','3:4','4:4']);
        });

        describe('given a chart', () => {
            let chart;
            beforeEach(() => {
                chart = ['1:0','4:0','0:2','1:2','2:2','3:2','4:2','4:3','3:4','4:4'];
            });

            it('should find vectors to points', () => {
                let origin = '0:0';
                let vectors = findVectors(origin, chart);
                expect(vectors['1:0']).toBe(true);
            });

            it('should create a vector map for all asteroids', () => {
                let vectorMap = generateVectorMap(chart);
                expect(vectorMap['3:4']).toEqual({
                    '-1:-2': true,
                    '1:-4': true,
                    '-3:-2': true,
                    '-1:-1': true,
                    '0:-1': true,
                    '1:-2': true,
                    '1:-1': true,
                    '1:0': true,
                });
            });

            it('should find the best location', () => {
                let vectorMap = generateVectorMap(chart);
                let bestLocation = findBestLocation(vectorMap);
                expect(bestLocation).toEqual({'3:4': 8});
            });
        });

        describe('with bigger samples', () => {
            it('should find 33', () => {
                let bestLocation = findBestLocation(generateVectorMap(parseChart(samples[1])));
                expect(bestLocation).toEqual({'5:8':33});
            });

            it('should find 35', () => {
                let bestLocation = findBestLocation(generateVectorMap(parseChart(samples[2])));
                expect(bestLocation).toEqual({'1:2':35});
            });

            it('should find 41', () => {
                let bestLocation = findBestLocation(generateVectorMap(parseChart(samples[3])));
                expect(bestLocation).toEqual({'6:3':41});
            });

            it('should find 210', () => {
                let bestLocation = findBestLocation(generateVectorMap(parseChart(samples[4])));
                expect(bestLocation).toEqual({'11:13':210});
            });
        });

        it('should solve', () => {
            let bestLocation = findBestLocation(generateVectorMap(parseChart(input)));
            expect(bestLocation).toEqual({'22:28':326});
        });
    });

    describe('part 2', () => {
        it('should vaporize an asteroid', () => {
            let chart = parseChart(vaporField);
            expect(chart.includes('8:1')).toBe(true);
            let nextChart = vaporize('8:3','0:-1', chart);
            expect(nextChart).not.toEqual(chart);
            expect(nextChart.includes('8:1')).toBe(false);
        });

        it('should vaporize many asteroids', () => {
            let origin = '8:3';
            let chart = parseChart(vaporField);
            let lasers = Object.keys(findVectors(origin, chart));
            let nextChart = laserSweep(origin, lasers, chart);
            expect(nextChart.length).toBe(6);
            lasers = Object.keys(findVectors(origin, nextChart));
            nextChart = laserSweep(origin, lasers, nextChart);
            expect(nextChart.length).toBe(1);
            lasers = Object.keys(findVectors(origin, nextChart));
            nextChart = laserSweep(origin, lasers, nextChart);
            expect(nextChart.length).toBe(0);
        });

        it('should sort lasers', () => {
            let lasers = ['0:-1','2:-1','1:-1','4:-1','1:0'];
            let sortedLasers = sortLasers(lasers);
            expect(sortedLasers).toEqual(['0:-1','1:-1','2:-1','4:-1','1:0']);
        });

        it('should sort other lasers', () => {
            let origin = '8:3';
            let chart = parseChart(vaporField);
            let lasers = Object.keys(findVectors(origin, chart));
            let sortedLasers = sortLasers(lasers);
            expect(sortedLasers.slice(0,9)).toEqual(['0:-1','1:-3','1:-2','2:-3','1:-1','3:-2','2:-1','3:-1','7:-2']);
        });

        it('should find the next to vaporize', () => {
            let origin = '8:3';
            let chart = parseChart(vaporField);
            let lasers = Object.keys(findVectors(origin, chart));
            let sortedLasers = sortLasers(lasers);
            let nextToGo = findNextToVaporize(origin, sortedLasers[0], chart);
            expect(nextToGo).toBe('8:1');
        });

        it('should find the nth to vaporize', () => {
            let origin = '8:3';
            let chart = parseChart(vaporField);
            let lasers = Object.keys(findVectors(origin, chart));
            let sortedLasers = sortLasers(lasers);
            let nextToGo = findNthToVaporize(origin, sortedLasers, 10, chart);
            expect(nextToGo).toBe('12:2');
        });

        it('should find the 200th to vaporize', () => {
            let origin = '11:13';
            let chart = parseChart(samples[4]);
            let lasers = Object.keys(findVectors(origin, chart));
            let sortedLasers = sortLasers(lasers);
            let nextToGo = findNthToVaporize(origin, sortedLasers, 200, chart);
            expect(nextToGo).toBe('8:2');
        });

        it('should solve', () => {
            let origin = '22:28';
            let chart = parseChart(input);
            let lasers = Object.keys(findVectors(origin, chart));
            let sortedLasers = sortLasers(lasers);
            let nextToGo = findNthToVaporize(origin, sortedLasers, 200, chart);
            expect(nextToGo).toBe('16:23');
        });
    });
});
