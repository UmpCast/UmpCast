import { waitFor, WaitForOptions } from '@testing-library/react-native'

export const defaultWaitForOptions = { timeout: 4500, interval: 50 }

export default function waitForDefault(
    expectation: () => void,
    options: WaitForOptions | null = null
) {
    return waitFor(expectation, { ...defaultWaitForOptions, ...options })
}
