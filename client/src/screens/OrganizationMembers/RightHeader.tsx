import { useRoute } from '@react-navigation/native'
import { Box, Button, useDisclose } from 'native-base'

import { useOrganizationMembersScreenRightHeaderQuery } from '@/generated'

import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'
import OrgMemberInviteModal from '@/features/OrgMember/core/Invite/Modal'

type ScreenProps = RootStackScreenProps<RootStackRoute.OrganizationMembers>

export default function OrganizationMembersScreenRightHeader() {
    const {
        params: { orgId: id }
    } = useRoute<ScreenProps['route']>()

    const orgMemberInviteDisclose = useDisclose()

    const [{ data }] = useOrganizationMembersScreenRightHeaderQuery({
        variables: {
            id
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
