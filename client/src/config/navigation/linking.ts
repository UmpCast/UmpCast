import { LinkingOptions } from '@react-navigation/native'

import { loadAppExtra } from '@/utils/expo'

import { AppRootStackParamList } from '../../core/App/Root/Stack'

import config from './config'

const navigationLinking: LinkingOptions<AppRootStackParamList> = {
    prefixes: [
        loadAppExtra().APP_URL,
        loadAppExtra().FIREBASE_AUTH_URL,
        `${loadAppExtra().APP_SCHEME}://`
    ],
    config
}

export default navigationLinking
