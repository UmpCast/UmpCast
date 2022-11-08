import MaterialIcon from '@/components/MaterialIcon'
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

export default function TabsNavigator() {
    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tabs.Screen
                component={HomeStack}
                name={TabsRoute.Home}
                options={{
                    tabBarLabel: () => null,
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
                    tabBarLabel: () => null,
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
                    tabBarLabel: () => null,
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
