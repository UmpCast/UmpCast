import { ORG_JOIN_CODE_OFFSET } from '@/constants/server'
import { OrgInviteModal_OrganizationFragment } from '@/generated'
import { Modal, Text, VStack } from 'native-base'

export interface OrgInviteModalProp {
    org: OrgInviteModal_OrganizationFragment
}

export default function OrgInviteModal({ org }: OrgInviteModalProp) {
    const joinCode = Number(org.id) + ORG_JOIN_CODE_OFFSET

    return (
        <Modal.Content>
            <Modal.Header>Invite Members</Modal.Header>
            <Modal.Body>
                <VStack alignItems="center" space={1} mb={2}>
                    <Text>Share your organization invite code</Text>
                    <Text fontSize="xl" color="indigo.600">
                        {joinCode}
                    </Text>
                </VStack>
            </Modal.Body>
        </Modal.Content>
    )
}
