// inspect({
//     iframe: false
// })

import SeasonStructureEditor from '@/core/Season/Structure/Editor'
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
            <SeasonStructureEditor seasonId="1" />
        </AppMockProvider>
    )
}
