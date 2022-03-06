import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

export enum UserGroupTabsRoute {
    Season = 'Season',
    Org = 'Org'
}

export type UserGroupTabsParamList = {
    [UserGroupTabsRoute.Season]: undefined
    [UserGroupTabsRoute.Org]: undefined
}

export const UserGroupTabs =
    createMaterialTopTabNavigator<UserGroupTabsParamList>()
