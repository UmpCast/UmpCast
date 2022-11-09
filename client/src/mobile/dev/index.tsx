import React, { useState } from 'react'
import * as Urql from 'urql'

import appTheme from '@/config/nativeBase/theme'
import serverMocks from '@/mock/mocks'
import createMockClient from '@/mock/urqlClient'
import initialRoute from './initialRoute'
import overrideMocks from './overrideMocks'
import { NativeBaseProvider } from 'native-base'
import AppNavigationContainer from '../navigation/Container'
import RootView from '../View'


const createClient = () =>
    createMockClient({
        withDevTools: true,
        mocks: {
            ...serverMocks,
            ...overrideMocks
        }
    })

export default function AppDev() {
    const [client, setClient] = useState(createClient)

    const resetClient = () => {
        const newClient = createClient()
        setClient(newClient)
    }

    return (
        <Urql.Provider value={client}>
            <NativeBaseProvider theme={appTheme}>
                <AppNavigationContainer
                    initialState={{
                        routes: initialRoute
                    }}
                >
                    <RootView resetClient={resetClient} />
                </AppNavigationContainer>
            </NativeBaseProvider>
        </Urql.Provider>
    )
}