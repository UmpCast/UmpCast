import { waitFor } from '@testing-library/react-native'

export const repeatedDebug = (debug: () => void) =>
    waitFor(
        () => {
            debug()
            return Promise.reject()
        },
        { timeout: 500, interval: 100 }
    )
