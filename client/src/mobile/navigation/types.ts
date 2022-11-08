import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { StackScreenProps } from '@react-navigation/stack'

import {
    TabsRoute,
    TabsParamList
} from '@/mobile/navigation/navigators/Tabs/types'

import {
    TabsStackParamList,
    TabsStackRoute
} from './navigators/TabsStack/types'

export type TabsScreenProps<TRoute extends TabsRoute = keyof TabsParamList> =
    BottomTabScreenProps<TabsParamList, TRoute>

export type TabsStackScreenProps<
    TRoute extends TabsStackRoute = keyof TabsStackParamList
> = StackScreenProps<TabsStackParamList, TRoute>
