import createMockClient from '@/mock/client'

import AppInitializedNavigator from '../Initialized/Navigator'
import AppMockProvider from '../Mock/Provider'
import AppNavigationContainer from '../Navigation/Container'

const client = createMockClient({
    resolvers: {
        Query: {
            isRegistered: () => true,
            me: () => ({
                id: '1',
                organizationPermitList: [
                    {
                        organization: {
                            email: 'pall@gmail.com',
                            websiteUrl: 'https://www.pabaseball.org/',
                            description:
                                'Little league baseball for kids 5-13. More on our website!',
                            title: 'Palo Alto Little League',
                            logoUrl:
                                'https://images.activityhero.com/57552/original/ccdbf813-ba9d-4991-b2b8-283b6e9e8091.png'
                        },
                        permissionLevel: 'OWNER'
                    },
                    {
                        organization: {
                            title: 'organization 2',
                            logoUrl: null
                        },
                        permissionLevel: 'MEMBER'
                    }
                ]
            }),
            organization: () => ({
                id: '1',
                email: null,
                websiteUrl: null,
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
            })
        },
        Mutation: {
            updateOrganization: () => ({
                organization: {
                    id: '1',
                    title: 'edited'
                },
                errors: []
            }),
            deleteOrganization: () => ({
                errors: []
            }),
            createOrganization: () => {
                return {
                    errors: []
                }
            }
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
