import createMockClient from '@/mock/client'
import AppInitializedNavigator from '../Initialized/Navigator'

import AppMockProvider from '../Mock/Provider'
import AppNavigationContainer from '../Navigation/Container'

const client = createMockClient({
    resolvers: {
        Query: {
            isRegistered: () => true,
            organization: () => ({
                id: 'organization-1',
                title: 'Organization 1',
                email: '',
                websiteUrl: '',
                logoUrl: null
            })
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
