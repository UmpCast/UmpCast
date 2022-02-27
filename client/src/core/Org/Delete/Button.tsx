import {
    OrgDeleteButton_OrganizationFragment,
    useOrgDeleteMutation
} from '@/generated'
import { Button, useDisclose, Modal } from 'native-base'
import OrgDeleteModal from './Modal'

export interface OrgDeleteButtonProp {
    org: OrgDeleteButton_OrganizationFragment
    onDelete: () => any
}

export default function OrgDeleteButton({
    org,
    onDelete
}: OrgDeleteButtonProp) {
    const [_, deleteOrg] = useOrgDeleteMutation()

    const disclose = useDisclose()

    const onConfirmPress = async () => {
        disclose.onClose()
        const { data } = await deleteOrg({ id: org.id })
        if (data?.deleteOrganization.errors?.length !== 0) return
        onDelete()
    }

    return (
        <>
            <Button
                onPress={disclose.onOpen}
                size="sm"
                variant="subtle"
                colorScheme="indigo"
            >
                Delete Organization
            </Button>
            <Modal {...disclose}>
                <OrgDeleteModal.Content
                    org={org}
                    onCancelPress={disclose.onClose}
                    onConfirmPress={onConfirmPress}
                />
            </Modal>
        </>
    )
}
