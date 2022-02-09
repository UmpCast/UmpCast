// inspect({
//     iframe: false
// })

import { Box } from 'native-base'

import AppMockProvider from '../Mock/Provider'

import createMockClient from '@/mock/client'
import OrgJoinedScreen from '@/core/Organization/Joined/Screen'

const client = createMockClient()

export default function AppEntryDev() {
    return (
        <AppMockProvider client={client} withNavigation>
            <Box p={4}>
                <OrgJoinedScreen />
            </Box>
        </AppMockProvider>
    )
}
