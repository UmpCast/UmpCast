import { LinkingOptions } from '@react-navigation/native'

import { TabsStackParamList } from './navigators/TabsStack/types'
import navigationPathMap from './pathMap'

const navigationLinking: LinkingOptions<TabsStackParamList> = {
    prefixes: [],
    config: {
        screens: navigationPathMap
    }
}

export default navigationLinking
