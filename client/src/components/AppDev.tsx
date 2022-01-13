import server from '@/utils/dev/server'
import urqlMockingClient from '@/utils/dev/urql'

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
