import AppMockProvider from '@/mock/Provider'
import createMockClient from '@/mock/client'
import serverMocks from '@/mock/mocks'
import { Query, Mutation } from '@/mock/schema.generated'
import { DeepPartial } from '@/utils/primitive'

import AppNavigationContainer from './navigation/Container'
import RootStackNavigator from './navigation/navigators/Root/StackNavigator'
import { faker } from '@faker-js/faker'

const client = createMockClient({
    mocks: {
        ...serverMocks,
        Query(): DeepPartial<Query> {
            return {
                viewer: {
                    id: '1',
                    joinedOrganizations: [
                        {
                            organization: {
                                logoUrl: faker.image.avatar(),
                                name: 'Palo Alto Little League'
                            }
                        },
                        {
                            organization: {
                                logoUrl: faker.image.avatar(),
                                name: 'Saratoga Little League'
                            }
                        }
                    ]
                },
                organization: {
                    seasons: [
                        {
                            id: '12'
                        },
                        {
                            id: '2'
                        }
                    ]
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
