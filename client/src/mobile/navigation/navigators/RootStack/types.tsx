import { createStackNavigator } from '@react-navigation/stack'

export enum RootStackRoute {
    Tabs = 'Tabs_',
    SeasonCalendar = 'SeasonCalendar'
}

export type RootStackParamList = {
    [RootStackRoute.Tabs]: undefined
    [RootStackRoute.SeasonCalendar]: {
        seasonId: string
    }
}

export const RootStack = createStackNavigator<RootStackParamList>()
