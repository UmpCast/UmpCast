import MaterialIcon from '@/components/MaterialIcon'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import TabsStackNavigator from '../TabsStack/Navigator'
import { TabsStackRoute } from '../TabsStack/types'

import { Tabs, TabsRoute } from './types'

function HomeStack() {
    return <TabsStackNavigator initialRoute={TabsStackRoute.Home} />
}

function SearchStack() {
    return <TabsStackNavigator initialRoute={TabsStackRoute.Search} />
}

function AccountStack() {
    return <TabsStackNavigator initialRoute={TabsStackRoute.Account} />
}

function isFullSizeRoute(route: string) {
    const routes: string[] = [
        TabsStackRoute.SeasonCalendar,
        TabsStackRoute.AddDivision,
        TabsStackRoute.AddPosition,
        TabsStackRoute.CreateGame,
        TabsStackRoute.CreateOrg,
        TabsStackRoute.CreateSeason,
        TabsStackRoute.AddSeasonParticipants,
        TabsStackRoute.ChangeGameListingAssignee,
        TabsStackRoute.JoinOrg,
        TabsStackRoute.SignIn
    ]
    
    return routes.includes(route)
}

export default function TabsNavigator() {
    return (
        <Tabs.Navigator
            screenOptions={({ route }) => {
                const tabsStackRoute = getFocusedRouteNameFromRoute(route)
                const hideTabBar =
                    tabsStackRoute && isFullSizeRoute(tabsStackRoute)
                const tabBarStyle = {
                    display: (hideTabBar ? 'none' : 'flex') as 'none' | 'flex'
                }
                return {
                    headerShown: false,
                    tabBarLabel: () => null,
                    tabBarStyle
                }
            }}
        >
            <Tabs.Screen
                component={HomeStack}
                name={TabsRoute.Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcon
                            color={
                                focused ? 'secondary.solid' : 'secondary.mute'
                            }
                            name="home-variant"
                            size="2xl"
                        />
                    )
                }}
            />
            <Tabs.Screen
                component={SearchStack}
                name={TabsRoute.Search}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcon
                            color={
                                focused ? 'secondary.solid' : 'secondary.mute'
                            }
                            name="magnify"
                            size="2xl"
                        />
                    )
                }}
            />
            <Tabs.Screen
                component={AccountStack}
                name={TabsRoute.Account}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcon
                            color={
                                focused ? 'secondary.solid' : 'secondary.mute'
                            }
                            name="account-circle"
                            size="2xl"
                        />
                    )
                }}
            />
        </Tabs.Navigator>
    )
}
