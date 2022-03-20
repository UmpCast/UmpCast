import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import {
    BottomTabScreenProps,
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import {
    CompositeScreenProps,
    NavigatorScreenParams
} from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { UserGroupsTopTabParamList } from '../Groups/TopTab'

export enum UserHomeBottomTabsRoute {
    RefereeCenter = 'RefereeCenter',
    ManagerCenter = 'ManagerCenter',
    Groups = 'Groups',
    Inbox = 'Inbox',
    Account = 'Account'
}

export type UserHomeBottomTabsParamList = {
    [UserHomeBottomTabsRoute.RefereeCenter]: undefined
    [UserHomeBottomTabsRoute.ManagerCenter]: undefined
    [UserHomeBottomTabsRoute.Groups]: NavigatorScreenParams<UserGroupsTopTabParamList>
    [UserHomeBottomTabsRoute.Inbox]: undefined
    [UserHomeBottomTabsRoute.Account]: undefined
}

export type UserHomeBottomTabsScreenProp<
    TRoute extends UserHomeBottomTabsRoute = keyof UserHomeBottomTabsParamList
> = CompositeScreenProps<
    StackScreenProps<AppRootStackParamList, AppRootStackRoute.Home>,
    BottomTabScreenProps<UserHomeBottomTabsParamList, TRoute>
>

export const UserHomeBottomTabs =
    createBottomTabNavigator<UserHomeBottomTabsParamList>()
