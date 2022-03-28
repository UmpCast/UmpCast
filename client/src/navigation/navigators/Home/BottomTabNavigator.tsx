import { AntDesign } from '@expo/vector-icons'
import { Icon } from 'native-base'

import { GroupsTopTabNavigator } from '../Groups/TopTabNavigator'

import { UserHomeBottomTab, UserHomeBottomTabRoute } from './BottomTab'

export default function AppBottomNavigator() {
    return (
        <UserHomeBottomTab.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    textTransform: 'none',
                    fontSize: 14,
                    fontWeight: '600'
                }
            }}
        >
            <UserHomeBottomTab.Screen
                component={GroupsTopTabNavigator}
                name={UserHomeBottomTabRoute.Groups}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            as={AntDesign}
                            color={color}
                            name="appstore-o"
                            size={size}
                        />
                    )
                }}
            />
        </UserHomeBottomTab.Navigator>
    )
}
