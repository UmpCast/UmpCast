import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

export enum AppBottomTabRoute {
    Home = 'Home',
    GameSearch = 'GameSearch',
    Inbox = 'Inbox',
    Me = 'Me'
}

export type AppBottomTabParamList = {
    [AppBottomTabRoute.Home]: undefined
    [AppBottomTabRoute.GameSearch]: undefined
    [AppBottomTabRoute.Inbox]: undefined
    [AppBottomTabRoute.Me]: undefined
}

export const AppBottomTab = createBottomTabNavigator<AppBottomTabParamList>()
