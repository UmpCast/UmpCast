// @ts-nocheck

global.self = global
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

jest.mock('@react-native-async-storage/async-storage', () => ({
    __esModule: true,
    default: {
        getItem: jest.fn(),
        removeItem: jest.fn()
    }
}))

beforeEach(() => {
    jest.resetAllMocks()
})
