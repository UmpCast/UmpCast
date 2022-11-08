import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

import {
    TabsRoute,
    TabsParamList
} from '@/mobile/navigation/navigators/Tabs/types'

import {
    TabsStackParamList,
    TabsStackRoute
} from './navigators/TabsStack/types'
import {
    RootStackParamList,
    RootStackRoute
} from './navigators/RootStack/types'

export type RootStackScreenProps<
    TRoute extends RootStackRoute = keyof RootStackParamList
> = StackScreenProps<RootStackParamList, TRoute>

export type TabsScreenProps<TRoute extends TabsRoute = keyof TabsParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<TabsParamList, TRoute>,
        RootStackScreenProps<RootStackRoute.Tabs>
    >

export type TabsStackScreenProps<
    TRoute extends TabsStackRoute = keyof TabsStackParamList
> = CompositeScreenProps<
    BottomTabScreenProps<TabsStackParamList, TRoute>,
    RootStackScreenProps<RootStackRoute.TabsStack>
>
