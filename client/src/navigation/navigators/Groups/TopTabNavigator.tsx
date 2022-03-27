import GroupsOrganizationsScreen from '@/screens/GroupsOrganizations'
import { GroupsTopTab, GroupsTopTabRoute } from './TopTab'

export function GroupsTopTabNavigator() {
    return (
        <GroupsTopTab.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    textTransform: 'none',
                    fontSize: 14,
                    fontWeight: '600'
                }
            }}
        >
            <GroupsTopTab.Screen
                component={() => null}
                name={GroupsTopTabRoute.Season}
                options={{
                    title: 'Seasons'
                }}
            />
            <GroupsTopTab.Screen
                component={GroupsOrganizationsScreen}
                name={GroupsTopTabRoute.Org}
                options={{
                    title: 'Organizations'
                }}
            />
        </GroupsTopTab.Navigator>
    )
}
