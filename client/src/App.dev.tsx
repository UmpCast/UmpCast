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
import ScrollableGameList from './screens/SeasonCalendar/useInfiniteScroll'
import SeasonCalendar from './screens/SeasonCalendar'

const client = createMockClient({
    mocks: serverResolvers
})

export default function AppDev() {
    return (
        <AppMockProvider client={client}>
            <AppNavigationContainer
            // initialState={{
            //     routes: [
            //         {
            //             params: {
            //                 seasonId: '1',
            //                 day: new Date()
            //             },
            //             name: RootStackRoute.SeasonCalendar
            //         }
            //     ]
            // }}
            >
                <SeasonCalendar />
            </AppNavigationContainer>
        </AppMockProvider>
    )
}
