import { drop } from '@mswjs/data'
import faker from 'faker'
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

beforeAll(() => mswServer.listen())
afterEach(() => mswServer.resetHandlers())
afterAll(() => mswServer.close())

faker.seed(12345)
afterEach(() => drop(mswDB))
