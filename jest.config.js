/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/config/singleton.ts'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/app/$1',
    '~tests/(.*)': '<rootDir>/tests/$1'
  },
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/app/**/*.{ts,tsx}'],
}
