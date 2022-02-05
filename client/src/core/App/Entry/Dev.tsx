// inspect({
//     iframe: false
// })

import { Box } from 'native-base'

import createMockClient from '@/mock/client'

import AppMockProvider from '../Mock/Provider'
import UserOrganizationList from '@/core/User/Organization/List'
import faker from 'faker'
import {
    GetUserOrganizationListDocument,
    OrganizationPermissionLevel
} from '@/generated'

const client = createMockClient({
    resolvers: {
        Query: {
            me: () => {
                console.log('here')
                return {
                    organizationPermitList: [
                        {
                            organization: {
                                title: 'organization 1',
                                pictureUrl:
                                    'https://organization-1.profile.picture'
                            },
                            permissionLevel: OrganizationPermissionLevel.Member
                        }
                    ]
                }
            }
        }
    }
})

export default function AppEntryDev() {
    client.query(GetUserOrganizationListDocument).toPromise().then(console.log)

    return (
        <AppMockProvider client={client} withNavigation>
            <Box p={4}>
                <UserOrganizationList />
            </Box>
        </AppMockProvider>
    )
}
