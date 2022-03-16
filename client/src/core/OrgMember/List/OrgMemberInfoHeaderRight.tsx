import { Box } from 'native-base'
import OrgInviteButton from '../Invite/OrgMemberInviteButton'

export default function OrgMemberHeaderRight() {
    return (
        <Box px={4}>
            <OrgInviteButton />
        </Box>
    )
}
