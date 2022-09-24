import { AppBottomTab, AppBottomTabRoute } from './BottomTab'
import HomeScreen from '@/nx/mobile/screens/HomeScreen'
import MaterialIcon from '@/nx/components/MaterialIcon'
import GameSearchScreen from '@/nx/mobile/screens/GameSearchScreen'

export default function AppBottomTabNavigator() {
    return (
        <AppBottomTab.Navigator>
            <AppBottomTab.Screen
                name={AppBottomTabRoute.Home}
                component={HomeScreen}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcon
                            name="home-variant"
                            size="2xl"
                            color={focused ? 'secondary.700' : 'secondary.400'}
                        />
                    )
                }}
            />
            <AppBottomTab.Screen
                name={AppBottomTabRoute.GameSearch}
                component={GameSearchScreen}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcon
                            name="magnify"
                            size="2xl"
                            color={focused ? 'secondary.700' : 'secondary.400'}
                        />
                    )
                }}
            />
            <AppBottomTab.Screen
                name={AppBottomTabRoute.Me}
                component={HomeScreen}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcon
                            name="account-circle"
                            size="2xl"
                            color={focused ? 'secondary.700' : 'secondary.400'}
                        />
                    )
                }}
            />
        </AppBottomTab.Navigator>
    )
}
