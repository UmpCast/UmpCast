import faker from 'faker'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'

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

faker.seed(12345)
