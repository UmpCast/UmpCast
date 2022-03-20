import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigatorScreenParams } from '@react-navigation/native'

import { UserGroupsTopTabParamList } from '../Groups/TopTab'

export enum UserHomeBottomTabRoute {
    RefereeCenter = 'RefereeCenter',
    ManagerCenter = 'ManagerCenter',
    Groups = 'Groups',
    Inbox = 'Inbox',
    Account = 'Account'
}

export type UserHomeBottomTabParamList = {
    [UserHomeBottomTabRoute.RefereeCenter]: undefined
    [UserHomeBottomTabRoute.ManagerCenter]: undefined
    [UserHomeBottomTabRoute.Groups]: NavigatorScreenParams<UserGroupsTopTabParamList>
    [UserHomeBottomTabRoute.Inbox]: undefined
    [UserHomeBottomTabRoute.Account]: undefined
}

export const UserHomeBottomTab =
    createBottomTabNavigator<UserHomeBottomTabParamList>()
