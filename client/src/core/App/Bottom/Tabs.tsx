import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

export enum AppBottomTabRoutes {
    RefereeCenter = 'RefereeCenter',
    ManagerCenter = 'ManagerCenter',
    Groups = 'Groups',
    Inbox = 'Inbox',
    Account = 'Account'
}

export type AppBottomTabParamList = {
    [AppBottomTabRoutes.RefereeCenter]: undefined
    [AppBottomTabRoutes.ManagerCenter]: undefined
    [AppBottomTabRoutes.Groups]: undefined
    [AppBottomTabRoutes.Inbox]: undefined
    [AppBottomTabRoutes.Account]: undefined
}

export const AppBottomTabs = createBottomTabNavigator<AppBottomTabParamList>()
