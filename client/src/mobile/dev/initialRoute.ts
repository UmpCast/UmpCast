import { TabsRoute } from '../navigation/navigators/Tabs/types'
import { TabsStackRoute } from '../navigation/navigators/TabsStack/types'

export default [
    {
        name: TabsRoute.Home,
        state: {
            routes: [
                {
                    name: TabsStackRoute.Home,
                },
                {
                    name: TabsStackRoute.Season,
                    params: {
                        seasonId: 1
                    }
                },
                {
                    name: TabsStackRoute.SeasonCalendar,
                    params: {
                        seasonId: 1
                    }
                }
            ]
        }
    }
]
