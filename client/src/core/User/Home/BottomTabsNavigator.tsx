import { AntDesign } from '@expo/vector-icons'
import { Icon } from 'native-base'
import { UserGroupsTopTabNavigator } from '../Groups/TopTabNavigator'

import { UserHomeBottomTabs, UserHomeBottomTabsRoute } from './BottomTabs'

export default function AppBottomNavigator() {
    return (
        <UserHomeBottomTabs.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    textTransform: 'none',
                    fontSize: 14,
                    fontWeight: '600'
                }
            }}
        >
            <UserHomeBottomTabs.Screen
                component={UserGroupsTopTabNavigator}
                name={UserHomeBottomTabsRoute.Groups}
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
        </UserHomeBottomTabs.Navigator>
    )
}
