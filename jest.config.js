/* 
module.exports = {
    coverageDirectory: 'coverage',
    testEnvironment: 'node'
} */
module.exports = {
    coverageDirectory: 'coverage',
    testMatch: ['**/*.(spec|test).ts'],
    testEnvironment: 'node',
    collectCoverageFrom: ['**/src/**/*.ts', '!**/src/main/**'],
    preset: '@shelf/jest-mongodb',
    transform: {
      '^.+\\.ts$': 'ts-jest'
    }
  }