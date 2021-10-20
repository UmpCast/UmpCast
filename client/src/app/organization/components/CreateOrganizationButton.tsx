import React from 'react'

import { Button } from 'native-base'

export default function CreateOrganizationButton({
    onPress
}: {
    onPress: () => void
}) {
    return (
        <Button onPress={onPress} colorScheme="indigo">
            Create Organization
        </Button>
    )
}
