import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

export enum UserGroupsTopTabRoute {
    Season = 'Season',
    Org = 'Org'
}

export type UserGroupsTopTabParamList = {
    [UserGroupsTopTabRoute.Season]: undefined
    [UserGroupsTopTabRoute.Org]: undefined
}

export const UserGroupsTopTab =
    createMaterialTopTabNavigator<UserGroupsTopTabParamList>()
