import { LinkingOptions } from '@react-navigation/native'

import { TabsStackParamList } from './types'
import navigationPathMap from './pathMap'

const navigationLinking: LinkingOptions<TabsStackParamList> = {
    prefixes: [],
    config: {
        screens: navigationPathMap
    }
}

export default navigationLinking
