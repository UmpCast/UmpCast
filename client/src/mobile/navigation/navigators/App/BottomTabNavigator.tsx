import MaterialIcon from '@/components/MaterialIcon'
import GameSearchScreen from '@/mobile/screens/GameSearchScreen'
import HomeScreen from '@/mobile/screens/HomeScreen'

import { AppBottomTab, AppBottomTabRoute } from './BottomTab'

export default function AppBottomTabNavigator() {
    return (
        <AppBottomTab.Navigator>
            <AppBottomTab.Screen
                component={HomeScreen}
                name={AppBottomTabRoute.Home}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcon
                            color={focused ? 'secondary.solid' : 'secondary.mute'}
                            name="home-variant"
                            size="2xl"
                        />
                    )
                }}
            />
            <AppBottomTab.Screen
                component={GameSearchScreen}
                name={AppBottomTabRoute.GameSearch}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcon
                            color={focused ? 'secondary.solid' : 'secondary.mute'}
                            name="magnify"
                            size="2xl"
                        />
                    )
                }}
            />
            <AppBottomTab.Screen
                component={HomeScreen}
                name={AppBottomTabRoute.Me}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcon
                            color={focused ? 'secondary.solid' : 'secondary.mute'}
                            name="account-circle"
                            size="2xl"
                        />
                    )
                }}
            />
        </AppBottomTab.Navigator>
    )
}
