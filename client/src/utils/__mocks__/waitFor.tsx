import { waitFor, WaitForOptions } from '@testing-library/react-native'

export const defaultWaitForOptions = { timeout: 4500, interval: 50 }

export default function waitForFixed(
    expectation: () => void,
    options: WaitForOptions | undefined = defaultWaitForOptions
) {
    return waitFor(expectation, options)
}
