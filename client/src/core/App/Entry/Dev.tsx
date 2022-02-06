// inspect({
//     iframe: false
// })

import { Box } from 'native-base'

import createMockClient from '@/mock/client'

import AppMockProvider from '../Mock/Provider'
import UserOrganizationList from '@/core/User/JoinedOrg/List'

const client = createMockClient({
    resolvers: {
        Query: {
            me: () => {
                return {
                    organizationPermitList: [
                        {
                            organization: {
                                title: 'organization 1',
                                profilePicture: null
                            },
                            permissionLevel: 'MEMBER'
                        },
                        {
                            organization: {
                                title: 'organization 2',
                                profilePicture: null
                            },
                            permissionLevel: 'OWNER'
                        }
                    ]
                }
            }
        }
    }
})

export default function AppEntryDev() {
    return (
        <AppMockProvider client={client} withNavigation>
            <Box p={4}>
                <UserOrganizationList />
            </Box>
        </AppMockProvider>
    )
}
