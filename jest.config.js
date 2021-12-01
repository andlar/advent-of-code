// jest.config.js
const {defaults} = require('jest-config');
module.exports = {
  testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, 'test/2019'],
  moduleDirectories: ['src', 'test', 'resources', 'node_modules'],
};
