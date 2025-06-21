// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@utils/(.*)$': '<rootDir>/src/utils/$1'
  }
};
