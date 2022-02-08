import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

export enum UserGroupTabRoutes {
    Season = 'Season',
    Org = 'Org'
}

export type UserGroupTabParamList = {
    [UserGroupTabRoutes.Season]: undefined
    [UserGroupTabRoutes.Org]: undefined
}

export const UserGroupTab =
    createMaterialTopTabNavigator<UserGroupTabParamList>()
