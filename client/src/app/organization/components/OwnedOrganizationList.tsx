import React from 'react'

import { VStack } from 'native-base'

import { OwnedOrganization } from '../models/Organization'

export type OwnedOrganizationListProps = {
    organizations: OwnedOrganization[]
    renderItem: (organization: OwnedOrganization) => JSX.Element
}

export default function OwnedOrganizationList({
    organizations,
    renderItem
}: OwnedOrganizationListProps) {
    return <VStack space={4}>{organizations.map(renderItem)}</VStack>
}
