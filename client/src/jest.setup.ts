import { drop } from '@mswjs/data'
import mswDB from './msw/mswDB'
import { mswServer } from './msw/mswServer'

jest.mock('@react-native-async-storage/async-storage', () => ({
    __esModule: true,
    default: {
        getItem: jest.fn(),
        removeItem: jest.fn()
    }
}))

beforeAll(() => mswServer.listen())
afterEach(() => mswServer.resetHandlers())
afterEach(() => drop(mswDB))
afterAll(() => mswServer.close())
