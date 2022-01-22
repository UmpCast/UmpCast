import { Box } from 'native-base'

import urqlMockingClient from '@/utils/dev/urql'

import DivisionList from './core/SeasonStruct'

import createAuthMachine from '@/machines/createAuthMachine'
import { useActor, useInterpret } from '@xstate/react'
import { testMachine } from '@/machines/testMachine'

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

const authMachine = createAuthMachine({ createClient: urqlMockingClient })

export default function AppDev() {
    const authService = useInterpret(authMachine)
    const [state, send] = useActor(authService)
    const service = useInterpret(() => testMachine.withContext({
        authService
    }))

    console.log(authService.getSnapshot().context.client)

    const [state1] = useActor(service)
    console.log(state1.context, 'ss2')

    return null
}
