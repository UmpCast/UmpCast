import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigatorScreenParams } from '@react-navigation/native'

import { GroupsTopTabParamList } from '../Groups/TopTab'

export enum RootBottomTabRoute {
    Home = 'Home',
    Inbox = 'Inbox',
    Me = 'Me'
}

export type RootBottomTabParamList = {
    [RootBottomTabRoute.Inbox]: undefined
    [RootBottomTabRoute.Me]: undefined
}

export const RootBottomTab = createBottomTabNavigator<RootBottomTabParamList>()
