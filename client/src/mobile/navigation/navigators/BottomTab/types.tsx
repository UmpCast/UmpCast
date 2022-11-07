import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

export enum AppBottomTabRoute {
    Home = 'Home',
    Search = 'Search',
    Inbox = 'Inbox',
    Account = 'Account'
}

export type AppBottomTabParamList = {
    [AppBottomTabRoute.Home]: undefined
    [AppBottomTabRoute.Search]: undefined
    [AppBottomTabRoute.Inbox]: undefined
    [AppBottomTabRoute.Account]: undefined
}

export const AppBottomTab = createBottomTabNavigator<AppBottomTabParamList>()
