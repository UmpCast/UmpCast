import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

import {
    GroupsTopTabRoute,
    GroupsTopTabParamList
} from '@/mobile/navigation/navigators/Groups/TopTab'
import {
    RootBottomTabRoute,
    RootBottomTabParamList
} from '@/mobile/navigation/navigators/Root/BottomTab'

import { RootStackRoute, RootStackParamList } from './navigators/Root/Stack'

export type RootStackScreenProps<TRoute extends RootStackRoute = keyof RootStackParamList> =
    StackScreenProps<RootStackParamList, TRoute>

export type GroupsTopTabScreenProps<
    TRoute extends GroupsTopTabRoute = keyof GroupsTopTabParamList
> = CompositeScreenProps<
    MaterialTopTabScreenProps<GroupsTopTabParamList, TRoute>,
    HomeBottomTabScreenProp<RootBottomTabRoute.Groups>
>

export type HomeBottomTabScreenProp<
    TRoute extends RootBottomTabRoute = keyof RootBottomTabParamList
> = CompositeScreenProps<
    BottomTabScreenProps<RootBottomTabParamList, TRoute>,
    RootStackScreenProps<RootStackRoute.Home>
>
