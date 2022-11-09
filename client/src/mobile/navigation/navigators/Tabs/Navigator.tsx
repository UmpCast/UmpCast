import MaterialIcon from '@/components/MaterialIcon'
import React from 'react'
import StackNavigator from '../Stack/Navigator'
import { TabsStackRoute } from '../TabsStack/types'

import { Tabs, TabsRoute } from './types'

function HomeStack() {
    return <StackNavigator initialRoute={TabsStackRoute.Home} />
}

function SearchStack() {
    return <StackNavigator initialRoute={TabsStackRoute.Search} />
}

function AccountStack() {
    return <StackNavigator initialRoute={TabsStackRoute.Account} />
}

export default function TabsNavigator() {
    return (
        <Tabs.Navigator
            screenOptions={({ route }) => {
                return {
                    headerShown: false,
                    tabBarLabel: () => null
                }
            }}
        >
            <Tabs.Screen
                component={HomeStack}
                name={TabsRoute.Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcon
                            color={
                                focused ? 'secondary.solid' : 'secondary.mute'
                            }
                            name="home-variant"
                            size="2xl"
                        />
                    )
                }}
            />
            <Tabs.Screen
                component={SearchStack}
                name={TabsRoute.Search}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcon
                            color={
                                focused ? 'secondary.solid' : 'secondary.mute'
                            }
                            name="magnify"
                            size="2xl"
                        />
                    )
                }}
            />
            <Tabs.Screen
                component={AccountStack}
                name={TabsRoute.Account}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcon
                            color={
                                focused ? 'secondary.solid' : 'secondary.mute'
                            }
                            name="account-circle"
                            size="2xl"
                        />
                    )
                }}
            />
        </Tabs.Navigator>
    )
}
