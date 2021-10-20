import React from 'react'

import { Stack } from 'native-base'

import { Organizations } from '../models/Organizations'
import OrganizationSelectable from './OrganizationSelectable'

export default function OrganizationList({
    organizations
}: {
    organizations: Organizations
}) {
    return (
        <Stack
            direction={{
                base: 'column',
                md: 'row'
            }}
            space={4}
        >
            {organizations.map((org) => (
                <OrganizationSelectable organization={org} key={org.id} />
            ))}
        </Stack>
    )
}
