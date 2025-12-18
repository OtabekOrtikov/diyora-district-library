export default {
    transform: {},
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/tests'],
    moduleNameMapper: {
        '^../src/js/(.*)$': '<rootDir>/src/js/$1'
    }
};
