import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignupScreen from 'app/signup/components/signupScreen'

import { RootStackParamList } from './models/RootStackParamList'

const RootStack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
    return (
        <RootStack.Navigator>
            <RootStack.Group screenOptions={{ headerTitle: '' }}>
                <RootStack.Screen
                    name="Signup"
                    component={SignupScreen}
                    options={{ animation: 'slide_from_right' }}
                    initialParams={{ step: 1 }}
                />
            </RootStack.Group>
        </RootStack.Navigator>
    )
}
