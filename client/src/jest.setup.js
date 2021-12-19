// @ts-nocheck

const { mswServer } = require('./msw/mswServer')

global.self = global
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

jest.mock('@react-native-async-storage/async-storage', () => ({
    __esModule: true,
    default: {
        getItem: jest.fn(),
        removeItem: jest.fn()
    }
}))

beforeAll(() => mswServer.listen())
afterEach(() => mswServer.resetHandlers())
afterAll(() => mswServer.close())
