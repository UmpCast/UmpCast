import { RootStack, RootStackRoutes } from '@/navigation'
import createMockClient from '@/utils/dev/urql'

import MockAppProvider from '../test/components/MockAppProvider'
import AppNavigator from './screens/AppNavigator/AppNavigator'
import RegisterUserScreen from './screens/RegisterUserScreen'

// inspect({
//     iframe: false
// })

const client = createMockClient({
    resolvers: {
        Query: {
            isRegistered: () => false,
            season: () => {
                return {
                    id: '1'
                }
            }
        },
        Mutation: {
            createPosition: () => {
                return {
                    errors: []
                }
            }
        }
    }
})

export default function AppDev() {
    return (
        <MockAppProvider client={client} withNavigation>
            <AppNavigator />
        </MockAppProvider>
    )
}
