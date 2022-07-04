import { LinkingOptions } from '@react-navigation/native'

import { loadAppExtra } from '@/utils/expo'

import { RootStackParamList } from './navigators/Root/Stack'
import navigationPathMap from './pathMap'

const navigationLinking: LinkingOptions<RootStackParamList> = {
    prefixes: [
        loadAppExtra().APP_URL,
        loadAppExtra().FIREBASE_AUTH_URL,
        `${loadAppExtra().APP_SCHEME}://`
    ],
    config: {
        screens: navigationPathMap
    }
}

export default navigationLinking
