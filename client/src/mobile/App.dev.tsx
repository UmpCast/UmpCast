import {
    Actionsheet,
    Button,
    NativeBaseProvider,
    useDisclose
} from 'native-base'
import React, { useState } from 'react'
import * as Urql from 'urql'

import appTheme from '@/config/nativeBase/theme'
import serverMocks from '@/mock/mocks'
import { Query, Mutation } from '@/mock/schema.generated'
import createMockClient from '@/mock/urqlClient'
import { DeepPartial } from '@/utils/primitive'

import AppNavigationContainer from './navigation/Container'
import RootView from './root/View'

const createClient = () =>
    createMockClient({
        withDevTools: true,
        mocks: {
            ...serverMocks,
            Query(): DeepPartial<Query> {
                return {
                    viewer: {
                        joinedOrganizations: [
                            {
                                organization: {
                                    name: 'Palo Alto Little League'
                                }
                            },
                            {
                                organization: {
                                    name: 'Saratoga Little League'
                                }
                            }
                        ],
                        participatingSeasons: [
                            {
                                season: {
                                    name: 'Fall Ball 2022'
                                }
                            },
                            {
                                season: {
                                    name: 'All Stars 2022'
                                }
                            }
                        ]
                    },
                    organization: {
                        name: 'Palo Alto Little League'
                    }
                }
            },
            Mutation(): DeepPartial<Mutation> {
                return {
                    getOrCreateUser: {
                        success: true
                    },
                    createOrganization: {
                        success: true
                    },
                    createSeason: {
                        success: true
                    },
                    joinOrganization: {
                        success: true
                    }
                }
            }
        }
    })

function Example() {
    const { isOpen, onOpen, onClose } = useDisclose()
    return (
        <>
            <Button onPress={onOpen} mt={10}>Actionsheet</Button>

            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Actionsheet.Item>Option 1</Actionsheet.Item>
                    <Actionsheet.Item>Option 2</Actionsheet.Item>
                    <Actionsheet.Item>Option 3</Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </>
    )
}

export default function AppDev() {
    const [client, setClient] = useState(createClient)

    const resetClient = () => {
        const newClient = createClient()
        setClient(newClient)
    }

    return (
        <Urql.Provider value={client}>
            <NativeBaseProvider theme={appTheme}>
                <AppNavigationContainer>
                    <RootView resetClient={resetClient} />
                    {/* <Example /> */}
                </AppNavigationContainer>
            </NativeBaseProvider>
        </Urql.Provider>
    )
}
