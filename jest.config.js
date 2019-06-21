module.exports = {
    testEnvironment: 'node',
    //preset: '@shelf/jest-mongodb',
    // Exit the test suite immediately upon the first failing test suite
    bail: false,
    // Each individual test should be reported during the run
    verbose: true,
    setupFilesAfterEnv: ['jest-extended'],
    testPathIgnorePatterns: ['/node_modules/', './test/lib/*', './test/helpers/*'],
    testMatch: ['<rootDir>/test/!(helpers|data)/?(*.)+(spec|test).js?(x)']
   };