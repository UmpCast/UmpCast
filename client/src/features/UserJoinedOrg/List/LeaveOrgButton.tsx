import { Button, useDisclose } from 'native-base'

import ConfirmationSimpleModal from '@/components/Confirmation/SimpleModal'
import {
    LeaveOrgButton_OrganizationFragment,
    useLeaveOrganizationMutation
} from '@/generated'

interface LeaveOrgButtonProps {
    org: LeaveOrgButton_OrganizationFragment
    onSuccess: () => any
}

export default function LeaveOrgButton({
    org,
    onSuccess = () => {}
}: LeaveOrgButtonProps) {
    const [, leaveOrg] = useLeaveOrganizationMutation()

    const confirmDisclose = useDisclose()

    const onConfirmPress = async () => {
        await leaveOrg({
            input: {
                organizationId: org.id
            }
        })

        confirmDisclose.onClose()
        onSuccess()
    }

    return (
        <>
            <Button
                colorScheme="indigo"
                mt={2}
                onPress={confirmDisclose.onOpen}
                variant="subtle"
            >
                Leave Organization
            </Button>
            <ConfirmationSimpleModal
                {...confirmDisclose}
                description="Are you sure you want to leave?"
                onConfirmPress={onConfirmPress}
                title="Leave Organization"
            />
        </>
    )
}
