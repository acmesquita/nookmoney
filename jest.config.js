/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/config/singleton.ts'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/app/$1',
    '~tests/(.*)': '<rootDir>/tests/$1',
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/app/**/*.{ts,tsx}'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/app/config'
  ]
}
