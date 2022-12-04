import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { StackScreenProps } from '@react-navigation/stack'
import { NavParamList, NavRoute } from './routes'

export type TabsScreenProps<TRoute extends NavRoute = keyof NavParamList> =
    BottomTabScreenProps<NavParamList, TRoute>

export type TabsStackScreenProps<TRoute extends NavRoute = keyof NavParamList> =
    StackScreenProps<NavParamList, TRoute>
