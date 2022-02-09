import { loadAppExtra } from '@/utils/expo'
import config from './config'

const NavigationLinking = {
    prefixes: [
        loadAppExtra().APP_URL,
        loadAppExtra().FIREBASE_AUTH_URL,
        `${loadAppExtra().APP_SCHEME}://`
    ],
    config
}

export default NavigationLinking
