import { Box, Button, useDisclose } from 'native-base'

import OrgMemberInviteModal from '@/features/OrgMember/core/Invite/Modal'
import { useOrganizationMembersScreenRightHeaderQuery } from '@/graphql/generated'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'

type ScreenProps = RootStackScreenProps<RootStackRoute.OrganizationMembers>

export default function OrganizationMembersScreenRightHeader({
    route
}: ScreenProps) {
    const {
        params: { orgId }
    } = route

    const orgMemberInviteDisclose = useDisclose()

    const [{ data }] = useOrganizationMembersScreenRightHeaderQuery({
        variables: {
            id: orgId
        }
    })

    const org = data?.organization

    return (
        <Box px={4}>
            {org ? (
                <Button
                    colorScheme="indigo"
                    onPress={orgMemberInviteDisclose.onOpen}
                    variant="link"
                >
                    Invite
                </Button>
            ) : null}
            {org && (
                <OrgMemberInviteModal {...orgMemberInviteDisclose} org={org} />
            )}
        </Box>
    )
}
