import AppMockProvider from '../Mock/Provider'

import createMockClient from '@/mock/client'

import { useForm } from 'react-hook-form'
import OrgCreateScreen from '@/core/Org/Create/Screen'

const client = createMockClient({
    resolvers: {
        Query: {
            isRegistered: () => true
        },
        Mutation: {
            createOrganization: () => {
                return {
                    errors: [{ key: 'title', message: 'bad title' }]
                }
            }
        }
    }
})

export default function AppEntryDev() {
    const { control } = useForm({
        defaultValues: {
            a: ''
        }
    })

    return (
        <AppMockProvider client={client} withNavigation>
            <OrgCreateScreen />
        </AppMockProvider>
    )
}
