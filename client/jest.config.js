module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: [
        '@testing-library/jest-native/extend-expect',
        './src/jest.setup.js'
    ],
    restoreMocks: true,
    testEnvironment: 'jsdom'
}
