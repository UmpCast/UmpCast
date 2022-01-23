import createMockClient from '@/utils/dev/urql'

import MockAppProvider from '../test/components/MockAppProvider'

import RegisterUserScreen from './screens/RegisterUserScreen'

// inspect({
//     iframe: false
// })

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
            })
        }
    }
})

export default function AppDev() {
    return (
        <MockAppProvider client={client}>
            <RegisterUserScreen />
        </MockAppProvider>
    )
}
