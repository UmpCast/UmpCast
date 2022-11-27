import { LinkingOptions } from '@react-navigation/native'

import navigationPathMap from './pathMap'
import { NavParamList } from './routes'

const navigationLinking: LinkingOptions<NavParamList> = {
    prefixes: [],
    config: {
        screens: navigationPathMap
    }
}

export default navigationLinking
