import { createStackNavigator } from '@react-navigation/stack'

export enum MockStackRoute {
    Main = 'Main'
}

export type MockStackParamList = {
    [MockStackRoute.Main]: any
}

export const MockStack = createStackNavigator<MockStackParamList>()
