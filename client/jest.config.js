module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: [
        '@testing-library/jest-native/extend-expect',
        './jest.setup.js'
    ],
    testEnvironment: 'jsdom'
}
