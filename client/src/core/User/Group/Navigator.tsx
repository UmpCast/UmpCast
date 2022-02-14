import OrgJoinedScreen from '@/core/Org/Joined/Screen'
import { UserGroupTabs, UserGroupTabsRoute } from './Tabs'

export default function UserGroupNavigator() {
    return (
        <UserGroupTabs.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    textTransform: 'none',
                    fontSize: 14,
                    fontWeight: '600'
                }
            }}
        >
            <UserGroupTabs.Screen
                name={UserGroupTabsRoute.Season}
                component={() => null}
                options={{
                    title: 'Seasons'
                }}
            />
            <UserGroupTabs.Screen
                name={UserGroupTabsRoute.Org}
                component={OrgJoinedScreen}
                options={{
                    title: 'Organizations'
                }}
            />
        </UserGroupTabs.Navigator>
    )
}
