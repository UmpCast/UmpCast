import { RouteProp, useRoute } from '@react-navigation/native'
import { Box, VStack } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { OrganizationRoleType, useOrgMemberScreenQuery } from '@/generated'

import OrgMemberHeader from './Header'
import OrgMemberItem from './Item'

type ScreenRouteProp = RouteProp<RootStackParamList, RootStackRoutes.OrgMembers>

export default function OrgMemberScreen() {
    const { params } = useRoute<ScreenRouteProp>()

    const [{ data }] = useOrgMemberScreenQuery({
        variables: {
            id: params.id
        }
    })

    if (!data?.organization?.members) return null

    const allPermits = data?.organization?.members

    const ownerPermits = allPermits.filter(
        (permit) => permit.role === OrganizationRoleType.Owner
    )
    const memberPermits = allPermits.filter(
        (permit) => permit.role === OrganizationRoleType.Member
    )

    return (
        <Box p={4}>
            <VStack space={4}>
                <OrgMemberHeader>Owner</OrgMemberHeader>
                <VStack space={2}>
                    {ownerPermits.map(({ user }) => (
                        <OrgMemberItem key={user.id} user={user} />
                    ))}
                </VStack>
                <OrgMemberHeader>Member</OrgMemberHeader>
                <VStack space={2}>
                    {memberPermits.map(({ user }) => (
                        <OrgMemberItem key={user.id} user={user} />
                    ))}
                </VStack>
            </VStack>
        </Box>
    )
}
