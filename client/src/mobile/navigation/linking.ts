import { LinkingOptions } from '@react-navigation/native'

import { RootStackParamList } from './navigators/Root/Stack'
import navigationPathMap from './pathMap'

const navigationLinking: LinkingOptions<RootStackParamList> = {
    prefixes: [],
    config: {
        screens: navigationPathMap
    }
}

export default navigationLinking
