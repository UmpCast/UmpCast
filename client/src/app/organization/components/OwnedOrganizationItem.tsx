import React from 'react'

import { Button } from 'native-base'

import { OwnedOrganization } from '../models/Organization'

export type OwnedOrganizationItemProps = {
    organization: OwnedOrganization
    onSelect: (id: string) => void
}

export default function OwnedOrganizationItem({
    organization: org,
    onSelect
}: OwnedOrganizationItemProps) {
    return (
        <Button
            variant="outline"
            colorScheme="light"
            onPress={() => onSelect(org.id)}
        >
            {org.name}
        </Button>
    )
}
