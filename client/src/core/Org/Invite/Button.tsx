import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { useOrgInviteButtonQuery } from '@/generated'
import { RouteProp, useRoute } from '@react-navigation/native'
import { Button, Modal, useDisclose } from 'native-base'
import OrgInviteModal from './Modal'

type ScreenRouteProp = RouteProp<RootStackParamList, RootStackRoutes.OrgMembers>

export default function OrgInviteButton() {
    const { params } = useRoute<ScreenRouteProp>()

    const [{ data }] = useOrgInviteButtonQuery({ variables: { id: params.id } })
    const disclose = useDisclose()

    if (!data?.organization) return null

    return (
        <>
            <Button
                variant="link"
                colorScheme="indigo"
                onPress={disclose.onOpen}
            >
                Invite
            </Button>
            <Modal {...disclose}>
                <OrgInviteModal org={data.organization} />
            </Modal>
        </>
    )
}
