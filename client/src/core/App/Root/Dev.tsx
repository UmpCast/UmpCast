// inspect({
//     iframe: false
// })

import {
    Box,
    Button,
    FormControl,
    Input,
    NativeBaseProvider
} from 'native-base'

import AppMockProvider from '../Mock/Provider'

import createMockClient from '@/mock/client'
import OrgJoinedScreenFixtures from '@/core/Org/Joined/Screen.fixtures'

import * as WebBrowser from 'expo-web-browser'
import { Controller, useForm } from 'react-hook-form'
import OrgCreateScreen from '@/core/Org/Create/Screen'
import AppInitializedNavigator from '../Initialized/Navigator'

const client = createMockClient({
    resolvers: {
        Query: {
            isRegistered: () => true
        }
    }
})

export default function AppEntryDev() {
    const { control } = useForm({
        defaultValues: {
            a: ''
        }
    })

    return (
        <NativeBaseProvider>
            <Input testID="some-input" />
        </NativeBaseProvider>
    )
}
