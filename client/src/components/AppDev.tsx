import { mswDB } from '@/mocks/mswDB'
import urqlMockingClient from '@/utils/urql'

import AppNavigator from './AppNavigator'
import MockAppProvider from './MockAppProvider'

export default function AppDev() {
    const resolvers = {
        Query: {
            isRegistered: () => mswDB.user.count() > 0
        },
        Mutation: {
            register: () => {
                mswDB.user.create()
                return {
                    errors: []
                }
            }
        }
    }

    const client = urqlMockingClient({ resolvers, withDevTools: true })

    return (
        <MockAppProvider client={client} withNavigation>
            <AppNavigator />
        </MockAppProvider>
    )
}
