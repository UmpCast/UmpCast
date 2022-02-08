import { loadAppExtra } from '@/utils/expo'
import { navigationConfig } from './config'

export const navigationLinking = {
    prefixes: [
        loadAppExtra().APP_URL,
        loadAppExtra().FIREBASE_AUTH_URL,
        `${loadAppExtra().APP_SCHEME}://`
    ],
    config: navigationConfig
}
