import { Feather } from '@expo/vector-icons'
import { Icon } from 'native-base'

import MeScreen from '@/screens/Me'

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
                            as={Feather}
                            color={color}
                            name="grid"
                            size={size}
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
                            as={Feather}
                            color={color}
                            name="smile"
                            size={size}
                        />
                    ),
                    tabBarLabel: 'Me'
                }}
            />
        </HomeBottomTab.Navigator>
    )
}
