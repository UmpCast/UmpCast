import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

import {
    UserGroupsTopTabRoute,
    UserGroupsTopTabParamList
} from '@/core/User/Groups/TopTab'
import {
    UserHomeBottomTabRoute,
    UserHomeBottomTabParamList
} from '@/core/User/Home/BottomTab'

import { AppRootStackRoute, AppRootStackParamList } from '../Root/Stack'

export type AppRootStackScreenProps<
    TRoute extends AppRootStackRoute = keyof AppRootStackParamList
> = StackScreenProps<AppRootStackParamList, TRoute>

export type UserGroupsTopTabScreenProps<
    TRoute extends UserGroupsTopTabRoute = keyof UserGroupsTopTabParamList
> = CompositeScreenProps<
    UserHomeBottomTabScreenProp<UserHomeBottomTabRoute.Groups>,
    MaterialTopTabScreenProps<UserGroupsTopTabParamList, TRoute>
>

export type UserHomeBottomTabScreenProp<
    TRoute extends UserHomeBottomTabRoute = keyof UserHomeBottomTabParamList
> = CompositeScreenProps<
    AppRootStackScreenProps<AppRootStackRoute.Home>,
    BottomTabScreenProps<UserHomeBottomTabParamList, TRoute>
>
