import React from 'react'

import { VStack } from 'native-base'

import CreateOrganizationAction from '../containers/CreateOrganizationAction'
import OrganizationList from './OrganizationList'

export default function OrganizationSelectionScreen() {
    const orgs = [
        {
            id: '1',
            name: 'Palo Alto Little League'
        },
        {
            id: '2',
            name: 'Saratoga Little League'
        }
    ]

    return (
        <VStack space={6}>
            <OrganizationList organizations={orgs} />
            <CreateOrganizationAction />
        </VStack>
    )
}
