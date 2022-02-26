import OrgCreateScreen from '@/core/Org/Create/Screen'
import OrgEditScreen from '@/core/Org/Edit/Screen'
import OrgJoinedScreen from '@/core/Org/Joined/Screen'
import createMockClient from '@/mock/client'

import AppMockProvider from '../Mock/Provider'
import AppNavigationContainer from '../Navigation/Container'

const client = createMockClient({
    resolvers: {
        Query: {
            isRegistered: () => true,
            organization: () => {
                return {
                    id: 'organization-1',
                    title: 'Organization 1',
                    email: '',
                    websiteUrl: '',
                    logoUrl: null
                }
            }
        },
        Mutation: {
            updateOrganization: () => {
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
                <OrgJoinedScreen />
            </AppNavigationContainer>
        </AppMockProvider>
    )
}
