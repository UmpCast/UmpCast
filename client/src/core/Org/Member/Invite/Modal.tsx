import { Modal, Text, VStack } from 'native-base'

import { ORG_JOIN_CODE_OFFSET } from '@/constants/server'
import { OrgInviteModal_OrganizationFragment } from '@/generated'

export interface OrgInviteModalProp {
    org: OrgInviteModal_OrganizationFragment
}

export default function OrgInviteModal({ org }: OrgInviteModalProp) {
    const joinCode = Number(org.id) + ORG_JOIN_CODE_OFFSET

    return (
        <Modal.Content>
            <Modal.Header>Invite Members</Modal.Header>
            <Modal.Body>
                <VStack alignItems="center" mb={2} space={1}>
                    <Text>Share your organization invite code</Text>
                    <Text color="indigo.600" fontSize="xl">
                        {joinCode}
                    </Text>
                </VStack>
            </Modal.Body>
        </Modal.Content>
    )
}
