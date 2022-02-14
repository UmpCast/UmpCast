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
                name={AppBottomTabsRoute.Groups}
                component={UserGroupNavigator}
                options={{
                    headerShown: false
                }}
            />
        </AppBottomTabs.Navigator>
    )
}
