import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import {
    OrgMemberScreen_UserOrganizationPermitFragment,
    useOrgMemberScreenQuery
} from '@/generated'
import { RouteProp, useRoute } from '@react-navigation/native'
import { Box, VStack } from 'native-base'
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
                        <OrgMemberItem user={user} key={id} />
                    ))}
                </VStack>
                <OrgMemberHeader>Member</OrgMemberHeader>
                <VStack space={2}>
                    {memberList.map(({ user, id }) => (
                        <OrgMemberItem user={user} key={id} />
                    ))}
                </VStack>
            </VStack>
        </Box>
    )
}
