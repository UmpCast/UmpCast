import OrgJoinedScreen from '@/core/Org/Joined/Screen'
import { UserGroupTab, UserGroupTabRoutes } from './Tab'
import { useTheme } from 'native-base'

export default function UserGroupNavigator() {
    const theme = useTheme()
    return (
        <UserGroupTab.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    textTransform: 'none',
                    fontSize: 14,
                    fontWeight: '600'
                }
            }}
        >
            <UserGroupTab.Screen
                name={UserGroupTabRoutes.Season}
                component={() => null}
                options={{
                    title: 'Seasons'
                }}
            />
            <UserGroupTab.Screen
                name={UserGroupTabRoutes.Org}
                component={OrgJoinedScreen}
                options={{
                    title: 'Organizations'
                }}
            />
        </UserGroupTab.Navigator>
    )
}
