import { Toast } from 'native-base'

export function toLoggable(obj: {}): string {
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
