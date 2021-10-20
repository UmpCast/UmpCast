import React from 'react'

import { ArrowForwardIcon, Button, Text } from 'native-base'

import { Organization } from '../models/Organizations'

export default function OrganizationSelectable({
    organization: { id, name }
}: {
    organization: Organization
}) {
    return (
        <Button
            key={id}
            justifyContent="flex-start"
            leftIcon={<ArrowForwardIcon />}
            variant="outline"
            colorScheme="light"
        >
            <Text>{name}</Text>
        </Button>
    )
}
