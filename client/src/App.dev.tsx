import createMockClient from '@/server/client'
import serverResolvers from '@/server/resolvers'

import AppNavigationContainer from './navigation/Container'
import RootStackNavigator from './navigation/navigators/Root/StackNavigator'
import DateTimePicker from '@react-native-community/datetimepicker'
import AppMockProvider from './testing/AppMockProvider'
import { RootStackRoute } from './navigation/navigators/Root/Stack'
import { Center, Box, Select, CheckIcon } from 'native-base'
import React from 'react'

const client = createMockClient({
    mocks: {
        DateTime: () => '2022-03-03T19:00:17.865Z'
    },
    resolvers: serverResolvers
})
const Example = () => {
    let [service, setService] = React.useState('')
    return (
        <Center>
            <Box w="3/4" maxW="300">
                <Select
                    selectedValue={service}
                    minWidth="200"
                    accessibilityLabel="Choose Service"
                    placeholder="Choose Service"
                    _selectedItem={{
                        bg: 'teal.600',
                        endIcon: <CheckIcon size="5" />
                    }}
                    mt={1}
                    onValueChange={(itemValue) => setService(itemValue)}
                >
                    <Select.Item label="UX Research" value="ux" />
                    <Select.Item label="Web Development" value="web" />
                    <Select.Item
                        label="Cross Platform Development"
                        value="cross"
                    />
                    <Select.Item label="UI Designing" value="ui" />
                    <Select.Item label="Backend Development" value="backend" />
                </Select>
            </Box>
        </Center>
    )
}

export default function AppDev() {
    return (
        <AppMockProvider client={client}>
            <AppNavigationContainer
                initialState={{
                    routes: [
                        {
                            params: {
                                seasonId: '1',
                                date: new Date()
                            },
                            name: RootStackRoute.SeasonGameNew
                        }
                    ]
                }}
            >
                <RootStackNavigator />
            </AppNavigationContainer>
        </AppMockProvider>
    )
}
