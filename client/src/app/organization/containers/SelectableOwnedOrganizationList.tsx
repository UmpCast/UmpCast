import React from 'react'

import { useQuery } from '@apollo/client'

import OwnedOrganizationItem from '../components/OwnedOrganizationItem'
import OwnedOrganizationList from '../components/OwnedOrganizationList'
import { GetOwnedOrganizations } from '../graphql/queries/__generated__/GetOwnedOrganizations'
import { GET_OWNED_ORGANIZATIONS } from '../graphql/queries/getOwnedOrganizations'

export default function SelectableOwnedOrganizationList() {
    const { data } = useQuery<GetOwnedOrganizations>(GET_OWNED_ORGANIZATIONS)

    const ownedOrgs = data?.me?.ownedOrganizationList ?? []

    return (
        <OwnedOrganizationList
            organizations={ownedOrgs}
            renderItem={(org) => (
                <OwnedOrganizationItem
                    organization={org}
                    onSelect={console.log}
                    key={org.id}
                />
            )}
        />
    )
}
