import mswDB from './msw/mswDB'
import { mswServer } from './msw/mswServer'
import { drop } from '@mswjs/data'
import faker from 'faker'

const originalError = console.error.bind(console.error)

beforeEach(() =>
    jest
        .spyOn(console, 'error')
        .mockImplementation(
            (msg) =>
                !msg
                    .toString()
                    .includes(
                        'Warning: You called act(async () => ...) without await.'
                    ) && originalError(msg)
        )
)

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

faker.seed(12345)
afterEach(() => drop(mswDB))
