import { RouteProp, useRoute } from '@react-navigation/native'
import { Button, Modal, useDisclose } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { useOrgInviteButtonQuery } from '@/generated'

import OrgInviteModal from './Modal'

type ScreenRouteProp = RouteProp<RootStackParamList, RootStackRoutes.OrgMembers>

export default function OrgInviteButton() {
    const { params } = useRoute<ScreenRouteProp>()

    const [{ data }] = useOrgInviteButtonQuery({
        variables: { id: params.id }
    })
    const disclose = useDisclose()

    if (!data?.organization) return null

    return (
        <>
            <Button
                colorScheme="indigo"
                onPress={disclose.onOpen}
                variant="link"
            >
                Invite
            </Button>
            <Modal {...disclose}>
                <OrgInviteModal org={data.organization} />
            </Modal>
        </>
    )
}
