module.exports = {
  preset: 'jest-puppeteer',
  globals: {
    URL: 'http://localhost:3000'
  },
  testMatch: ['**/src/**/*.test.js'],
  verbose: true
}
