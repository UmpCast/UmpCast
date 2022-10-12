import createMockClient from '@/mock/client'
import serverMocks from '@/mock/mocks'
import { Query, Mutation } from '@/mock/schema.generated'
import { DeepPartial } from '@/utils/primitive'

import AppNavigationContainer from './navigation/Container'
import { createContext, useContext, useState } from 'react'
import RootView from './root'
import appTheme from '@/config/constants/nativeBase/theme'
import { NativeBaseProvider } from 'native-base'
import * as Urql from 'urql'

const createClient = () =>
    createMockClient({
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

const ResetClientContext = createContext<() => void>({} as any)

export const useResetClient = () => useContext(ResetClientContext)

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
                // initialState={{
                //     routes: [
                //         {
                //             name: RootStackRoute.OrgAbout,
                //             params: {
                //                 orgId: 1
                //             }
                //         }
                //     ]
                // }}
                >
                    <RootView resetClient={resetClient} />
                </AppNavigationContainer>
            </NativeBaseProvider>
        </Urql.Provider>
    )
}
