import { LinkingOptions } from '@react-navigation/native'

import { loadAppExtra } from '@/utils/expo'

import config from './config'
import { RootStackParamList } from '../../core/App/Root/Stack'

const navigationLinking: LinkingOptions<RootStackParamList> = {
    prefixes: [
        loadAppExtra().APP_URL,
        loadAppExtra().FIREBASE_AUTH_URL,
        `${loadAppExtra().APP_SCHEME}://`
    ],
    config
}

export default navigationLinking
