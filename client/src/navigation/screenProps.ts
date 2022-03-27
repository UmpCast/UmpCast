import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

import {
    UserGroupsTopTabRoute,
    UserGroupsTopTabParamList
} from '@/navigation/navigators/Groups/TopTab'
import {
    AppRootStackRoute,
    AppRootStackParamList
} from './navigators/Root/Stack'
import {
    UserHomeBottomTabRoute,
    UserHomeBottomTabParamList
} from '@/navigation/navigators/Home/BottomTab'

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
