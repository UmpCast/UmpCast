import UserJoinedOrgInfoScreen from '@/core/UserJoinedOrgs/UserJoinedOrgInfoScreen'
import { UserGroupTabs, UserGroupTabsRoute } from './UserGroupTabsTypes'

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
                component={UserJoinedOrgInfoScreen}
                name={UserGroupTabsRoute.Org}
                options={{
                    title: 'Organizations'
                }}
            />
        </UserGroupTabs.Navigator>
    )
}
