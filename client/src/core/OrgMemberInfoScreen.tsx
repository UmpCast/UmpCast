import { useOrgMemberScreenQuery, OrganizationRoleType } from '@/generated'
import { RouteProp, useRoute } from '@react-navigation/native'
import { Box, VStack } from 'native-base'
import { RootStackParamList, RootStackRoutes } from './AppRootStack'
import OrgMemberHeader from './OrgMemberInfoHeader'
import OrgMemberItem from './OrgMemberInfoItem'

type ScreenRouteProp = RouteProp<RootStackParamList, RootStackRoutes.OrgMembers>

export default function OrgMemberScreen() {
    const { params } = useRoute<ScreenRouteProp>()

    const [{ data }] = useOrgMemberScreenQuery({
        variables: {
            id: params.id
        }
    })

    if (!data?.organization?.members) return null

    const allMembers = data.organization.members

    const owners = allMembers.filter(
        ({ membership }) => membership.role === OrganizationRoleType.Owner
    )
    const members = allMembers.filter(
        ({ membership }) => membership.role === OrganizationRoleType.Member
    )

    return (
        <Box p={4}>
            <VStack space={4}>
                <OrgMemberHeader>Owner</OrgMemberHeader>
                <VStack space={2}>
                    {owners.map(({ node: user }) => (
                        <OrgMemberItem key={user.id} user={user} />
                    ))}
                </VStack>
                <OrgMemberHeader>Member</OrgMemberHeader>
                <VStack space={2}>
                    {members.map(({ node: user }) => (
                        <OrgMemberItem key={user.id} user={user} />
                    ))}
                </VStack>
            </VStack>
        </Box>
    )
}
