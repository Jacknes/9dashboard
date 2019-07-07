module.exports = {
    setupFiles: ['./tests/setup'],
    setupFilesAfterEnv: ['react-testing-library/cleanup-after-each'],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    moduleNameMapper: {
        'src(.*)$': '<rootDir>/src/$1',
    },
    moduleDirectories: ['node_modules', 'tests'],
    transform: {
        '^.+\\.(jsx?|tsx?)$': 'babel-jest',
    },
    testRegex: 'test\\.(js|ts|tsx)$',
    coveragePathIgnorePatterns: ['/node_modules/', '/tests/setup.js'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testURL: 'http://localhost/',
};
