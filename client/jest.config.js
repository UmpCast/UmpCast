export default {
    preset: 'jest-expo',
    setupFilesAfterEnv: [
        '@testing-library/jest-native/extend-expect',
        'src/jest.setup.tsx'
    ],
    testEnvironment: 'jsdom'
}
