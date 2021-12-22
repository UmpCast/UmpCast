import { drop } from '@mswjs/data'
import faker from 'faker'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'
import mswDB from './mock/msw/mswDB'
import { mswServer } from './mock/msw/mswServer'

/* eslint-disable */
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
/* eslint-enable */

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

beforeAll(() => mswServer.listen())
afterEach(() => mswServer.resetHandlers())
afterAll(() => mswServer.close())

faker.seed(12345)

// @ts-ignore
afterEach(() => drop(mswDB))
