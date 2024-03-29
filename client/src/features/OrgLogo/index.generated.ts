/* eslint-disable */
import * as Types from '../../mock/schema.generated'

import gql from 'graphql-tag'
export type OrgLogoFragment = {
    __typename?: 'Organization'
    id: string
    name: string
    logoUrl?: string | null
}

export const OrgLogoFragmentDoc = gql`
    fragment OrgLogo on Organization {
        id
        name
        logoUrl
    }
`
