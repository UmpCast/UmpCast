import UserGroupNavigator from '@/core/User/Group/Navigator'
import { AntDesign } from '@expo/vector-icons'
import { Icon } from 'native-base'
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
                name={AppBottomTabsRoute.Groups}
                component={UserGroupNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            color={color}
                            size={size}
                            as={AntDesign}
                            name="appstore-o"
                        />
                    )
                }}
            />
        </AppBottomTabs.Navigator>
    )
}
