import server from '@/server'
import urqlMockingClient from '@/utils/urql'

import AppNavigator from './AppNavigator'
import MockAppProvider from './MockAppProvider'

export default function AppDev() {
    server.config.Mutation.register = { type: 'success' }

    const client = urqlMockingClient({
        resolvers: server.resolvers,
        withDevTools: true
    })

    return (
        <MockAppProvider client={client} withNavigation>
            <AppNavigator />
        </MockAppProvider>
    )
}
