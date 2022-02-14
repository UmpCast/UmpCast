import { UserGroupTabsParamList } from '@/core/User/Group/Tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigatorScreenParams } from '@react-navigation/native'

export enum AppBottomTabsRoute {
    RefereeCenter = 'RefereeCenter',
    ManagerCenter = 'ManagerCenter',
    Groups = 'Groups',
    Inbox = 'Inbox',
    Account = 'Account'
}

export type AppBottomTabParamList = {
    [AppBottomTabsRoute.RefereeCenter]: undefined
    [AppBottomTabsRoute.ManagerCenter]: undefined
    [AppBottomTabsRoute.Groups]: NavigatorScreenParams<UserGroupTabsParamList>
    [AppBottomTabsRoute.Inbox]: undefined
    [AppBottomTabsRoute.Account]: undefined
}

export const AppBottomTabs = createBottomTabNavigator<AppBottomTabParamList>()
