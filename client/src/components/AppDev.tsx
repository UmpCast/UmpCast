import { Box } from 'native-base'

import { RootStack, RootStackRoutes } from '@/navigation'
import urqlMockingClient from '@/utils/dev/urql'

import MockAppProvider from './MockAppProvider'
import DivisionList from './organisms/DivisionList'
import PositionCreateScreen from './screens/PositionCreateScreen'

import { inspect } from '@xstate/inspect'
import useAuthPhase from '@/hooks/useAuth'
import AppNavigator from './organisms/AppNavigator'

// inspect({
//     iframe: false
// })

export function Test() {
    return (
        <Box p={3}>
            <DivisionList seasonId="1" />
        </Box>
    )
}

export default function AppDev() {
    const client = urqlMockingClient({ withDevTools: true })
    const authService = useAuthPhase({ client })

    return (
        <MockAppProvider withNavigation>
            <AppNavigator authService={authService} />
        </MockAppProvider>
    )
}
