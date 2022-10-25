/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/tests/config/setupTests.ts'
  ],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/app/$1',
    '~tests/(.*)': '<rootDir>/tests/$1',
    '\\.css$': 'identity-obj-proxy'
  },
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/app/**/*.{ts,tsx}'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', {
      jsc: {
        transform: {
          react: {
            runtime: 'automatic',
          },
        },
      },
    },],
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/app/config'
  ]
}
