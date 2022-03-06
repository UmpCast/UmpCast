import { LinkingOptions } from '@react-navigation/native'

import { RootStackParamList } from '@/core/App/Root/Stack'
import { loadAppExtra } from '@/utils/expo'

import config from './config'

const NavigationLinking: LinkingOptions<RootStackParamList> = {
    prefixes: [
        loadAppExtra().APP_URL,
        loadAppExtra().FIREBASE_AUTH_URL,
        `${loadAppExtra().APP_SCHEME}://`
    ],
    config
}

export default NavigationLinking
