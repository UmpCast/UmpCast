// inspect({
//     iframe: false
// })

import { Box } from 'native-base'

import AppMockProvider from '../Mock/Provider'

import createMockClient from '@/mock/client'
import OrgJoinedScreen from '@/core/Org/Joined/Screen'
import OrgJoinedScreenFixtures from '@/core/Org/Joined/Screen.fixtures'

const client = createMockClient({ resolvers: OrgJoinedScreenFixtures[0] })

export default function AppEntryDev() {
    return (
        <AppMockProvider client={client} withNavigation>
            <Box p={4}>
                <OrgJoinedScreen />
            </Box>
        </AppMockProvider>
    )
}
