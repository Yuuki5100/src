// jest.config.js
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jest-environment-jsdom',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: './src/tsconfig.json' }],
  },

  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: './tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@composite/(.*)$': '<rootDir>/src/components/composite/$1',
    '^@base/(.*)$': '<rootDir>/src/components/base/$1',
    '^@functional/(.*)$': '<rootDir>/src/components/functional/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@slices/(.*)$': '<rootDir>/src/slices/$1',
    '^@lang/(.*)$': '<rootDir>/src/lang/$1',
    '^next/router$': 'next-router-mock',
    '^next/navigation$': 'next-router-mock/next-navigation',
  },

  moduleDirectories: ['node_modules', 'src'],

  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.test.(ts|tsx)',
    '<rootDir>/src/__tests__/**/*.test.(ts|tsx)',
    '<rootDir>/src/**/*.test.(ts|tsx)',
  ],

  collectCoverage: true,

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],

  coverageReporters: ['html', 'text', 'json'],
  coverageDirectory: '<rootDir>/coverage',

  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: '<rootDir>/scripts/jest-report.html',
      },
    ],
  ],
};

export default createJestConfig(customJestConfig);
