import { NavigatorScreenParams } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TabsParamList } from '../Tabs/types'
import { TabsStackParamList } from '../TabsStack/types'

export enum RootStackRoute {
    Tabs = 'Tabs_',
    TabsStack = 'TabsStack_'
}

export type RootStackParamList = {
    [RootStackRoute.Tabs]: NavigatorScreenParams<TabsParamList>
    [RootStackRoute.TabsStack]: NavigatorScreenParams<TabsStackParamList>
}

export const RootStack = createStackNavigator<RootStackParamList>()
