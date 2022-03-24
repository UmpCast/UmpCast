import UserJoinedOrgInfoScreen from '@/core/UserJoinedOrg/List/Screen'

import { UserGroupsTopTab, UserGroupsTopTabRoute } from './TopTab'

export function UserGroupsTopTabNavigator() {
    return (
        <UserGroupsTopTab.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    textTransform: 'none',
                    fontSize: 14,
                    fontWeight: '600'
                }
            }}
        >
            <UserGroupsTopTab.Screen
                component={() => null}
                name={UserGroupsTopTabRoute.Season}
                options={{
                    title: 'Seasons'
                }}
            />
            <UserGroupsTopTab.Screen
                component={UserJoinedOrgInfoScreen}
                name={UserGroupsTopTabRoute.Org}
                options={{
                    title: 'Organizations'
                }}
            />
        </UserGroupsTopTab.Navigator>
    )
}