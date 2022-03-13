import { Button, useDisclose, Modal } from 'native-base'

import {
    OrgDeleteButton_OrganizationFragment,
    useDeleteOrganizationMutation
} from '@/generated'
import OrgDeleteModal from './OrgDeleteModal'

export interface OrgDeleteButtonProp {
    org: OrgDeleteButton_OrganizationFragment
    onDelete: () => any
}

export default function OrgDeleteButton({
    org,
    onDelete
}: OrgDeleteButtonProp) {
    const [_, deleteOrg] = useDeleteOrganizationMutation()

    const disclose = useDisclose()

    const onConfirmPress = async () => {
        disclose.onClose()
        const { data } = await deleteOrg({
            input: {
                organizationId: org.id
            }
        })

        if (!data?.deleteOrganization?.success) return
        onDelete()
    }

    return (
        <>
            <Button
                colorScheme="indigo"
                onPress={disclose.onOpen}
                size="sm"
                variant="subtle"
            >
                Delete Organization
            </Button>
            <Modal {...disclose}>
                <OrgDeleteModal.Content
                    onCancelPress={disclose.onClose}
                    onConfirmPress={onConfirmPress}
                    org={org}
                />
            </Modal>
        </>
    )
}
