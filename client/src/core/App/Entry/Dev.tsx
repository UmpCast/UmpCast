// inspect({
//     iframe: false
// })

import DivisionEditList from '@/core/Division/Edit/List'
import createMockClient from '@/mock/client'
import AppMockProvider from '../Mock/Provider'

const client = createMockClient({
    resolvers: {
        Query: {
            isRegistered: () => false,
            season: () => ({
                id: '1'
            })
        },
        Mutation: {
            createPosition: () => ({
                errors: []
            }),
            createDivision: () => ({
                errors: []
            })
        }
    }
})

export default function AppEntryDev() {
    return (
        <AppMockProvider client={client} withNavigation>
            <DivisionEditList seasonId="1" />
        </AppMockProvider>
    )
}
