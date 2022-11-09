import React, { useEffect, useState } from 'react'
import * as Urql from 'urql'

import appTheme from '@/config/nativeBase/theme'
import serverMocks from '@/mock/mocks'
import createMockClient from '@/mock/urqlClient'
import initialRoute from './initialRoute'
import overrideMocks from './overrideMocks'
import AppNavigationContainer from '../navigation/Container'
import { NativeBaseProvider } from 'native-base'
import RootView from '../View'
import { faker } from '@faker-js/faker'

const createClient = () =>
    createMockClient({
        withDevTools: true,
        mocks: {
            ...serverMocks,
            ...overrideMocks
        }
    })

const key = faker.random.numeric(10)

export default function AppDev() {
    const [client, setClient] = useState(createClient)

    const resetClient = () => {
        const newClient = createClient()
        setClient(newClient)
    }

    useEffect(() => {
        resetClient()
    },[])

    return (
        <Urql.Provider value={client} key={key}>
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
