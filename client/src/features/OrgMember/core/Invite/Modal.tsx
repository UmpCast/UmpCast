import { Modal, Text, VStack } from 'native-base'
import { IModalProps } from 'native-base/lib/typescript/components/composites/Modal'

import { ORG_JOIN_CODE_OFFSET } from '@/config/constants/server'
import { OrgMemberInviteModal_OrganizationFragment } from '@/graphql/generated'

export interface OrgMemberInviteModalProp extends IModalProps {
    org: OrgMemberInviteModal_OrganizationFragment
}

export default function OrgMemberInviteModal({
    org,
    ...rest
}: OrgMemberInviteModalProp) {
    const joinCode = Number(org.id) + ORG_JOIN_CODE_OFFSET

    return (
        <Modal {...rest}>
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
        </Modal>
    )
}
