module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\.jsx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
    },
  },
};
