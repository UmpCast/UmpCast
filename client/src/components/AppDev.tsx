import { Box } from 'native-base'

import urqlMockingClient from '@/utils/dev/urql'

import createAuthMachine from '@/machines/createAuthMachine'
import MockAppProvider from './MockAppProvider'
import SeasonStruct from './core/SeasonStruct'

// inspect({
//     iframe: false
// })

const authMachine = createAuthMachine({ createClient: urqlMockingClient })
const client = urqlMockingClient()
export default function AppDev() {
    return (
        <MockAppProvider client={client}>
            <SeasonStruct seasonId="1" />
        </MockAppProvider>
    )
}
