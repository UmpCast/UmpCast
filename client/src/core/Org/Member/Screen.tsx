import { RouteProp, useRoute } from '@react-navigation/native'
import { Box, VStack } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import {
    OrgMemberScreen_UserOrganizationPermitFragment,
    useOrgMemberScreenQuery
} from '@/generated'

import OrgMemberHeader from './Header'
import OrgMemberItem from './Item'

type ScreenRouteProp = RouteProp<RootStackParamList, RootStackRoutes.OrgMembers>

export default function OrgMemberScreen() {
    const { params } = useRoute<ScreenRouteProp>()

    const [{ data }] = useOrgMemberScreenQuery({
        variables: {
            id: params.orgId
        }
    })

    if (!data?.organization?.memberList) return null

    const allMemberList = data.organization.memberList.filter(
        (member): member is OrgMemberScreen_UserOrganizationPermitFragment =>
            member !== null
    )
    const ownerList = allMemberList.filter(
        (member) => member?.permissionLevel === 'OWNER'
    )
    const memberList = allMemberList.filter(
        (member) => member?.permissionLevel === 'MEMBER'
    )

    return (
        <Box p={4}>
            <VStack space={4}>
                <OrgMemberHeader>Owner</OrgMemberHeader>
                <VStack space={2}>
                    {ownerList.map(({ user, id }) => (
                        <OrgMemberItem key={id} user={user} />
                    ))}
                </VStack>
                <OrgMemberHeader>Member</OrgMemberHeader>
                <VStack space={2}>
                    {memberList.map(({ user, id }) => (
                        <OrgMemberItem key={id} user={user} />
                    ))}
                </VStack>
            </VStack>
        </Box>
    )
}
