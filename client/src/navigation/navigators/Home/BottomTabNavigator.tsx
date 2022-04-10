import MeScreen from '@/screens/Me'
import { Feather } from '@expo/vector-icons'
import { Icon } from 'native-base'

import { GroupsTopTabNavigator } from '../Groups/TopTabNavigator'

import { HomeBottomTab, HomeBottomTabRoute } from './BottomTab'
import HomeBottomTabBar from './BottomTabBar'

export default function AppBottomNavigator() {
    return (
        <HomeBottomTab.Navigator
            screenOptions={{
                headerShown: false
            }}
            tabBar={(props) => <HomeBottomTabBar {...props} />}
        >
            <HomeBottomTab.Screen
                component={GroupsTopTabNavigator}
                name={HomeBottomTabRoute.Groups}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            color={color}
                            size={size}
                            as={Feather}
                            name="grid"
                        />
                    ),
                    tabBarLabel: 'Groups'
                }}
            />
            <HomeBottomTab.Screen
                component={MeScreen}
                name={HomeBottomTabRoute.Me}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            color={color}
                            size={size}
                            as={Feather}
                            name="smile"
                        />
                    ),
                    tabBarLabel: 'Me'
                }}
            />
        </HomeBottomTab.Navigator>
    )
}
