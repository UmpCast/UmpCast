import { LinkingOptions } from '@react-navigation/native'

import { RootStackParamList } from '@/core/AppRootStack'
import { loadAppExtra } from '@/utils/expo'

import config from './config'

const navigationLinking: LinkingOptions<RootStackParamList> = {
    prefixes: [
        loadAppExtra().APP_URL,
        loadAppExtra().FIREBASE_AUTH_URL,
        `${loadAppExtra().APP_SCHEME}://`
    ],
    config
}

export default navigationLinking
