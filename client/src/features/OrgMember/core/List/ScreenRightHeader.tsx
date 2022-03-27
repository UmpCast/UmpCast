import { useRoute } from '@react-navigation/native'
import { Box, Button, useDisclose } from 'native-base'

import { useOrgMemberListScreenRightHeaderQuery } from '@/generated'

import OrgMemberInviteModal from '../Invite/Modal'
import { AppRootStackRoute } from '@/navigation/navigators/Root/Stack'
import { AppRootStackScreenProps } from '@/navigation/screenProps'

type ScreenProps = AppRootStackScreenProps<AppRootStackRoute.OrgMembers>

export default function OrgMemberListScreenRightHeader() {
    const {
        params: { id }
    } = useRoute<ScreenProps['route']>()

    const orgMemberInviteDisclose = useDisclose()

    const [{ data }] = useOrgMemberListScreenRightHeaderQuery({
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
