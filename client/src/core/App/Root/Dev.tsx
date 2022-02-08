// inspect({
//     iframe: false
// })

import { Box, Text, useDisclose } from 'native-base'

import createMockClient from '@/mock/client'

import AppMockProvider from '../Mock/Provider'
import OrganizationInfoActionsheet from '@/core/Organization/Info/Sheet'
import UserJoinedOrgList from '@/core/User/JoinedOrg/List'
import {
    UserJoinedOrgListFragment,
    useUserJoinedOrgScreenQuery
} from '@/generated'

const client = createMockClient({
    resolvers: {
        Query: {
            me: () => {
                return {
                    organizationPermitList: [
                        {
                            organization: {
                                email: 'pall@gmail.com',
                                websiteUrl: 'https://www.pabaseball.org/',
                                description:
                                    'Little league baseball for kids 5-13. More on our website!',
                                title: 'Palo Alto Little League',
                                profilePicture:
                                    'https://images.activityhero.com/57552/original/ccdbf813-ba9d-4991-b2b8-283b6e9e8091.png'
                            },
                            permissionLevel: 'OWNER'
                        },
                        {
                            organization: {
                                title: 'organization 2',
                                profilePicture: null
                            },
                            permissionLevel: 'MEMBER'
                        }
                    ]
                }
            }
        }
    }
})

function HomeScreen() {
    return <Text>home</Text>
}
function SettingsScreen() {
    return <Text>settings</Text>
}

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator()

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    )
}

export function Test() {
    const [{ data }] = useUserJoinedOrgScreenQuery()

    const permitList = data?.me?.organizationPermitList
    if (!permitList) return null

    const filteredPermitList = permitList.filter(
        (permit): permit is UserJoinedOrgListFragment => permit !== null
    )

    return <UserJoinedOrgList permitList={filteredPermitList} />
}

export default function AppEntryDev() {
    return (
        <AppMockProvider client={client} withNavigation>
            <Box p={4}>
                <MyTabs />
            </Box>
        </AppMockProvider>
    )
}
