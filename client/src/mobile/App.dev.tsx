import { Mutation, Query } from '@/graphql/generated'
import AppMockProvider from '@/mock/Provider'
import createMockClient from '@/mock/client'
import serverMocks from '@/mock/mocks'
import { DeepPartial } from '@/utils/primitive'

import AppNavigationContainer from './navigation/Container'
import RootStackNavigator from './navigation/navigators/Root/StackNavigator'

const client = createMockClient({
    mocks: {
        ...serverMocks,
        Query(): DeepPartial<Query> {
            return {
                viewer: {
                    id: '1'
                }
            }
        },
        Mutation(): DeepPartial<Mutation> {
            return {
                createOrganization: {
                    success: true
                },
                createSeason: {
                    success: true
                }
            }
        }
    }
})

export default function AppDev() {
    return (
        <AppMockProvider client={client}>
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
                <RootStackNavigator />
            </AppNavigationContainer>
        </AppMockProvider>
    )
}
