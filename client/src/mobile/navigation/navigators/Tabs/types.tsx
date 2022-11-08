import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigatorScreenParams } from '@react-navigation/native'
import { TabsStackParamList } from '../TabsStack/types'

export enum TabsRoute {
    Home = 'Home_',
    Search = 'Search_',
    Inbox = 'Inbox_',
    Account = 'Account_'
}

export type TabsParamList = {
    [TabsRoute.Home]: NavigatorScreenParams<TabsStackParamList>
    [TabsRoute.Search]: NavigatorScreenParams<TabsStackParamList>
    [TabsRoute.Inbox]: NavigatorScreenParams<TabsStackParamList>
    [TabsRoute.Account]: NavigatorScreenParams<TabsStackParamList>
}

export const Tabs = createBottomTabNavigator<TabsParamList>()
