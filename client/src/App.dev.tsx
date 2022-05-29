import createMockClient from '@/server/client'
import serverResolvers from '@/server/resolvers'

import AppNavigationContainer from './navigation/Container'
import RootStackNavigator from './navigation/navigators/Root/StackNavigator'
import AppMockProvider from './testing/AppMockProvider'
import { Center, Box, Select, CheckIcon, Button } from 'native-base'
import {
    useGroupsOrganizationsScreenQuery,
    useLeaveOrganizationMutation
} from './generated'
import { RootStackRoute } from './navigation/navigators/Root/Stack'

const client = createMockClient({
    mocks: {
        DateTime: () => '2022-03-03T19:00:17.865Z'
    },
    resolvers: serverResolvers
})

export default function AppDev() {
    return (
        <AppMockProvider client={client}>
            <AppNavigationContainer
                initialState={{
                    routes: [
                        {
                            params: {
                                seasonId: '1'
                            },
                            name: RootStackRoute.SeasonCalendar
                        }
                    ]
                }}
            >
                <RootStackNavigator />
            </AppNavigationContainer>
        </AppMockProvider>
    )
}
