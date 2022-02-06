// inspect({
//     iframe: false
// })

import { Box } from 'native-base'

import createMockClient from '@/mock/client'

import AppMockProvider from '../Mock/Provider'
import UserOrganizationList from '@/core/User/JoinedOrg/List'
import OrganizationInfoActionsheet from '@/core/Organization/Info/Actionsheet'
import { useUserJoinedOrgListQuery } from '@/generated'

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
                            permissionLevel: 'OWNER'
                        }
                    ]
                }
            }
        }
    }
})

export function Test() {
    const [{ data }] = useUserJoinedOrgListQuery()

    const permit = data?.me?.organizationPermitList?.[0]
    if (!permit) return null

    return <OrganizationInfoActionsheet permit={permit} />
}

export default function AppEntryDev() {
    return (
        <AppMockProvider client={client} withNavigation>
            <Box p={4}>
                <Test />
            </Box>
        </AppMockProvider>
    )
}
