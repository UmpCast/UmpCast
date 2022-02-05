// inspect({
//     iframe: false
// })

import { Box } from 'native-base'

import createMockClient from '@/mock/client'

import AppMockProvider from '../Mock/Provider'
import UserOrganizationList from '@/core/User/Organization/List'
import { GetUserOrganizationListDocument } from '@/generated'
import OrganizationInfoActionsheet from '@/core/Organization/Info/Actionsheet'

const client = createMockClient({
    resolvers: {
        Query: {
            me: () => {
                return {
                    organizationPermitList: [
                        {
                            organization: {
                                title: 'organization 1',
                                pictureUrl: null
                            },
                            permissionLevel: 'MEMBER'
                        },
                        {
                            organization: {
                                title: 'organization 2',
                                pictureUrl: null
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
    client.query(GetUserOrganizationListDocument).toPromise().then(console.log)

    return (
        <AppMockProvider client={client} withNavigation>
            <Box p={4}>
                <OrganizationInfoActionsheet />
            </Box>
        </AppMockProvider>
    )
}
