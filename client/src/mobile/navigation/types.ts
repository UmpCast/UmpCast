import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

import {
    GroupsTopTabRoute,
    GroupsTopTabParamList
} from '@/mobile/navigation/navigators/Groups/TopTab'
import {
    HomeBottomTabRoute,
    HomeBottomTabParamList
} from '@/mobile/navigation/navigators/Home/BottomTab'

import { RootStackRoute, RootStackParamList } from './navigators/Root/Stack'

export type RootStackScreenProps<TRoute extends RootStackRoute = keyof RootStackParamList> =
    StackScreenProps<RootStackParamList, TRoute>

export type GroupsTopTabScreenProps<
    TRoute extends GroupsTopTabRoute = keyof GroupsTopTabParamList
> = CompositeScreenProps<
    MaterialTopTabScreenProps<GroupsTopTabParamList, TRoute>,
    HomeBottomTabScreenProp<HomeBottomTabRoute.Groups>
>

export type HomeBottomTabScreenProp<
    TRoute extends HomeBottomTabRoute = keyof HomeBottomTabParamList
> = CompositeScreenProps<
    BottomTabScreenProps<HomeBottomTabParamList, TRoute>,
    RootStackScreenProps<RootStackRoute.Home>
>
