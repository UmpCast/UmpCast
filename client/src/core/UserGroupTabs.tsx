import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationProp } from '@react-navigation/native'

export enum UserGroupTabsRoute {
    Season = 'Season',
    Org = 'Org'
}

export type UserGroupTabsParamList = {
    [UserGroupTabsRoute.Season]: undefined
    [UserGroupTabsRoute.Org]: undefined
}

export type UserGroupTabsNav<T extends UserGroupTabsRoute> = NavigationProp<
    UserGroupTabsParamList,
    T
>

export const UserGroupTabs =
    createMaterialTopTabNavigator<UserGroupTabsParamList>()
