import BaseClient from 'apollo/baseClient'

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    ...jest.requireActual('react-native/Libraries/Utilities/Platform'),
    OS: 'Web'
}))

beforeEach(() => {
    BaseClient().clearStore()
})
