import { useRoute } from '@react-navigation/native'
import { Box, Text, VStack } from 'native-base'

import {
    useOrganizationMembersScreenQuery,
    OrganizationRoleType
} from '@/generated'

import { RootStackScreenProps } from '@/navigation/screenProps'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import OrgMemberItem from '@/features/OrgMember/core/List/Item'

type ScreenProps = RootStackScreenProps<RootStackRoute.OrganizationMembers>
interface RoleHeaderProps {
    children: string
}

function RoleHeader({ children }: RoleHeaderProps) {
    return (
        <Text color="blueGray.600" fontWeight="medium">
            {children}
        </Text>
    )
}

export default function OrganizationMembersScreen() {
    const {
        params: { orgId }
    } = useRoute<ScreenProps['route']>()

    const [{ data }] = useOrganizationMembersScreenQuery({
        variables: {
            id: orgId
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
                <RoleHeader>Owner</RoleHeader>
                <VStack space={2}>
                    {owners.map(({ node: user }) => (
                        <OrgMemberItem key={user.id} user={user} />
                    ))}
                </VStack>
                <RoleHeader>Member</RoleHeader>
                <VStack space={2}>
                    {members.map(({ node: user }) => (
                        <OrgMemberItem key={user.id} user={user} />
                    ))}
                </VStack>
            </VStack>
        </Box>
    )
}
