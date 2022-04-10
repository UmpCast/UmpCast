import AccountScreen from '@/screens/Account'
import { Feather } from '@expo/vector-icons'
import { Icon } from 'native-base'

import { GroupsTopTabNavigator } from '../Groups/TopTabNavigator'

import { UserHomeBottomTab, UserHomeBottomTabRoute } from './BottomTab'
import HomeBottomTabBar from './BottomTabBar'

export default function AppBottomNavigator() {
    return (
        <UserHomeBottomTab.Navigator
            screenOptions={{
                headerShown: false
            }}
            tabBar={(props) => <HomeBottomTabBar {...props} />}
        >
            <UserHomeBottomTab.Screen
                component={GroupsTopTabNavigator}
                name={UserHomeBottomTabRoute.Groups}
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
            <UserHomeBottomTab.Screen
                component={AccountScreen}
                name={UserHomeBottomTabRoute.Account}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            color={color}
                            size={size}
                            as={Feather}
                            name="smile"
                        />
                    ),
                    tabBarLabel: 'Account'
                }}
            />
        </UserHomeBottomTab.Navigator>
    )
}
