import { PathConfigMap } from '@react-navigation/native'
import { NavParamList, NavRoute } from './routes'

const navigationPathMap: PathConfigMap<NavParamList> = {
    [NavRoute.Tabs_]: {
        path: NavRoute.Tabs_,
        screens: {
            [NavRoute.Home_]: {
                path: NavRoute.Home_,
                screens: NavRoute
            },
            [NavRoute.Search_]:{
                path: NavRoute.Search_,
                screens: NavRoute
            },
            [NavRoute.Account_]:{
                path: NavRoute.Account_,
                screens: NavRoute
            },
        }
    },
}

export default navigationPathMap
