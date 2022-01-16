module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: [
        '@testing-library/jest-native/extend-expect',
        './node_modules/react-native-gesture-handler/jestSetup.js',
        './src/jest.setup.ts'
    ],
    restoreMocks: true,
    testEnvironment: 'jsdom',
    coveragePathIgnorePatterns: ['tests']
}
