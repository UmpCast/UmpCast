module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: [
        '@testing-library/jest-native/extend-expect',
        './src/jest.setup.ts'
    ],
    restoreMocks: true,
    testEnvironment: 'jsdom'
}
