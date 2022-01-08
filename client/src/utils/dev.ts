import { waitFor } from '@testing-library/react-native'
import { Toast } from 'native-base'

export function toLoggable(obj: any): string {
    switch (typeof obj) {
        case 'object':
            return JSON.stringify(obj, undefined, 4)
        case 'string':
            return obj
        default:
            return String(obj)
    }
}

export function logWithToast(obj: {}, title: string = 'ToastLog') {
    Toast.show({
        title,
        description: toLoggable(obj),
        variant: 'subtle',
        duration: null
    })
}

export const repeatedDebug = (debug: () => void) =>
    waitFor(
        () => {
            debug()
            return Promise.reject()
        },
        { timeout: 500, interval: 100 }
    )
