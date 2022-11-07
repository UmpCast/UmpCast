import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

import {
    AppBottomTabRoute,
    AppBottomTabParamList
} from '@/mobile/navigation/navigators/BottomTab/types'

import { RootStackRoute, RootStackParamList } from './navigators/Root/Stack'

export type RootStackScreenProps<
    TRoute extends RootStackRoute = keyof RootStackParamList
> = StackScreenProps<RootStackParamList, TRoute>

export type AppBottomTabScreenProps<
    TRoute extends AppBottomTabRoute = keyof AppBottomTabParamList
> = CompositeScreenProps<
    BottomTabScreenProps<AppBottomTabParamList, TRoute>,
    RootStackScreenProps<RootStackRoute.App>
>
