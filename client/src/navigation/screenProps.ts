import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

import {
    GroupsTopTabRoute,
    GroupsTopTabParamList
} from '@/navigation/navigators/Groups/TopTab'
import { RootStackRoute, RootStackParamList } from './navigators/Root/Stack'
import {
    UserHomeBottomTabRoute,
    UserHomeBottomTabParamList
} from '@/navigation/navigators/Home/BottomTab'

export type RootStackScreenProps<
    TRoute extends RootStackRoute = keyof RootStackParamList
> = StackScreenProps<RootStackParamList, TRoute>

export type GroupsTopTabScreenProps<
    TRoute extends GroupsTopTabRoute = keyof GroupsTopTabParamList
> = CompositeScreenProps<
    UserHomeBottomTabScreenProp<UserHomeBottomTabRoute.Groups>,
    MaterialTopTabScreenProps<GroupsTopTabParamList, TRoute>
>

export type UserHomeBottomTabScreenProp<
    TRoute extends UserHomeBottomTabRoute = keyof UserHomeBottomTabParamList
> = CompositeScreenProps<
    RootStackScreenProps<RootStackRoute.Home>,
    BottomTabScreenProps<UserHomeBottomTabParamList, TRoute>
>
