import { AntDesign } from '@expo/vector-icons'
import { Icon } from 'native-base'

import UserGroupNavigator from '@/core/User/Group/Navigator'

import { AppBottomTabsRoute, AppBottomTabs } from './Tabs'

export default function AppBottomNavigator() {
    return (
        <AppBottomTabs.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    textTransform: 'none',
                    fontSize: 14,
                    fontWeight: '600'
                }
            }}
        >
            <AppBottomTabs.Screen
                component={UserGroupNavigator}
                name={AppBottomTabsRoute.Groups}
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
        </AppBottomTabs.Navigator>
    )
}
