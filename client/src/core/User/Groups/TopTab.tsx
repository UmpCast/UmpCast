import {
    createMaterialTopTabNavigator,
    MaterialTopTabScreenProps
} from '@react-navigation/material-top-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import {
    UserHomeBottomTabsRoute,
    UserHomeBottomTabsScreenProp
} from '../Home/BottomTabs'

export enum UserGroupsTopTabRoute {
    Season = 'Season',
    Org = 'Org'
}

export type UserGroupsTopTabParamList = {
    [UserGroupsTopTabRoute.Season]: undefined
    [UserGroupsTopTabRoute.Org]: undefined
}

export type UserGroupsTopTabScreenProps<
    TRoute extends UserGroupsTopTabRoute = keyof UserGroupsTopTabParamList
> = CompositeScreenProps<
    UserHomeBottomTabsScreenProp<UserHomeBottomTabsRoute.Groups>,
    MaterialTopTabScreenProps<UserGroupsTopTabParamList, TRoute>
>

export const UserGroupsTopTab =
    createMaterialTopTabNavigator<UserGroupsTopTabParamList>()
