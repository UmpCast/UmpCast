import createMockClient from '@/mock/client'

import AppInitializedNavigator from '../Initialized/Navigator'
import AppMockProvider from '../Mock/Provider'
import AppNavigationContainer from '../Navigation/Container'

const client = createMockClient({
    resolvers: {
        Query: {
            isRegistered: () => true,
            organization: () => {
                return {
                    id: '1',
                    memberList: [
                        {
                            user: {
                                firstName: 'Steve',
                                lastName: 'Vonderhaar',
                                profilePictureUrl: null
                            },
                            permissionLevel: 'OWNER'
                        },
                        {
                            user: {
                                firstName: 'Coco',
                                lastName: 'Vonderhaar',
                                profilePictureUrl: null
                            },
                            permissionLevel: 'MEMBER'
                        },
                        {
                            user: {
                                firstName: 'Jonathan',
                                lastName: 'Kao',
                                profilePictureUrl: null
                            },
                            permissionLevel: 'MEMBER'
                        }
                    ]
                }
            }
        },
        Mutation: {
            updateOrganization: () => ({
                errors: []
            }),
            deleteOrganization: () => ({
                errors: []
            })
        }
    }
})

export default function AppEntryDev() {
    return (
        <AppMockProvider client={client}>
            <AppNavigationContainer>
                <AppInitializedNavigator />
            </AppNavigationContainer>
        </AppMockProvider>
    )
}
