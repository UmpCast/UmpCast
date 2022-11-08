import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

export enum TabsRoute {
    Home = 'Home_',
    Search = 'Search_',
    Inbox = 'Inbox_',
    Account = 'Account_'
}

export type TabsParamList = {
    [TabsRoute.Home]: undefined
    [TabsRoute.Search]: undefined
    [TabsRoute.Inbox]: undefined
    [TabsRoute.Account]: undefined
}

export const Tabs = createBottomTabNavigator<TabsParamList>()
