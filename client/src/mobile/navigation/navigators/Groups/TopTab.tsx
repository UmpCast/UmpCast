import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

export enum GroupsTopTabRoute {
    Season = 'Season',
    Org = 'Org'
}

export type GroupsTopTabParamList = {
    [GroupsTopTabRoute.Season]: undefined
    [GroupsTopTabRoute.Org]: undefined
}

export const GroupsTopTab = createMaterialTopTabNavigator<GroupsTopTabParamList>()
