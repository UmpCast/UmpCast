import { RouteProp, useRoute } from '@react-navigation/native'
import { Box, Text, VStack } from 'native-base'

import { useOrgMemberListScreenQuery, OrganizationRoleType } from '@/generated'

import OrgMemberItem from './Item'
import { AppRootStackScreenProps } from '@/navigation/screenProps'
import { AppRootStackRoute } from '@/navigation/navigators/Root/Stack'

type ScreenProps = AppRootStackScreenProps<AppRootStackRoute.OrgMembers>

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
    const { params } = useRoute<ScreenProps['route']>()

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
