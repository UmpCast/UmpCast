import createMockClient from '@/server/client'
import serverResolvers from '@/server/resolvers'

import AppNavigationContainer from './navigation/Container'
import RootStackNavigator from './navigation/navigators/Root/StackNavigator'
import AppMockProvider from './testing/AppMockProvider'
import { Center, Box, Select, CheckIcon, Button } from 'native-base'
import {
    useGroupsOrganizationsScreenQuery,
    useLeaveOrganizationMutation,
    useViewerQuery
} from './generated'

const client = createMockClient({
    mocks: {
        DateTime: () => '2022-03-03T19:00:17.865Z'
    },
    resolvers: serverResolvers
})

export function Test() {
    const [{ data }] = useViewerQuery()
    useGroupsOrganizationsScreenQuery()
    const [_, executeLeaveOrg] = useLeaveOrganizationMutation()

    return (
        <Button
            onPress={() => {
                executeLeaveOrg(
                    {
                        input: {
                            organizationId: 'organization-3'
                        }
                    },
                    {
                        additionalTypenames: ['Organization']
                    }
                )
            }}
        >
            test
        </Button>
    )
}

export default function AppDev() {
    return (
        <AppMockProvider client={client}>
            <AppNavigationContainer
            // initialState={{
            //     routes: [
            //         {
            //             params: {
            //                 seasonId: '1',
            //                 date: new Date()
            //             },
            //             name: RootStackRoute.SeasonGameNew
            //         }
            //     ]
            // }}
            >
                <RootStackNavigator />
            </AppNavigationContainer>
        </AppMockProvider>
    )
}
