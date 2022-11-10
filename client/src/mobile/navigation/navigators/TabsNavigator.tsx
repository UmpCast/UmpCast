import MaterialIcon from '@/components/MaterialIcon'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { NavRoute } from '../routes'
import RootStackNavigator from './RootStackNavigator'

const Tabs = createBottomTabNavigator()

function HomeStack() {
    return <RootStackNavigator initialRoute={NavRoute.Home} />
}

function SearchStack() {
    return <RootStackNavigator initialRoute={NavRoute.Search} />
}

function AccountStack() {
    return <RootStackNavigator initialRoute={NavRoute.Account} />
}

export default function TabsNavigator() {
    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
                tabBarLabel: () => null,
            }}
        >
            <Tabs.Screen
                component={HomeStack}
                name={NavRoute.Home_}
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
                name={NavRoute.Search_}
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
                name={NavRoute.Account_}
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
