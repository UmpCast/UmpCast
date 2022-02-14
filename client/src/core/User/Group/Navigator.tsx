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
                component={() => null}
                name={UserGroupTabsRoute.Season}
                options={{
                    title: 'Seasons'
                }}
            />
            <UserGroupTabs.Screen
                component={OrgJoinedScreen}
                name={UserGroupTabsRoute.Org}
                options={{
                    title: 'Organizations'
                }}
            />
        </UserGroupTabs.Navigator>
    )
}
