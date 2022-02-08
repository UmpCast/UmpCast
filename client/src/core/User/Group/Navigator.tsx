import { UserGroupTab, UserGroupTabRoutes } from './Tab'

export default function UserGroupNavigator() {
    return (
        <UserGroupTab.Navigator>
            <UserGroupTab.Screen
                name={UserGroupTabRoutes.Season}
                component={() => null}
            />
            <UserGroupTab.Screen
                name={UserGroupTabRoutes.Org}
                component={() => null}
            />
        </UserGroupTab.Navigator>
    )
}
