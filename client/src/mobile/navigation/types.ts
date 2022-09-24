import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

import {
    AppBottomTabRoute,
    AppBottomTabParamList
} from '@/mobile/navigation/navigators/App/BottomTab'
import {
    GroupsTopTabRoute,
    GroupsTopTabParamList
} from '@/mobile/navigation/navigators/Groups/TopTab'

import { RootStackRoute, RootStackParamList } from './navigators/Root/Stack'

export type RootStackScreenProps<TRoute extends RootStackRoute = keyof RootStackParamList> =
    StackScreenProps<RootStackParamList, TRoute>

export type GroupsTopTabScreenProps<
    TRoute extends GroupsTopTabRoute = keyof GroupsTopTabParamList
> = CompositeScreenProps<
    MaterialTopTabScreenProps<GroupsTopTabParamList, TRoute>,
    HomeBottomTabScreenProp<AppBottomTabRoute.Groups>
>

export type HomeBottomTabScreenProp<
    TRoute extends AppBottomTabRoute = keyof AppBottomTabParamList
> = CompositeScreenProps<
    BottomTabScreenProps<AppBottomTabParamList, TRoute>,
    RootStackScreenProps<RootStackRoute.Home>
>
