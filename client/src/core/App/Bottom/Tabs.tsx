import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

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
    [AppBottomTabsRoute.Groups]: undefined
    [AppBottomTabsRoute.Inbox]: undefined
    [AppBottomTabsRoute.Account]: undefined
}

export const AppBottomTabs = createBottomTabNavigator<AppBottomTabParamList>()
