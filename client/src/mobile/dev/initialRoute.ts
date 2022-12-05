import { NavRoute } from '../navigation/routes'

export default [
    {
        name: NavRoute.Home_,
        state: {
            routes: [
                {
                    name: NavRoute.Home
                },
                {
                    name: NavRoute.Season,
                    params: {
                        seasonId: 1
                    }
                },
                {
                    name: NavRoute.SeasonCalendar,
                    params: {
                        seasonId: 1
                    }
                }
            ]
        }
    }
]
