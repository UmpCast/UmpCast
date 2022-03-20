import { RouteProp, useRoute } from '@react-navigation/native'
import { Box, Text, VStack } from 'native-base'

import { AppRootStackParamList, AppRootStackRoute } from '@/core/App/Root/Stack'
import { useOrgMemberListScreenQuery, OrganizationRoleType } from '@/generated'

import OrgMemberItem from './Item'

type ScreenRouteProp = RouteProp<
    AppRootStackParamList,
    AppRootStackRoute.OrgMembers
>

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

export default function OrgMemberListScreen() {
    const { params } = useRoute<ScreenRouteProp>()

    const [{ data }] = useOrgMemberListScreenQuery({
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
