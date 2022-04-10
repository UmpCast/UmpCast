import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigatorScreenParams } from '@react-navigation/native'

import { GroupsTopTabParamList } from '../Groups/TopTab'

export enum HomeBottomTabRoute {
    RefereeCenter = 'RefereeCenter',
    ManagerCenter = 'ManagerCenter',
    Groups = 'Groups',
    Inbox = 'Inbox',
    Account = 'Account'
}

export type HomeBottomTabParamList = {
    [HomeBottomTabRoute.RefereeCenter]: undefined
    [HomeBottomTabRoute.ManagerCenter]: undefined
    [HomeBottomTabRoute.Groups]: NavigatorScreenParams<GroupsTopTabParamList>
    [HomeBottomTabRoute.Inbox]: undefined
    [HomeBottomTabRoute.Account]: undefined
}

export const HomeBottomTab = createBottomTabNavigator<HomeBottomTabParamList>()
